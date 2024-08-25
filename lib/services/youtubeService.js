//====== YOUTUBE ANALYTICS SERVICE ======//
// /services/youtubeService.js
'use client';

//====== MAIN ANALYTICS FETCHING ======//

/**
 * Service for interacting with YouTube Analytics API
 * Uses the Google refresh token to fetch analytics data
 */
export const fetchYouTubeAnalytics = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    // Step 1: Exchange refresh token for access token
    const tokenResponse = await fetch('/api/youtube/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      throw new Error(error.message || 'Failed to refresh access token');
    }

    const { accessToken } = await tokenResponse.json();

    // Step 2: Get channel info to identify the channel ID
    const channelResponse = await fetch('/api/youtube/channel', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!channelResponse.ok) {
      const error = await channelResponse.json();
      console.error('Channel response error:', error);
      throw new Error(error.message || 'Failed to fetch channel data');
    }

    const channelData = await channelResponse.json();
    console.log(
      'Channel data response:',
      JSON.stringify(channelData).substring(0, 200) + '...'
    );

    // Additional logging to debug the channel data structure
    if (!channelData.items || channelData.items.length === 0) {
      console.error('No channel items found in response:', channelData);

      // Check if the user has a YouTube channel
      if (channelData.pageInfo && channelData.pageInfo.totalResults === 0) {
        throw new Error(
          'No YouTube channel found for this account. Please create a YouTube channel first.'
        );
      }

      throw new Error('Could not find YouTube channel information');
    }

    const channelId = channelData.items[0]?.id;

    if (!channelId) {
      console.error('Channel data is missing ID:', channelData.items[0]);
      throw new Error('Could not determine channel ID from response');
    }

    console.log('Successfully found channel ID:', channelId);

    // Step 3: Fetch all required analytics in parallel
    try {
      const [subscriberData, viewsData, engagementData, demographicsData] =
        await Promise.all([
          fetchSubscriberData(accessToken, channelId),
          fetchViewCountData(accessToken, channelId),
          fetchEngagementData(accessToken, channelId),
          fetchDemographicsData(accessToken, channelId),
        ]);

      // Step 4: Calculate summary statistics
      const stats = calculateStats(subscriberData, viewsData, engagementData);

      return {
        stats,
        subscriberData,
        viewsData,
        engagementData,
        demographicsData,
        channelInfo: channelData.items[0],
      };
    } catch (analyticsError) {
      console.error('Error fetching analytics data:', analyticsError);

      // Return partial data if analytics fetching fails
      return {
        stats: null,
        subscriberData: [],
        viewsData: [],
        engagementData: [],
        demographicsData: [],
        channelInfo: channelData.items[0],
        error: analyticsError.message,
      };
    }
  } catch (error) {
    console.error('Error in fetchYouTubeAnalytics:', error);
    throw error;
  }
};

//====== DATA FETCHING FUNCTIONS ======//

// Helper function to fetch subscriber growth data
const fetchSubscriberData = async (accessToken, channelId) => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 90); // Last 90 days

    const response = await fetch(
      `/api/youtube/analytics/subscribers?channelId=${channelId}&startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch subscriber data');
    }

    const data = await response.json();

    // Check if data has the expected structure
    if (
      !data ||
      !data.rows ||
      !Array.isArray(data.rows) ||
      !data.columnHeaders
    ) {
      console.error('Invalid subscriber data format:', data);
      return [];
    }

    // Transform the data into a format compatible with our chart
    return transformTimeSeriesData(
      data.rows,
      data.columnHeaders,
      'subscribers'
    );
  } catch (error) {
    console.error('Error fetching subscriber data:', error);
    return [];
  }
};

// Helper function to fetch view count data
const fetchViewCountData = async (accessToken, channelId) => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 90); // Last 90 days

    const response = await fetch(
      `/api/youtube/analytics/views?channelId=${channelId}&startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch view count data');
    }

    const data = await response.json();

    // Check if data has the expected structure
    if (
      !data ||
      !data.rows ||
      !Array.isArray(data.rows) ||
      !data.columnHeaders
    ) {
      console.error('Invalid view count data format:', data);
      return [];
    }

    // Transform the data into a format compatible with our chart
    return transformTimeSeriesData(data.rows, data.columnHeaders, 'views');
  } catch (error) {
    console.error('Error fetching view count data:', error);
    return [];
  }
};

