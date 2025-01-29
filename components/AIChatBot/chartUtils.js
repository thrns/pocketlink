export const createSafeChartConfig = (rawConfig) => {
  try {
    // Try to parse the JSON string if it's a string
    let config;

    if (typeof rawConfig === 'string') {
      try {
        config = JSON.parse(rawConfig);
      } catch (parseError) {
        return {
          type: 'error',
          title: 'JSON Parse Error',
          message: `Invalid JSON format: ${parseError.message}`,
        };
      }
    } else {
      // If it's already an object, use it directly
      config = rawConfig;
    }

    // Validate required fields
    if (!config) {
      return {
        type: 'error',
        title: 'Invalid Configuration',
        message: 'Chart configuration is empty or invalid',
      };
    }

    // Check chart type
    if (!config.type) {
      return {
        type: 'error',
        title: 'Missing Chart Type',
        message: "Chart configuration must include a 'type' property",
      };
    }

    // Validate chart type
    const validChartTypes = [
      'line',
      'bar',
      'area',
      'pie',
      'scatter',
      'radar',
      'composed',
    ];
    if (!validChartTypes.includes(config.type.toLowerCase())) {
      return {
        type: 'error',
        title: 'Invalid Chart Type',
        message: `Chart type '${
          config.type
        }' is not supported. Use one of: ${validChartTypes.join(', ')}`,
      };
    }

    // Check for data
    if (
      !config.data ||
      !Array.isArray(config.data) ||
      config.data.length === 0
    ) {
      return {
        type: 'error',
        title: 'Invalid Data',
        message: "Chart must include a non-empty 'data' array",
      };
    }

    // Type-specific validations
    if (
      ['line', 'bar', 'area', 'composed'].includes(config.type.toLowerCase())
    ) {
      if (!config.xKey) {
        return {
          type: 'error',
          title: 'Missing xKey',
          message: `${config.type} chart requires an 'xKey' property`,
        };
      }

      if (!config.yKey && config.type !== 'composed') {
        if (!config.composedSeries && config.type === 'composed') {
          return {
            type: 'error',
            title: 'Missing Data Series',
            message:
              "Composed chart requires either 'yKey' or 'composedSeries' property",
          };
        } else if (config.type !== 'composed') {
          return {
            type: 'error',
            title: 'Missing yKey',
            message: `${config.type} chart requires a 'yKey' property`,
          };
        }
      }
    }

    // For pie charts
    if (config.type.toLowerCase() === 'pie') {
      if (!config.xKey && !config.nameKey) {
        return {
          type: 'error',
          title: 'Missing nameKey',
          message: "Pie chart requires 'nameKey' or 'xKey' property",
        };
      }

      if (!config.yKey && !config.dataKey) {
        return {
          type: 'error',
          title: 'Missing dataKey',
          message: "Pie chart requires 'dataKey' or 'yKey' property",
        };
      }
    }

    // Return the validated configuration
    return config;
  } catch (error) {
    // Catch any other errors
    return {
      type: 'error',
      title: 'Configuration Error',
      message: `Error processing chart configuration: ${error.message}`,
    };
  }
};

