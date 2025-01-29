'use client';

/**
 * Utility functions for chart processing and configuration
 */

/**
 * Converts chart data to a format compatible with chart libraries
 * @param {Array} data - The raw data for the chart
 * @param {string} type - The type of chart (bar, line, pie, etc.)
 * @returns {Object} Formatted chart data
 */
export const formatChartData = (data, type = 'bar') => {
  if (!data || !Array.isArray(data)) {
    return {
      labels: [],
      datasets: [],
    };
  }

  // Basic formatting based on chart type
  switch (type.toLowerCase()) {
    case 'pie':
    case 'doughnut':
      return {
        labels: data.map((item) => item.label || ''),
        datasets: [
          {
            data: data.map((item) => item.value || 0),
            background: generateChartColors(data.length),
          },
        ],
      };

    case 'line':
    case 'bar':
    default:
      return {
        labels: data.map((item) => item.label || ''),
        datasets: [
          {
            label: 'Data',
            data: data.map((item) => item.value || 0),
            background: generateChartColors(data.length)[0],
            borderColor: generateChartColors(data.length)[0],
          },
        ],
      };
  }
};

/**
 * Generates an array of colors for chart elements
 * @param {number} count - Number of colors needed
 * @returns {Array} Array of color strings
 */
export const generateChartColors = (count = 5) => {
  const baseColors = [
    '#4F46E5', // Indigo
    '#7C3AED', // Violet
    '#EC4899', // Pink
    '#F97316', // Orange
    '#10B981', // Emerald
    '#06B6D4', // Cyan
    '#8B5CF6', // Purple
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#3B82F6', // Blue
  ];

  // If we need more colors than in our base set, we'll cycle through them
  return Array(count)
    .fill(0)
    .map((_, index) => baseColors[index % baseColors.length]);
};

/**
 * Creates default chart options based on chart type
 * @param {string} type - The type of chart
 * @returns {Object} Chart options
 */
export const getDefaultChartOptions = (type = 'bar') => {
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart Data',
      },
    },
  };

  // Add type-specific options
  switch (type.toLowerCase()) {
    case 'pie':
    case 'doughnut':
      return {
        ...baseOptions,
        cutout: type.toLowerCase() === 'doughnut' ? '50%' : undefined,
      };

    case 'line':
      return {
        ...baseOptions,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

    case 'bar':
    default:
      return {
        ...baseOptions,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
  }
};

/**
 * Validates chart configuration
 * @param {Object} config - Chart configuration to validate
 * @returns {boolean} Whether the configuration is valid
 */
export const isValidChartConfig = (config) => {
  if (!config || typeof config !== 'object') return false;

  // Check for required properties
  if (!config.type) return false;
  if (!config.data) return false;

  // Validate data structure based on chart type
  switch (config.type.toLowerCase()) {
    case 'pie':
    case 'doughnut':
      return (
        config.data.labels &&
        Array.isArray(config.data.labels) &&
        config.data.datasets &&
        Array.isArray(config.data.datasets) &&
        config.data.datasets[0]?.data
      );

    case 'line':
    case 'bar':
    default:
      return (
        config.data.labels &&
        Array.isArray(config.data.labels) &&
        config.data.datasets &&
        Array.isArray(config.data.datasets)
      );
  }
};
