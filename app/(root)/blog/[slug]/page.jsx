import {
  createSupabaseClient,
  createSupabaseBuildClient,
} from '@/Clients/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '../../components/Footer';
// Helper function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Helper function to calculate reading time
function calculateReadingTime(content) {
  if (!content) return '5 min read';

  const textContent = content.replace(/<[^>]*>/g, '');
  const wordsPerMinute = 200;
  const wordCount = textContent.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return `${readingTime} min read`;
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const supabase = createSupabaseBuildClient();
  const { slug } = await params;

  // Fetch all blogs to find the matching one
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (!blogs) {
    return {
      title: 'Blog Post Not Found | PocketLink',
      description: 'The requested blog post could not be found.',
    };
  }

  // Find the blog by matching slug
  const blog = blogs.find((blog) => {
    let parsedContent = blog.content;
    if (typeof blog.content === 'string') {
      try {
        parsedContent = JSON.parse(blog.content);
      } catch (e) {
        parsedContent = { title: 'Untitled' };
      }
    }

    const title = parsedContent?.title || 'Untitled Post';
    const blogSlug = createSlug(title) || blog.id;
    return blogSlug === slug;
  });

  if (!blog) {
    return {
      title: 'Blog Post Not Found | PocketLink',
      description: 'The requested blog post could not be found.',
    };
  }

  // Parse content
  let parsedContent = blog.content;
  if (typeof blog.content === 'string') {
    try {
      parsedContent = JSON.parse(blog.content);
    } catch (e) {
      parsedContent = { title: 'Untitled', content: blog.content };
    }
  }

  const title = parsedContent?.title || 'Untitled Post';
  const subtitle = parsedContent?.subtitle || '';
  const coverImage =
    parsedContent?.cover_image;

  // Parse SEO data if available
  let seoData = {};
  if (blog.seo && typeof blog.seo === 'string') {
    try {
      seoData = JSON.parse(blog.seo);
    } catch (e) {
      seoData = {};
    }
  } else if (blog.seo && typeof blog.seo === 'object') {
    seoData = blog.seo;
  }

  return {
    title: seoData.title || `${title} | PocketLink Blog`,
    description:
      seoData.description ||
      subtitle ||
      'Read the latest insights and tips for creators in the digital economy.',
    keywords:
      seoData.keywords ||
      'creator economy, monetization, content creation, digital marketing',
    openGraph: {
      title: seoData.openGraph?.title || title,
      description: seoData.openGraph?.description || subtitle,
      type: 'article',
      url: `https://pocketlink.co/blog/${slug}`,
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: blog.created_at,
      authors: [blog.author || 'PocketLink Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.twitter?.title || title,
      description: seoData.twitter?.description || subtitle,
      images: [coverImage],
    },
  };
}

// Generate static params for static generation (optional)
export async function generateStaticParams() {
  const supabase = createSupabaseBuildClient();

  const { data: blogs } = await supabase
    .from('blogs')
    .select('id, content')
    .order('created_at', { ascending: false });

  if (!blogs) return [];

  return blogs.map((blog) => {
    let parsedContent = blog.content;
    if (typeof blog.content === 'string') {
      try {
        parsedContent = JSON.parse(blog.content);
      } catch (e) {
        parsedContent = { title: 'Untitled' };
      }
    }

    const title = parsedContent?.title || 'Untitled Post';
    const slug = createSlug(title) || blog.id;

    return {
      slug: slug,
    };
  });
}

// Main blog post component
export default async function BlogPostPage({ params }) {
  const supabase = await createSupabaseClient();
  const { slug } = await params;

  // Fetch all blogs to find the matching one
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !blogs) {
    console.error('Error fetching blogs:', error);
    notFound();
  }

  // Find the blog by matching slug
  const blog = blogs.find((blog) => {
    let parsedContent = blog.content;
    if (typeof blog.content === 'string') {
      try {
        parsedContent = JSON.parse(blog.content);
      } catch (e) {
        parsedContent = { title: 'Untitled' };
      }
    }

    const title = parsedContent?.title || 'Untitled Post';
    const blogSlug = createSlug(title) || blog.id;
    return blogSlug === slug;
  });

  if (!blog) {
    notFound();
  }

  // Parse content
  let parsedContent = blog.content;
  if (typeof blog.content === 'string') {
    try {
      parsedContent = JSON.parse(blog.content);
    } catch (e) {
      parsedContent = { title: 'Untitled', content: blog.content };
    }
  }

  const title = parsedContent?.title || 'Untitled Post';
  const subtitle = parsedContent?.subtitle || '';
  const coverImage =
    parsedContent?.cover_image || '/landingpage/hero/hero-image.png';
  const content = parsedContent?.text || '';
  const readingTime = calculateReadingTime(content);

  // Get current blog's tags
  let currentBlogTags = [];
  if (blog.tags) {
    try {
      // Parse tags if they're stored as JSON string
      currentBlogTags = blog.tags;
    } catch (e) {
      console.warn('Error parsing blog tags:', e);
      currentBlogTags = [];
    }
  }

  // Function to calculate tag similarity score
  const calculateTagSimilarity = (blogTags, currentTags) => {
    if (!blogTags || !currentTags || currentTags.length === 0) return 0;

    let parsedBlogTags = [];
    try {
      parsedBlogTags =
        typeof blogTags === 'string' ? JSON.parse(blogTags) : blogTags;
    } catch (e) {
      return 0;
    }

    if (!Array.isArray(parsedBlogTags) || parsedBlogTags.length === 0) return 0;

    // Count matching tags
    const matchingTags = parsedBlogTags.filter((tag) =>
      currentTags.some(
        (currentTag) => currentTag.toLowerCase() === tag.toLowerCase()
      )
    );

    // Calculate similarity score (percentage of matching tags)
    return (
      matchingTags.length / Math.max(parsedBlogTags.length, currentTags.length)
    );
  };

  // Get related posts based on tag similarity
  const relatedPosts = blogs
    .filter((relatedBlog) => relatedBlog.id !== blog.id) // Exclude current blog
    .map((relatedBlog) => ({
      ...relatedBlog,
      similarity: calculateTagSimilarity(relatedBlog.tags, currentBlogTags),
    }))
    .filter((relatedBlog) => relatedBlog.similarity > 0) // Only include blogs with matching tags
    .sort((a, b) => b.similarity - a.similarity) // Sort by similarity score (highest first)
    .slice(0, 3); // Take top 3 most similar

  // If we don't have enough tag-based matches, fill with recent posts
  if (relatedPosts.length < 3) {
    const recentPosts = blogs
      .filter(
        (relatedBlog) =>
          relatedBlog.id !== blog.id &&
          !relatedPosts.some((rp) => rp.id === relatedBlog.id)
      )
      .slice(0, 3 - relatedPosts.length);

    relatedPosts.push(...recentPosts);
  }

  return (
    <>
      <div className="min-h-screen w-full bg-white">
        {/* Navigation Breadcrumb */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="transition-colors hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="transition-colors hover:text-blue-600"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="truncate text-gray-900">{title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <header className="mb-8">
            {/* Category */}
            <div className="mb-4">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                {blog.category || 'Creator Tips'}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="mb-6 text-xl leading-relaxed text-gray-600">
                {subtitle}
              </p>
            )}

            {/* Meta Information */}
            <div className="mb-8 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>By {blog.author || 'PocketLink Team'}</span>
                <span>•</span>
                <span>{formatDate(blog.created_at)}</span>
                <span>•</span>
                <span>{readingTime}</span>
              </div>
            </div>

            {/* Cover Image */}
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <Image
                src={coverImage}
                alt={title}
                width={800}
                height={450}
                className="aspect-video w-full rounded-lg object-cover shadow-lg"
                priority
              />
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
            />
          </div>

          {/* Tags */}
          {blog.tags && (
            <div className="mt-12 border-t border-gray-200 pt-8">
              <h3 className="mb-4 text-sm font-medium text-gray-900">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 text-3xl font-bold text-gray-900">
                Related Articles
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedBlog) => {
                  let parsedContent = relatedBlog.content;
                  if (typeof relatedBlog.content === 'string') {
                    try {
                      parsedContent = JSON.parse(relatedBlog.content);
                    } catch (e) {
                      parsedContent = { title: 'Untitled' };
                    }
                  }

                  const relatedTitle = parsedContent?.title || 'Untitled Post';
                  const relatedSubtitle = parsedContent?.subtitle || '';
                  const relatedCoverImage =
                    parsedContent?.cover_image ||
                    '/landingpage/hero/hero-image.png';
                  const relatedSlug =
                    createSlug(relatedTitle) || relatedBlog.id;

                  return (
                    <Link
                      key={relatedBlog.id}
                      href={`/blog/${relatedSlug}`}
                      className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                    >
                      <div className="aspect-w-16 aspect-h-9">
                        <Image
                          src={relatedCoverImage}
                          alt={relatedTitle}
                          width={300}
                          height={200}
                          className="aspect-video w-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                          {relatedTitle}
                        </h3>
                        {relatedSubtitle && (
                          <p className="line-clamp-2 text-sm text-gray-600">
                            {relatedSubtitle}
                          </p>
                        )}
                        <div className="mt-4 text-sm text-gray-500">
                          {formatDate(relatedBlog.created_at)}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: title,
              description: subtitle,
              image: coverImage,
              author: {
                '@type': 'Organization',
                name: blog.author || 'PocketLink Team',
              },
              publisher: {
                '@type': 'Organization',
                name: 'PocketLink',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://pocketlink.co/logo.png',
                },
              },
              datePublished: blog.created_at,
              dateModified: blog.created_at,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://pocketlink.co/blog/${slug}`,
              },
            }),
          }}
        />
      </div>
      <Footer />
    </>
  );
}