// Helper function to fetch engagement data
const fetchEngagementData = async (accessToken, channelId) => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // Last 30 days

    const response = await fetch(
      `/api/youtube/analytics/engagement?channelId=${channelId}&startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch engagement data');
    }

    const data = await response.json();

    // Check if data has the expected structure
    if (
      !data ||
      !data.rows ||
      !Array.isArray(data.rows) ||
      !data.columnHeaders
    ) {
      console.error('Invalid engagement data format:', data);
      return [];
    }

    // Transform the data into a format for engagement metrics
    return transformEngagementData(data.rows, data.columnHeaders);
  } catch (error) {
    console.error('Error fetching engagement data:', error);
    return [];
  }
};

// Helper function to fetch demographics data
const fetchDemographicsData = async (accessToken, channelId) => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // Last 30 days

    const response = await fetch(
      `/api/youtube/analytics/demographics?channelId=${channelId}&startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch demographics data');
    }

    const data = await response.json();

    // Check if data has the expected structure
    if (
      !data ||
      !data.rows ||
      !Array.isArray(data.rows) ||
      !data.columnHeaders
    ) {
      console.error('Invalid demographics data format:', data);
      return [];
    }

    // Transform the data into a format for demographics charts
    return transformDemographicsData(data.rows, data.columnHeaders);
  } catch (error) {
    console.error('Error fetching demographics data:', error);
    return [];
  }
};

//====== STATISTICS CALCULATION ======//

// Helper function to calculate statistics from the fetched data
const calculateStats = (subscriberData, viewsData, engagementData) => {
  try {
    // Get current values
    const currentSubscribers =
      subscriberData.length > 0
        ? subscriberData[subscriberData.length - 1].subscribers
        : 0;
    const currentViews =
      viewsData.length > 0 ? viewsData[viewsData.length - 1].views : 0;

    // Calculate growth over period
    const subscriberGrowth =
      subscriberData.length > 1
        ? subscriberData[subscriberData.length - 1].subscribers -
          subscriberData[0].subscribers
        : 0;

    const viewsGrowth =
      viewsData.length > 1
        ? viewsData[viewsData.length - 1].views - viewsData[0].views
        : 0;

    // Calculate average engagement from the engagement data
    const avgEngagement =
      engagementData.length > 0
        ? engagementData.reduce((sum, item) => sum + item.engagement, 0) /
          engagementData.length
        : 0;

    // Calculate growth percentage
    const subscriberGrowthPercentage =
      subscriberData.length > 1 && subscriberData[0].subscribers > 0
        ? (subscriberGrowth / subscriberData[0].subscribers) * 100
        : 0;

    const viewsGrowthPercentage =
      viewsData.length > 1 && viewsData[0].views > 0
        ? (viewsGrowth / viewsData[0].views) * 100
        : 0;

    return {
      currentSubscribers,
      currentViews,
      subscriberGrowth,
      viewsGrowth,
      avgEngagement,
      subscriberGrowthPercentage:
        Math.round(subscriberGrowthPercentage * 100) / 100,
      viewsGrowthPercentage: Math.round(viewsGrowthPercentage * 100) / 100,
      totalMetrics: {
        subscribers: currentSubscribers,
        views: currentViews,
        engagement: avgEngagement,
      },
    };
  } catch (error) {
    console.error('Error calculating stats:', error);
    return {
      currentSubscribers: 0,
      currentViews: 0,
      subscriberGrowth: 0,
      viewsGrowth: 0,
      avgEngagement: 0,
      subscriberGrowthPercentage: 0,
      viewsGrowthPercentage: 0,
      totalMetrics: { subscribers: 0, views: 0, engagement: 0 },
    };
  }
};

//====== UTILITY FUNCTIONS ======//

// Helper function to format date for API calls
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

