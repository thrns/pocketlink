export const sampleAnalyticsData = {
  // Core events with relational metadata
  events: {
    evt_1698739200000_abc123: {
      id: 'evt_1698739200000_abc123',
      correlationId: 'corr_1698739200000_def456',
      timestamp: '2024-01-15T10:30:00.000Z',
      date: '2024-01-15',
      eventType: 'visit',
      eventName: 'profile_visit',
      properties: {
        referrer: 'https://google.com',
        landingPage: '/profile/johndoe',
      },
      location: {
        country: 'United States',
        countryCode: 'US',
        region: 'California',
        regionCode: 'CA',
        city: 'San Francisco',
        postal: '94105',
        timezone: 'America/Los_Angeles',
        isp: 'Cloudflare',
        coordinates: { latitude: 37.7749, longitude: -122.4194 },
        currency: 'USD',
        languages: 'en-US,en',
        callingCode: '+1',
        asn: 'AS13335',
      },
      context: {
        visitorId: 'visitor_1698739200000_user001',
        sessionId: 'session_1698739200000_sess001',
        isUniqueVisitor: true,
        isUniqueSession: true,
        deviceType: 'desktop',
        viewport: { width: 1920, height: 1080 },
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        referrer: 'https://google.com',
      },
      relations: {
        relatedEvents: ['evt_1698739260000_xyz789'],
        parentEvent: null,
        childEvents: ['evt_1698739260000_xyz789'],
        sessionEvents: ['evt_1698739260000_xyz789', 'evt_1698739320000_pqr456'],
        tags: [
          'type:visit',
          'device:desktop',
          'country:United States',
          'time:business',
        ],
      },
      analytics: {
        processed: true,
        version: '2.0',
        batchId: 'batch_1698739200000',
        processingTime: '2024-01-15T10:30:01.000Z',
      },
    },
    evt_1698739260000_xyz789: {
      id: 'evt_1698739260000_xyz789',
      correlationId: 'corr_1698739260000_ghi789',
      timestamp: '2024-01-15T10:31:00.000Z',
      date: '2024-01-15',
      eventType: 'click',
      eventName: 'card_click',
      properties: {
        cardTitle: 'LinkedIn Profile',
        cardType: 'social',
        position: 2,
        url: 'https://linkedin.com/in/johndoe',
      },
      location: {
        country: 'United States',
        countryCode: 'US',
        region: 'California',
        regionCode: 'CA',
        city: 'San Francisco',
        postal: '94105',
        timezone: 'America/Los_Angeles',
        isp: 'Cloudflare',
        coordinates: { latitude: 37.7749, longitude: -122.4194 },
        currency: 'USD',
        languages: 'en-US,en',
        callingCode: '+1',
        asn: 'AS13335',
      },
      context: {
        visitorId: 'visitor_1698739200000_user001',
        sessionId: 'session_1698739200000_sess001',
        isUniqueVisitor: false,
        isUniqueSession: false,
        deviceType: 'desktop',
        viewport: { width: 1920, height: 1080 },
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        referrer: 'https://google.com',
      },
      relations: {
        relatedEvents: ['evt_1698739200000_abc123'],
        parentEvent: 'evt_1698739200000_abc123',
        childEvents: [],
        sessionEvents: ['evt_1698739200000_abc123', 'evt_1698739320000_pqr456'],
        tags: [
          'type:click',
          'device:desktop',
          'interaction:click',
          'card:social',
          'time:business',
        ],
      },
      analytics: {
        processed: true,
        version: '2.0',
        batchId: 'batch_1698739260000',
        processingTime: '2024-01-15T10:31:01.000Z',
      },
    },
    evt_1698739320000_pqr456: {
      id: 'evt_1698739320000_pqr456',
      correlationId: 'corr_1698739320000_jkl012',
      timestamp: '2024-01-15T10:32:00.000Z',
      date: '2024-01-15',
      eventType: 'attention',
      eventName: 'card_attention',
      properties: {
        cardId: 'LinkedIn Profile',
        timeSpent: 5500,
      },
      location: {
        country: 'United States',
        countryCode: 'US',
        region: 'California',
        regionCode: 'CA',
        city: 'San Francisco',
        postal: '94105',
        timezone: 'America/Los_Angeles',
        isp: 'Cloudflare',
        coordinates: { latitude: 37.7749, longitude: -122.4194 },
        currency: 'USD',
        languages: 'en-US,en',
        callingCode: '+1',
        asn: 'AS13335',
      },
      context: {
        visitorId: 'visitor_1698739200000_user001',
        sessionId: 'session_1698739200000_sess001',
        isUniqueVisitor: false,
        isUniqueSession: false,
        deviceType: 'desktop',
        viewport: { width: 1920, height: 1080 },
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        referrer: 'https://google.com',
      },
      relations: {
        relatedEvents: ['evt_1698739260000_xyz789'],
        parentEvent: 'evt_1698739260000_xyz789',
        childEvents: [],
        sessionEvents: ['evt_1698739200000_abc123', 'evt_1698739260000_xyz789'],
        tags: [
          'type:attention',
          'device:desktop',
          'engagement:medium',
          'time:business',
        ],
      },
      analytics: {
        processed: true,
        version: '2.0',
        batchId: 'batch_1698739320000',
        processingTime: '2024-01-15T10:32:01.000Z',
      },
    },
  },

  // Aggregated metrics derived from events
  metrics: {
    overview: {
      totalEvents: 156,
      totalVisits: 45,
      totalUniqueVisits: 32,
      totalUniqueVisitors: 28,
      totalClicks: 78,
      totalAttentions: 23,
      totalUniqueAttentions: 19,
      totalScrollEvents: 234,
      avgSessionDuration: 125000,
      lastUpdated: '2024-01-15T14:30:00.000Z',
    },
    daily: {
      '2024-01-15': {
        events: 156,
        visits: 45,
        uniqueVisits: 32,
        uniqueVisitors: 28,
        clicks: 78,
        attentions: 23,
        uniqueAttentions: 19,
        scrollEvents: 234,
        sessionDurations: [120000, 180000, 95000, 200000],
        lastUpdated: '2024-01-15T14:30:00.000Z',
      },
      '2024-01-14': {
        events: 142,
        visits: 38,
        uniqueVisits: 28,
        uniqueVisitors: 24,
        clicks: 72,
        attentions: 21,
        uniqueAttentions: 17,
        scrollEvents: 198,
        sessionDurations: [110000, 165000, 85000, 190000],
        lastUpdated: '2024-01-14T23:59:59.000Z',
      },
    },
    geographic: {
      byCountry: {
        United_States: {
          country: 'United States',
          countryCode: 'US',
          events: 89,
          uniqueVisitors: 18,
          uniqueSessions: 22,
          lastUpdated: '2024-01-15T14:30:00.000Z',
        },
        Canada: {
          country: 'Canada',
          countryCode: 'CA',
          events: 34,
          uniqueVisitors: 8,
          uniqueSessions: 10,
          lastUpdated: '2024-01-15T13:45:00.000Z',
        },
        United_Kingdom: {
          country: 'United Kingdom',
          countryCode: 'GB',
          events: 23,
          uniqueVisitors: 5,
          uniqueSessions: 7,
          lastUpdated: '2024-01-15T12:20:00.000Z',
        },
      },
      byCity: {
        United_States_San_Francisco: {
          country: 'United States',
          city: 'San Francisco',
          events: 45,
          uniqueVisitors: 12,
          uniqueSessions: 15,
          lastUpdated: '2024-01-15T14:30:00.000Z',
        },
        Canada_Toronto: {
          country: 'Canada',
          city: 'Toronto',
          events: 28,
          uniqueVisitors: 6,
          uniqueSessions: 8,
          lastUpdated: '2024-01-15T13:45:00.000Z',
        },
      },
      byLocation: {
        United_States_California_San_Francisco: {
          country: 'United States',
          countryCode: 'US',
          region: 'California',
          regionCode: 'CA',
          city: 'San Francisco',
          postal: '94105',
          timezone: 'America/Los_Angeles',
          isp: 'Cloudflare',
          coordinates: { latitude: 37.7749, longitude: -122.4194 },
          currency: 'USD',
          languages: 'en-US,en',
          callingCode: '+1',
          asn: 'AS13335',
          events: 45,
          uniqueVisitors: 12,
          uniqueSessions: 15,
          eventTypes: {
            visit: 15,
            click: 20,
            attention: 8,
            scroll: 2,
          },
          lastUpdated: '2024-01-15T14:30:00.000Z',
        },
      },
      daily: {
        '2024-01-15': {
          United_States_California_San_Francisco: {
            country: 'United States',
            region: 'California',
            city: 'San Francisco',
            events: 45,
            uniqueVisitors: 12,
            uniqueSessions: 15,
            lastUpdated: '2024-01-15T14:30:00.000Z',
          },
        },
      },
    },
    behavioral: {
      clickPaths: {
        session_1698739200000_sess001: {
          evt_1698739260000_xyz789: {
            cardName: 'LinkedIn Profile',
            timestamp: '2024-01-15T10:31:00.000Z',
            position: 2,
          },
        },
      },
      timeSpentPerCard: {
        'LinkedIn Profile': {
          totalTime: 25500,
          sessions: 8,
          interactions: {
            evt_1698739320000_pqr456: {
              timeSpent: 5500,
              timestamp: '2024-01-15T10:32:00.000Z',
              sessionId: 'session_1698739200000_sess001',
            },
          },
        },
      },
      scrollPatterns: {
        session_1698739200000_sess001: {
          maxScroll: 85,
          events: {
            evt_scroll_001: {
              scrollPercentage: 25,
              milestone: '25%',
              timestamp: '2024-01-15T10:30:30.000Z',
            },
            evt_scroll_002: {
              scrollPercentage: 50,
              milestone: '50%',
              timestamp: '2024-01-15T10:31:30.000Z',
            },
          },
          milestones: {
            evt_scroll_001: {
              milestone: '25%',
              timestamp: '2024-01-15T10:30:30.000Z',
            },
          },
        },
      },
      deviceUsage: {
        desktop: {
          events: 89,
          sessions: {
            session_1698739200000_sess001: true,
            session_1698739400000_sess002: true,
          },
          lastUsed: '2024-01-15T14:30:00.000Z',
        },
        mobile: {
          events: 67,
          sessions: {
            session_1698740000_sess003: true,
          },
          lastUsed: '2024-01-15T13:45:00.000Z',
        },
      },
    },
    performance: {
      cardPerformance: {
        'LinkedIn Profile': {
          clicks: 20,
          uniqueClicks: 15,
          totalAttention: 25500,
          lastClicked: '2024-01-15T10:31:00.000Z',
          positions: {
            evt_1698739260000_xyz789: 2,
          },
        },
        'Twitter Profile': {
          clicks: 18,
          uniqueClicks: 14,
          totalAttention: 18750,
          lastClicked: '2024-01-15T11:15:00.000Z',
          positions: {
            evt_example_001: 1,
          },
        },
      },
    },
  },

  // Relational indices for quick queries
  indices: {
    bySession: {
      session_1698739200000_sess001: {
        events: {
          evt_1698739200000_abc123: true,
          evt_1698739260000_xyz789: true,
          evt_1698739320000_pqr456: true,
        },
        startTime: '2024-01-15T10:30:00.000Z',
        endTime: '2024-01-15T10:32:00.000Z',
        eventTypes: {
          visit: true,
          click: true,
          attention: true,
        },
        location: {
          country: 'United States',
          countryCode: 'US',
          region: 'California',
          city: 'San Francisco',
        },
        device: 'desktop',
      },
    },
    byVisitor: {
      visitor_1698739200000_user001: {
        sessions: {
          session_1698739200000_sess001: true,
        },
        events: {
          evt_1698739200000_abc123: true,
          evt_1698739260000_xyz789: true,
          evt_1698739320000_pqr456: true,
        },
        firstSeen: '2024-01-15T10:30:00.000Z',
        lastSeen: '2024-01-15T10:32:00.000Z',
        totalEvents: 3,
        locations: {
          'United States_San Francisco': true,
        },
      },
    },
    byLocation: {
      United_States_California_San_Francisco: {
        events: {
          evt_1698739200000_abc123: true,
          evt_1698739260000_xyz789: true,
          evt_1698739320000_pqr456: true,
        },
        visitors: {
          visitor_1698739200000_user001: true,
        },
        sessions: {
          session_1698739200000_sess001: true,
        },
        eventTypes: {
          visit: 1,
          click: 1,
          attention: 1,
        },
      },
    },
    byDevice: {
      desktop: {
        events: {
          evt_1698739200000_abc123: true,
          evt_1698739260000_xyz789: true,
          evt_1698739320000_pqr456: true,
        },
        sessions: {
          session_1698739200000_sess001: true,
        },
        visitors: {
          visitor_1698739200000_user001: true,
        },
      },
    },
    byTimeRange: {
      '2024-01-15': {
        events: {
          evt_1698739200000_abc123: true,
          evt_1698739260000_xyz789: true,
          evt_1698739320000_pqr456: true,
        },
        sessions: {
          session_1698739200000_sess001: true,
        },
        visitors: {
          visitor_1698739200000_user001: true,
        },
        eventTypes: {
          visit: 1,
          click: 1,
          attention: 1,
        },
      },
    },
    correlations: {
      corr_1698739200000_def456: {
        events: {
          evt_1698739200000_abc123: true,
        },
        primaryEvent: 'evt_1698739200000_abc123',
        eventTypes: {
          visit: true,
        },
      },
      corr_1698739260000_ghi789: {
        events: {
          evt_1698739260000_xyz789: true,
        },
        primaryEvent: 'evt_1698739260000_xyz789',
        eventTypes: {
          click: true,
        },
      },
    },
  },

  // Legacy compatibility data (will be deprecated)
  dailyStats: {
    '2024-01-15': {
      visits: 45,
      uniqueVisits: 32,
      uniqueVisitors: 28,
      clicks: 78,
      attentions: 23,
      uniqueAttentions: 19,
    },
    '2024-01-14': {
      visits: 38,
      uniqueVisits: 28,
      uniqueVisitors: 24,
      clicks: 72,
      attentions: 21,
      uniqueAttentions: 17,
    },
  },

  overviewStats: {
    totalVisits: 45,
    totalUniqueVisits: 32,
    totalUniqueVisitors: 28,
    totalClicks: 78,
    totalAttentions: 23,
    totalUniqueAttentions: 19,
    uniqueAttention: 1105,
  },
};
