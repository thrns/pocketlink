'use client';
import React from 'react';
import { Button } from '../ui/button';

const AccessBlocker = ({ user }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 text-black dark:bg-black dark:text-white">
      <div className="mb-4 w-3/4">
        <img
          src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
          alt="Access Restricted"
          className="h-auto w-full rounded-lg"
        />
      </div>
      <p className="px-4 text-center text-xl font-semibold">
        Sorry, you cannot edit your bento on phones or tablets. Please use a
        desktop device.
      </p>
      <Button
        className="mt-2"
        onClick={() => {
          user?.customDomainLinked
            ? window.open(`https://${user?.customDomain}`)
            : window.open(`https://${user?.username}.pocketlink.co/`);
        }}
      >
        View Instead
      </Button>
    </div>
  );
};

export default AccessBlocker;