// Helper function to transform time series data for charts
const transformTimeSeriesData = (rows, headers, valueKey) => {
  try {
    if (!rows || !Array.isArray(rows) || !headers) {
      return [];
    }

    // Find the indices for the columns we need
    const dateIndex = headers.findIndex((h) => h.name === 'day');
    const valueIndex = headers.findIndex((h) => h.name === valueKey);

    if (dateIndex === -1 || valueIndex === -1) {
      console.error(
        `Required columns not found. Looking for 'day' and '${valueKey}'`
      );
      console.error(
        'Available headers:',
        headers.map((h) => h.name)
      );
      return [];
    }

    return rows.map((row) => ({
      date: row[dateIndex],
      [valueKey]: row[valueIndex] || 0,
    }));
  } catch (error) {
    console.error('Error transforming time series data:', error);
    return [];
  }
};

//====== DATA TRANSFORMATION FUNCTIONS ======//

// Helper function to transform engagement data
const transformEngagementData = (rows, headers) => {
  try {
    if (!rows || !Array.isArray(rows) || !headers) {
      return [];
    }

    // Find the indices for the engagement metrics
    const dateIndex = headers.findIndex((h) => h.name === 'day');
    const likesIndex = headers.findIndex((h) => h.name === 'likes');
    const dislikesIndex = headers.findIndex((h) => h.name === 'dislikes');
    const commentsIndex = headers.findIndex((h) => h.name === 'comments');
    const sharesIndex = headers.findIndex((h) => h.name === 'shares');

    if (dateIndex === -1) {
      console.error('Date column not found in engagement data');
      return [];
    }

    return rows.map((row) => {
      const likes = likesIndex !== -1 ? row[likesIndex] || 0 : 0;
      const dislikes = dislikesIndex !== -1 ? row[dislikesIndex] || 0 : 0;
      const comments = commentsIndex !== -1 ? row[commentsIndex] || 0 : 0;
      const shares = sharesIndex !== -1 ? row[sharesIndex] || 0 : 0;

      // Calculate overall engagement score
      const engagement = likes + comments + shares - dislikes;

      return {
        date: row[dateIndex],
        likes,
        dislikes,
        comments,
        shares,
        engagement: Math.max(0, engagement), // Ensure non-negative
      };
    });
  } catch (error) {
    console.error('Error transforming engagement data:', error);
    return [];
  }
};

// Helper function to transform demographics data
const transformDemographicsData = (rows, headers) => {
  try {
    if (!rows || !Array.isArray(rows) || !headers) {
      return [];
    }

    // Look for common demographic dimensions
    const ageGroupIndex = headers.findIndex((h) => h.name === 'ageGroup');
    const genderIndex = headers.findIndex((h) => h.name === 'gender');
    const countryIndex = headers.findIndex((h) => h.name === 'country');
    const viewsIndex = headers.findIndex((h) => h.name === 'views');

    const demographics = {
      ageGroups: [],
      genders: [],
      countries: [],
    };

    rows.forEach((row) => {
      const views = viewsIndex !== -1 ? row[viewsIndex] || 0 : 0;

      // Process age groups
      if (ageGroupIndex !== -1 && row[ageGroupIndex]) {
        const existing = demographics.ageGroups.find(
          (item) => item.category === row[ageGroupIndex]
        );
        if (existing) {
          existing.value += views;
        } else {
          demographics.ageGroups.push({
            category: row[ageGroupIndex],
            value: views,
          });
        }
      }

      // Process genders
      if (genderIndex !== -1 && row[genderIndex]) {
        const existing = demographics.genders.find(
          (item) => item.category === row[genderIndex]
        );
        if (existing) {
          existing.value += views;
        } else {
          demographics.genders.push({
            category: row[genderIndex],
            value: views,
          });
        }
      }

      // Process countries
      if (countryIndex !== -1 && row[countryIndex]) {
        const existing = demographics.countries.find(
          (item) => item.category === row[countryIndex]
        );
        if (existing) {
          existing.value += views;
        } else {
          demographics.countries.push({
            category: row[countryIndex],
            value: views,
          });
        }
      }
    });

    // Sort demographics by value (descending) and limit to top 10
    demographics.ageGroups.sort((a, b) => b.value - a.value).slice(0, 10);
    demographics.genders.sort((a, b) => b.value - a.value).slice(0, 10);
    demographics.countries.sort((a, b) => b.value - a.value).slice(0, 10);

    return demographics;
  } catch (error) {
    console.error('Error transforming demographics data:', error);
    return {
      ageGroups: [],
      genders: [],
      countries: [],
    };
  }
};
