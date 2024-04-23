import React from 'react';

const DotLoader = () => {
  return (
    <div className="relative aspect-[2] w-[60px]">
      <div className="dot animate-dot1 absolute left-0 top-1/2 h-1/2 w-1/3 rounded-full bg-black dark:bg-white"></div>
      <div className="dot animate-dot2 absolute left-1/3 top-1/2 h-1/2 w-1/3 rounded-full bg-black dark:bg-white"></div>
      <div className="dot animate-dot3 absolute left-2/3 top-1/2 h-1/2 w-1/3 rounded-full bg-black dark:bg-white"></div>

      <style>
        {`
          @keyframes loaderAnimation {
            0%   { transform: translateY(0); }
            20%  { transform: translateY(-100%); }
            40%  { transform: translateY(0); }
            60%  { transform: translateY(100%); }
            80%  { transform: translateY(0); }
          }

          .animate-dot1 {
            animation: loaderAnimation 1s infinite linear;
          }

          .animate-dot2 {
            animation: loaderAnimation 1s infinite linear 0.2s;
          }

          .animate-dot3 {
            animation: loaderAnimation 1s infinite linear 0.4s;
          }
        `}
      </style>
    </div>
  );
};

export default DotLoader;
