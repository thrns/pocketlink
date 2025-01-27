import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Brush,
  LabelList,
  ReferenceLine,
} from 'recharts';
import React, { useEffect, useState } from 'react';

export const ChartComponent = ({ config }) => {
  const [chartDimensions, setChartDimensions] = useState({
    width: '100%',
    height: '100%',
  });
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Reset error state when config changes
    setHasError(false);
    setErrorMessage('');
  }, [config]);

  // Function to handle chart errors
  const handleChartError = (error) => {
    console.error('Chart rendering error:', error);
    setHasError(true);
    setErrorMessage(
      error.message || 'An error occurred while rendering the chart'
    );
  };

  // Error display component
  const ErrorDisplay = ({ message }) => (
    <div
      style={{
        color: '#ef4444',
        padding: '1rem',
        border: '1px solid #ef4444',
        borderRadius: '0.5rem',
        background: '#fef2f2',
        fontFamily: 'var(--font-onest), system-ui, sans-serif',
        maxWidth: '100%',
        overflow: 'auto',
      }}
    >
      <h3 style={{ margin: '0 0 0.5rem 0' }}>Chart Error</h3>
      <p style={{ margin: '0' }}>{message}</p>
    </div>
  );

  // Early return if there's already an error
  if (hasError) {
    return <ErrorDisplay message={errorMessage} />;
  }

  try {
    // Validate config
    if (!config || typeof config !== 'object') {
      return <ErrorDisplay message="Invalid chart configuration" />;
    }

    // If config is an error object from the utility functions
    if (config.type === 'error') {
      return <ErrorDisplay message={`${config.title}: ${config.message}`} />;
    }

    const {
      type,
      data,
      xKey,
      yKey,
      colors = [
        '#8884d8',
        '#82ca9d',
        '#ffc658',
        '#FF8042',
        '#00C49F',
        '#FFBB28',
        '#0088FE',
      ],
      title,
      subtitle,
      stacked = false,
      showGrid = true,
      showTooltip = true,
      showLegend = true,
      aspectRatio = 16 / 9,
      xAxisLabel,
      yAxisLabel,
      xTickFormatter,
      yTickFormatter,
      tooltipFormatter,
      theme = 'light', // light or dark
      animationDuration = 500,
      referenceLines = [],
      height,
      margin = { top: 5, right: 30, left: 20, bottom: 5 },
    } = config;
    // Update chart dimensions based on aspectRatio
    useEffect(() => {
      if (height) {
        setChartDimensions({ width: '100%', height });
      } else {
        // Default to responsive with aspect ratio
        setChartDimensions({ width: '100%', height: '100%' });
      }
    }, [height, aspectRatio]);

    // Theme configurations
    const themeColors = {
      light: {
        background: '#ffffff',
        text: '#333333',
        grid: '#e0e0e0',
        tooltip: '#f8f8f8',
      },
      dark: {
        background: '#2d3748',
        text: '#e2e8f0',
        grid: '#4a5568',
        tooltip: '#1a202c',
      },
    };

    const currentTheme = themeColors[theme] || themeColors.light;

    // Data validation
    if (!data || !Array.isArray(data) || data.length === 0) {
      return <ErrorDisplay message="No data available for chart" />;
    }

    // Chart type validation
    if (!type) {
      return <ErrorDisplay message="Missing chart type in configuration" />;
    }

    // Validate required properties based on chart type
    if (['line', 'bar', 'area', 'composed'].includes(type.toLowerCase())) {
      if (!xKey) {
        return <ErrorDisplay message={`Missing xKey for ${type} chart`} />;
      }
      if (!yKey && type !== 'composed') {
        return <ErrorDisplay message={`Missing yKey for ${type} chart`} />;
      }
    }

    // Common Chart Components
    const renderCartesianGrid = () =>
      showGrid && (
        <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.grid} />
      );

    const renderXAxis = () => (
      <XAxis
        dataKey={xKey}
        label={
          xAxisLabel
            ? { value: xAxisLabel, position: 'insideBottom', offset: -5 }
            : undefined
        }
        tick={{ fill: currentTheme.text }}
        tickFormatter={
          xTickFormatter ? (value) => xTickFormatter(value) : undefined
        }
      />
    );

    const renderYAxis = () => (
      <YAxis
        label={
          yAxisLabel
            ? { value: yAxisLabel, angle: -90, position: 'insideLeft' }
            : undefined
        }
        tick={{ fill: currentTheme.text }}
        tickFormatter={
          yTickFormatter ? (value) => yTickFormatter(value) : undefined
        }
      />
    );

    const renderTooltip = () =>
      showTooltip && (
        <Tooltip
          formatter={
            tooltipFormatter
              ? (value, name) => tooltipFormatter(value, name)
              : undefined
          }
          contentStyle={{
            background: currentTheme.tooltip,
            borderColor: currentTheme.grid,
          }}
          labelStyle={{ color: currentTheme.text }}
        />
      );

    const renderLegend = () =>
      showLegend && <Legend wrapperStyle={{ color: currentTheme.text }} />;

    // Reference Lines
    const renderReferenceLines = () => {
      if (
        !referenceLines ||
        !Array.isArray(referenceLines) ||
        referenceLines.length === 0
      ) {
        return null;
      }

      return referenceLines.map((line, index) => (
        <ReferenceLine
          key={`ref-line-${index}`}
          x={line.x}
          y={line.y}
          stroke={line.color || '#ff0000'}
          strokeDasharray={line.dashed ? '3 3' : undefined}
          label={line.label}
        />
      ));
    };

    // Title and Subtitle component
    const renderTitleComponent = () => {
      if (!title && !subtitle) return null;

      return (
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {title && (
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                margin: '0 0 0.25rem 0',
                color: currentTheme.text,
              }}
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <p
              style={{
                fontSize: '0.875rem',
                color: 'rgba(107, 114, 128, 1)',
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      );
    };

    // Helper for data series rendering
    const renderDataSeries = (ChartComponent, multiSeriesProps = {}) => {
      if (Array.isArray(yKey)) {
        return yKey.map((key, index) => (
          <ChartComponent
            key={key}
            type="monotone"
            dataKey={key}
            fill={colors[index % colors.length]}
            stroke={colors[index % colors.length]}
            activeDot={{ r: 8 }}
            stackId={stacked ? 'stack' : undefined}
            animationDuration={animationDuration}
            {...multiSeriesProps}
          >
            {config.showDataLabels && (
              <LabelList
                dataKey={key}
                position="top"
                fill={currentTheme.text}
              />
            )}
          </ChartComponent>
        ));
      } else {
        return (
          <ChartComponent
            type="monotone"
            dataKey={yKey}
            fill={colors[0]}
            stroke={colors[0]}
            activeDot={{ r: 8 }}
            animationDuration={animationDuration}
            {...multiSeriesProps}
          >
            {config.showDataLabels && (
              <LabelList
                dataKey={yKey}
                position="top"
                fill={currentTheme.text}
              />
            )}
          </ChartComponent>
        );
      }
    };

    // Create chart based on type
    const renderChart = () => {
      const chartType = type.toLowerCase();

      switch (chartType) {
        case 'line':
          return (
            <LineChart data={data} margin={margin}>
              {renderCartesianGrid()}
              {renderXAxis()}
              {renderYAxis()}
              {renderTooltip()}
              {renderLegend()}
              {renderReferenceLines()}
              {renderDataSeries(Line)}
            </LineChart>
          );

        case 'bar':
          return (
            <BarChart
              data={data}
              barCategoryGap={stacked ? '10%' : '20%'}
              margin={margin}
            >
              {renderCartesianGrid()}
              {renderXAxis()}
              {renderYAxis()}
              {renderTooltip()}
              {renderLegend()}
              {renderReferenceLines()}
              {renderDataSeries(Bar)}
            </BarChart>
          );

        case 'area':
          return (
            <AreaChart data={data} margin={margin}>
              {renderCartesianGrid()}
              {renderXAxis()}
              {renderYAxis()}
              {renderTooltip()}
              {renderLegend()}
              {renderReferenceLines()}
              {renderDataSeries(Area)}
            </AreaChart>
          );

        case 'pie':
          return (
            <PieChart margin={margin}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={config.labelLine !== false}
                outerRadius={config.outerRadius || 100}
                innerRadius={config.innerRadius || 0}
                dataKey={config.dataKey || yKey}
                nameKey={config.nameKey || xKey}
                animationDuration={animationDuration}
                label={config.showLabels !== false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              {renderTooltip()}
              {renderLegend()}
            </PieChart>
          );

        case 'scatter':
          return (
            <ScatterChart margin={margin}>
              {renderCartesianGrid()}
              {renderXAxis()}
              {renderYAxis()}
              {config.zAxis && (
                <ZAxis
                  dataKey={config.zAxis}
                  range={config.zRange || [20, 100]}
                />
              )}
              {renderTooltip()}
              {renderLegend()}
              {renderReferenceLines()}
              <Scatter
                name={config.seriesName || 'Series'}
                data={data}
                fill={colors[0]}
                shape={config.shape || 'circle'}
              />
            </ScatterChart>
          );

        case 'radar':
          return (
            <RadarChart
              data={data}
              outerRadius={config.outerRadius || 100}
              margin={margin}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey={xKey} />
              <PolarRadiusAxis
                angle={config.radialAxisAngle || 30}
                domain={config.domain || [0, 'auto']}
              />
              {renderTooltip()}
              {Array.isArray(yKey) ? (
                yKey.map((key, index) => (
                  <Radar
                    key={key}
                    name={key}
                    dataKey={key}
                    stroke={colors[index % colors.length]}
                    fill={colors[index % colors.length]}
                    fillOpacity={0.6}
                  />
                ))
              ) : (
                <Radar
                  name={yKey}
                  dataKey={yKey}
                  stroke={colors[0]}
                  fill={colors[0]}
                  fillOpacity={0.6}
                />
              )}
              {renderLegend()}
            </RadarChart>
          );

        case 'composed':
          return (
            <ComposedChart data={data} margin={margin}>
              {renderCartesianGrid()}
              {renderXAxis()}
              {renderYAxis()}
              {renderTooltip()}
              {renderLegend()}
              {renderReferenceLines()}
              {config.composedSeries && Array.isArray(config.composedSeries)
                ? config.composedSeries.map((series, index) => {
                    const ChartType = {
                      bar: Bar,
                      line: Line,
                      area: Area,
                    }[series.type];

                    if (!ChartType) return null;

                    return (
                      <ChartType
                        key={`${series.type}-${series.dataKey}-${index}`}
                        type="monotone"
                        dataKey={series.dataKey}
                        fill={series.color || colors[index % colors.length]}
                        stroke={series.color || colors[index % colors.length]}
                        stackId={series.stacked ? 'stack' : undefined}
                      />
                    );
                  })
                : // Fallback if composedSeries is not provided
                  renderDataSeries(Line)}
              {config.brush && (
                <Brush dataKey={xKey} height={30} stroke={colors[0]} />
              )}
            </ComposedChart>
          );

        default:
          return <ErrorDisplay message={`Unsupported chart type: ${type}`} />;
      }
    };

    // Main render with responsive container
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {renderTitleComponent()}
        <ResponsiveContainer
          width={chartDimensions.width}
          height={chartDimensions.height}
          aspect={aspectRatio}
        >
          {renderChart()}
        </ResponsiveContainer>
      </div>
    );
  } catch (error) {
    console.error('Error in ChartComponent:', error);
    return (
      <div style={{ color: '#ef4444' }}>
        Error rendering chart: {error.message}
      </div>
    );
  }
};
