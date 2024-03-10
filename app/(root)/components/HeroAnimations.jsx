'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { isMobile } from 'react-device-detect';

// Sample data for charts
const lineChartData = [
  { name: 'Jan', value: 10 },
  { name: 'Feb', value: 15 },
  { name: 'Mar', value: 13 },
  { name: 'Apr', value: 17 },
  { name: 'May', value: 20 },
  { name: 'Jun', value: 22 },
  { name: 'Jul', value: 19 },
];

const areaChartData = [
  { name: 'Jan', value: 10 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 42 },
  { name: 'May', value: 50 },
  { name: 'Jun', value: 55 },
  { name: 'Jul', value: 65 },
];

const pieData = [
  { name: 'A', value: 40 },
  { name: 'B', value: 30 },
  { name: 'C', value: 20 },
  { name: 'D', value: 10 },
];

const COLORS = ['#4F95D6', '#67C97C', '#F5B05F', '#E45E6A'];

// Animated Stat Card Component
export const AnimatedStatCard = ({
  title,
  value,
  type,
  chartType,
  chartColor,
  position,
}) => {
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width={80} height={40}>
            <LineChart data={lineChartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width={80} height={40}>
            <AreaChart data={areaChartData}>
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                fill={chartColor}
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width={40} height={40}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={8}
                outerRadius={18}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="absolute z-20 flex cursor-pointer items-center rounded-xl bg-white p-3 shadow-lg"
      style={{
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: [0, -8, 0, -5, 0],
        x: [0, 3, 0, -3, 0],
        transition: {
          y: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
          x: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
          scale: { duration: 0.5 },
          opacity: { duration: 0.5, delay: 0.2 },
        },
      }}
      whileHover={{
        y: -5,
        scale: 1.05,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
      }}
    >
      <div className="mr-2">{renderChart()}</div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <div className="whitespace-nowrap">
          <span className="font-semibold text-green-600">
            {value} <span className="text-xs">{type}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Animated Phone mockup component
export const AnimatedPhoneMockup = ({ template }) => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        // Add a small delay to ensure the video element is fully loaded
        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error('Auto-play was prevented:', error);
            // Try again with user interaction
            document.addEventListener(
              'click',
              () => {
                videoRef.current
                  .play()
                  .catch((e) => console.error('Still cannot play:', e));
              },
              { once: true }
            );
          });
        }
      }
    };

    // Try to play after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      playVideo();
      setVideoLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="relative mx-auto h-[570px] w-[280px]"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {/* Phone frame */}
      <div className="absolute inset-0 overflow-hidden rounded-[36px] border-[12px] border-black bg-black">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-6 w-1/3 -translate-x-1/2 transform rounded-b-xl bg-black"></div>

        {/* Template content */}
        <div className="absolute inset-0 overflow-hidden rounded-[18px] bg-gray-100">
          <video
            ref={videoRef}
            src={template.mobileUrl}
            muted
            playsInline
            loop
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