export const processChartConfig = (config) => {
  // If it's an error object, return it as is
  if (config.type === 'error') {
    return config;
  }

  // Create a deep copy to avoid modifying the original
  const processedConfig = JSON.parse(JSON.stringify(config));

  // Ensure type is lowercase for consistency
  processedConfig.type = processedConfig.type.toLowerCase();

  // Default values
  const defaults = {
    colors: [
      '#8884d8',
      '#82ca9d',
      '#ffc658',
      '#FF8042',
      '#00C49F',
      '#FFBB28',
      '#0088FE',
    ],
    stacked: false,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    aspectRatio: 16 / 9,
    theme: 'light',
    animationDuration: 500,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  };

  // Apply defaults if not specified
  Object.entries(defaults).forEach(([key, value]) => {
    if (processedConfig[key] === undefined) {
      processedConfig[key] = value;
    }
  });

  // Handle specific chart type adjustments
  switch (processedConfig.type) {
    case 'pie':
      // Allow xKey/yKey as aliases for nameKey/dataKey
      processedConfig.nameKey = processedConfig.nameKey || processedConfig.xKey;
      processedConfig.dataKey = processedConfig.dataKey || processedConfig.yKey;
      break;

    case 'composed':
      // Ensure composedSeries is an array
      if (
        !processedConfig.composedSeries ||
        !Array.isArray(processedConfig.composedSeries)
      ) {
        processedConfig.composedSeries = [];

        // Create a default series if yKey is provided
        if (processedConfig.yKey) {
          const yKeys = Array.isArray(processedConfig.yKey)
            ? processedConfig.yKey
            : [processedConfig.yKey];

          processedConfig.composedSeries = yKeys.map((key, index) => ({
            type: 'line',
            dataKey: key,
            color:
              processedConfig.colors[index % processedConfig.colors.length],
          }));
        }
      }
      break;

    case 'radar':
      // Ensure we have proper polar coordinates setup
      if (!processedConfig.polarGrid) {
        processedConfig.polarGrid = true;
      }
      break;

    case 'scatter':
      // Make sure we have proper zoom if zAxis is defined
      if (processedConfig.zAxis && !processedConfig.zRange) {
        processedConfig.zRange = [20, 100]; // Default z-axis range
      }
      break;
  }

  // Validate data structure for specific chart types
  if (processedConfig.data && Array.isArray(processedConfig.data)) {
    switch (processedConfig.type) {
      case 'pie':
        // For pie charts, ensure data has the necessary properties
        if (
          processedConfig.data.some(
            (item) =>
              (processedConfig.nameKey &&
                item[processedConfig.nameKey] === undefined) ||
              (processedConfig.dataKey &&
                item[processedConfig.dataKey] === undefined)
          )
        ) {
          console.warn(
            `Some data items are missing required properties: ${processedConfig.nameKey} or ${processedConfig.dataKey}`
          );
        }
        break;

      case 'line':
      case 'bar':
      case 'area':
        // For cartesian charts, ensure data has xKey and yKey properties
        if (
          processedConfig.data.some(
            (item) => item[processedConfig.xKey] === undefined
          )
        ) {
          console.warn(
            `Some data items are missing the xKey property: ${processedConfig.xKey}`
          );
        }

        if (Array.isArray(processedConfig.yKey)) {
          processedConfig.yKey.forEach((key) => {
            if (processedConfig.data.some((item) => item[key] === undefined)) {
              console.warn(
                `Some data items are missing the yKey property: ${key}`
              );
            }
          });
        } else if (
          processedConfig.yKey &&
          processedConfig.data.some(
            (item) => item[processedConfig.yKey] === undefined
          )
        ) {
          console.warn(
            `Some data items are missing the yKey property: ${processedConfig.yKey}`
          );
        }
        break;
    }
  }

  return processedConfig;
};

export const sanitizeChartData = (data) => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item) => {
    const sanitizedItem = {};

    // Only keep primitive values that are safe for charts
    Object.entries(item).forEach(([key, value]) => {
      // Only include numbers, strings, and booleans
      if (
        typeof value === 'number' ||
        typeof value === 'string' ||
        typeof value === 'boolean' ||
        value === null
      ) {
        sanitizedItem[key] = value;
      }
    });

    return sanitizedItem;
  });
};

export const isValidChartConfig = (config) => {
  if (!config || typeof config !== 'object') {
    return false;
  }

  // Check minimum required properties
  if (!config.type || !config.data || !Array.isArray(config.data)) {
    return false;
  }

  // Check type validity
  const validTypes = [
    'line',
    'bar',
    'area',
    'pie',
    'scatter',
    'radar',
    'composed',
  ];
  if (!validTypes.includes(config.type.toLowerCase())) {
    return false;
  }

  // Type-specific validation
  switch (config.type.toLowerCase()) {
    case 'line':
    case 'bar':
    case 'area':
      return !!(config.xKey && config.yKey);

    case 'pie':
      return !!(
        (config.xKey || config.nameKey) &&
        (config.yKey || config.dataKey)
      );

    case 'scatter':
      return !!(config.xKey && config.yKey);

    case 'radar':
      return !!(config.xKey && config.yKey);

    case 'composed':
      return !!(
        config.xKey &&
        (config.yKey ||
          (config.composedSeries && Array.isArray(config.composedSeries)))
      );

    default:
      return false;
  }
};

// Added helper function to safely fix common JSON formatting issues
export const attemptToFixJSON = (jsonString) => {
  try {
    // First try to parse it directly
    return JSON.parse(jsonString);
  } catch (error) {
    try {
      // Common issues: missing commas between objects in arrays
      // Try to fix array elements missing commas
      const fixedArrayCommas = jsonString.replace(/}(\s*){/g, '},{');
      return JSON.parse(fixedArrayCommas);
    } catch (error2) {
      try {
        // Try to fix trailing commas in arrays or objects
        const fixedTrailingCommas = jsonString
          .replace(/,(\s*)}]/g, '}]')
          .replace(/,(\s*)}}/g, '}}');
        return JSON.parse(fixedTrailingCommas);
      } catch (error3) {
        // If all attempts fail, return null
        return null;
      }
    }
  }
};
