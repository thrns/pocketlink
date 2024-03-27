import { createSupabaseClient } from '@/Clients/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Plasma from '@/components/Plasma';
import BlogFilters from '@/components/BlogFilters';
import { Suspense } from 'react';
import Footer from '../components/Footer';
// Generate metadata for SEO
export const metadata = {
  title: 'Blog | PocketLink - Creator Economy Insights & Tips',
  description:
    'Discover the latest insights, tips, and strategies for creators in the digital economy. Learn how to monetize your content and grow your audience.',
  openGraph: {
    title: 'Blog | PocketLink - Creator Economy Insights & Tips',
    description:
      'Discover the latest insights, tips, and strategies for creators in the digital economy.',
    type: 'website',
    url: 'https://pocketlink.co/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | PocketLink - Creator Economy Insights & Tips',
    description:
      'Discover the latest insights, tips, and strategies for creators in the digital economy.',
  },
};

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Helper function to extract reading time from content
function calculateReadingTime(content) {
  if (!content) return '5 min read';

  // Parse HTML content to get text
  const textContent = content.replace(/<[^>]*>/g, '');
  const wordsPerMinute = 200;
  const wordCount = textContent.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return `${readingTime} min read`;
}

// Helper function to extract excerpt from content
function extractExcerpt(content, maxLength = 150) {
  if (!content) return '';

  // Parse HTML content to get text
  const textContent = content.replace(/<[^>]*>/g, '');

  if (textContent.length <= maxLength) return textContent;

  return textContent.substring(0, maxLength).trim() + '...';
}

// Server component to fetch and display blogs
export default async function BlogPage({ searchParams }) {
  const supabase = await createSupabaseClient();

  // Await searchParams to fix Next.js 15 compatibility
  const params = await searchParams;

  // Get search and filter parameters
  const search = params?.search || '';
  const category = params?.category || '';

  // Build query with filters
  let query = supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  // Apply search filter
  if (search) {
    query = query.or(
      `content->>title.ilike.%${search}%,content->>sub_title.ilike.%${search}%`
    );
  }

  // Apply category filter
  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  // Fetch blogs from Supabase
  const { data: blogs, error } = await query;

  if (error) {
    console.error('Error fetching blogs:', error);
    return (
      <div className="min-h-screen w-full bg-gray-50 py-12">
        <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">Blog</h1>
            <p className="text-gray-600">
              Unable to load blog posts at the moment. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Get the latest blog for hero section
  const latestBlog = blogs && blogs.length > 0 ? blogs[0] : null;
  let latestBlogData = null;

  if (latestBlog) {
    let parsedContent = latestBlog.content;
    if (typeof latestBlog.content === 'string') {
      try {
        parsedContent = JSON.parse(latestBlog.content);
      } catch (e) {
        parsedContent = { title: 'Untitled', text: latestBlog.content };
      }
    }

    latestBlogData = {
      ...latestBlog,
      title: parsedContent?.title || 'Untitled Post',
      subtitle: parsedContent?.sub_title || '',
      coverImage:
        parsedContent?.cover_image || '/landingpage/hero/hero-image.png',
      content: parsedContent?.text || '',
      slug:
        (parsedContent?.title || 'Untitled Post')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || latestBlog.id,
    };
  }

  return (
    <>
      <div className="min-h-screen w-full bg-white">
        {/* Hero Section with Latest Blog */}
        <div className="relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-bento-violet to-bento-indigo">
          {/* Plasma Background */}
          <div className="absolute inset-0 opacity-30">
            <Suspense
              fallback={
                <div className="h-full w-full bg-gradient-to-br from-bento-violet to-bento-indigo" />
              }
            >
              <Plasma
                color="#8B5CF6"
                speed={0.5}
                opacity={0.8}
                mouseInteractive={true}
              />
            </Suspense>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid min-h-[50vh] items-center gap-12 lg:grid-cols-2">
              {latestBlogData && (
                <>
                  {/* left Content - Latest Blog Image */}
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src={latestBlogData.coverImage}
                        alt={latestBlogData.title}
                        width={600}
                        height={400}
                        className="aspect-video w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="mb-2 flex items-center gap-2 text-sm">
                          <span className="rounded-full bg-white/20 px-2 py-1 backdrop-blur-sm">
                            {latestBlogData.category || 'Creator Tips'}
                          </span>
                          <span>•</span>
                          <span>{formatDate(latestBlogData.created_at)}</span>
                        </div>
                        <h4 className="line-clamp-2 text-lg font-semibold"></h4>
                      </div>
                    </div>
                  </div>

                  {/* right Content */}
                  <div className="text-white">
                    <h1 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
                      {latestBlogData.title}
                    </h1>

                    <Link
                      href={`/blog/${latestBlogData.slug}`}
                      className="rounded-full bg-white px-6 py-2 font-bold text-bento-violet transition-colors hover:bg-gray-100"
                    >
                      Read More
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <BlogFilters search={search} category={category} />

        {/* Blog Posts Grid */}
        <div className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
          {blogs && blogs.length > 0 ? (
            <>
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">
                  Latest Articles
                </h2>
                <p className="mx-auto max-w-2xl text-gray-600">
                  Explore our collection of insights, tips, and strategies to
                  help you thrive in the creator economy.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {blogs.map((blog) => {
                  // Parse content JSON if it's a string
                  let parsedContent = blog.content;
                  if (typeof blog.content === 'string') {
                    try {
                      parsedContent = JSON.parse(blog.content);
                    } catch (e) {
                      parsedContent = {
                        title: 'Untitled',
                        content: blog.content,
                      };
                    }
                  }

                  const title = parsedContent?.title || 'Untitled Post';
                  const subtitle = parsedContent?.sub_title || '';
                  const coverImage =
                    parsedContent?.cover_image ||
                    '/landingpage/hero/hero-image.png';
                  const content = parsedContent?.text || '';

                  // Create slug from title or use id
                  const slug =
                    title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '') || blog.id;

                  return (
                    <Link
                      key={blog.id}
                      href={`/blog/${slug}`}
                      className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                    >
                      {/* Blog Image */}
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                        <Image
                          src={coverImage}
                          alt={title}
                          width={400}
                          height={225}
                          className="aspect-video w-full object-cover transition-transform duration-200"
                        />
                      </div>

                      {/* Blog Content */}
                      <div className="p-6">
                        {/* Category & Reading Time */}
                        <div className="mb-3 flex items-center justify-between text-sm text-gray-500">
                          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                            {blog.category || 'Creator Tips'}
                          </span>
                          <span>{calculateReadingTime(content)}</span>
                        </div>

                        {/* Title */}
                        <h2 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                          {title}
                        </h2>

                        {/* Subtitle or Excerpt */}
                        <p className="mb-4 line-clamp-3 text-gray-600">
                          {subtitle || extractExcerpt(content)}
                        </p>

                        {/* Author & Date */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>By {blog.author || 'PocketLink Team'}</span>
                          <span>{formatDate(blog.created_at)}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto max-w-md">
                <div className="rounded-lg bg-white p-8 shadow-sm">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <svg
                      className="h-8 w-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    No blog posts yet
                  </h3>
                  <p className="text-gray-600">
                    We're working on creating amazing content for you. Check
                    back soon for the latest insights and tips!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
