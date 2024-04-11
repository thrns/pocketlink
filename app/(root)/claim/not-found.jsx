import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-gray-100">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Claim Not Found
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-300">
          The Claim you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/">
          <Button className="bg-gradient-to-r from-purple-600 from-purple-700 to-indigo-600 to-indigo-700 font-medium text-white">
            Back to Home Page
          </Button>
        </Link>
      </div>
    </div>
  );
}
