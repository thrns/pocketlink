'use client';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#000] text-white">
      <h1 className="glitch text-6xl font-bold" data-text="404">
        404
      </h1>
      <p className="mt-4 text-lg opacity-80">
        Oops! Looks like you're lost in cyberspace...
      </p>
      <p className="text-md mt-2 opacity-70">
        Why not create your PocketLink today? 🚀
      </p>

      <a
        href="https://pocketlink.co/signup"
        className="mt-6 rounded-lg bg-gradient-to-r from-bento-blue via-bento-violet to-bento-pink px-6 py-3 text-lg font-semibold transition-all"
      >
        Create Your PocketLink
      </a>

      <style>
        {`
            .glitch {
              position: relative;
              display: inline-block;
              color: white;
              text-shadow: 2px 2px 0 #ff0055, -2px -2px 0 #00fff2;
              animation: glitch 1s infinite alternate;
            }
            
            @keyframes glitch {
              0% { text-shadow: 2px 2px 0 #ff0055, -2px -2px 0 #00fff2; }
              25% { text-shadow: -2px -2px 0 #ff0055, 2px 2px 0 #00fff2; }
              50% { text-shadow: 2px -2px 0 #ff0055, -2px 2px 0 #00fff2; }
              75% { text-shadow: -2px 2px 0 #ff0055, 2px -2px 0 #00fff2; }
              100% { text-shadow: 2px 2px 0 #ff0055, -2px -2px 0 #00fff2; }
            }
          `}
      </style>
    </div>
  );
}
