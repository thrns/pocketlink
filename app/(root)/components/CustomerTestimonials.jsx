import React from 'react';
import { cn } from '@/lib/utils';
import { Marquee } from '@/components/magicui/marquee';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ExternalLinkIcon } from 'lucide-react';
import { IoOpenOutline } from 'react-icons/io5';

const CustomerTestimonials = () => {
  // Updated testimonial data with occupation and pocketlink URL
  const testimonials = [
    {
      id: 1,
      name: 'Akash Pai',
      occupation: 'Designer',
      comment:
        'A very good website to easily display your work, made a quick portfolio in less than 30 mins.',
      color: '#3B82F6',
      avatar:
        'https://pbs.twimg.com/profile_images/1496951793523503106/_hHnLOSe_400x400.jpg',
      initials: 'AP',
      pocketlink: 'akash.pocketlink.co',
    },
    {
      id: 2,
      name: 'Xtremlite',
      occupation: 'Content Creator',
      comment: 'It feels good and its free. Overall, 8/10',
      color: '#10B981',
      avatar:
        'https://pbs.twimg.com/profile_images/1916855623641448448/-QFZ54kG_400x400.jpg',
      initials: 'XL',
      pocketlink: 'xtremlite.pocketlink.co',
    },

    {
      id: 3,
      name: 'Gargii Chatterjee',
      occupation: 'Affiliate Marketer',
      comment:
        'My profile looks soooooo good!! My conversions and sales shot up since I started using it.',
      color: '#9333EA',
      avatar:
        'https://nrmyvnoocshxoqmibdip.supabase.co/storage/v1/object/public/avatars/user/banner/1746765468499-user',
      initials: 'GC',
      pocketlink: 'gargiii.pocketlink.co',
    },
    // {
    //   id: 4,
    //   name: "Varun Padmanabhan",
    //   occupation: "Digital Marketing Expert",
    //   comment:
    //     "Pocketlink's one link-in-bio platform makes connecting with clients and sharing my work effortless. The clean design and seamless integration have boosted my professional presence and engagement like never before. Definitely better than other tools in the market!",
    //   color: "#F59E0B",
    //   avatar: "/peopleBrandMarquee/varunpaddy.jpg",
    //   initials: "VP",
    //   pocketlink: "varunpaddy.pocketlink.co",
    // },
    {
      id: 5,
      name: 'Sonal',
      occupation: 'UGC Creator',
      comment:
        'Pocketlink allows me showcase all of my social media accounts while maintaining my aesthetics.',
      color: '#06B6D4',
      avatar:
        'https://pbs.twimg.com/profile_images/1886454721285906433/dwY1tlG1_400x400.jpg',
      initials: 'S',
      pocketlink: 'sonal.pocketlink.co',
    },

    {
      id: 6,
      name: 'Aashir',
      occupation: 'Freelancer',
      comment:
        "I don't have to maintain a separate website to showcase my portfolio. Simplified yet premium.",
      color: '#EF4444',
      avatar:
        'https://pbs.twimg.com/profile_images/1759205247992418304/Fv3lPgjT_400x400.jpg',
      initials: 'A',
      pocketlink: 'aashir.pocketlink.co',
    },
    {
      id: 7,
      name: 'Avantika Madhur',
      occupation: 'Digital Creator',
      comment:
        "I absolutely loved it. It's so easy to use and so customisable. JUST A WOW.",
      color: '#EC4899',
      avatar:
        'https://pbs.twimg.com/profile_images/1789598238229536768/bZ76j9Y4_400x400.jpg',
      initials: 'AM',
      pocketlink: 'avantika.pocketlink.co',
    },
    {
      id: 8,
      name: 'Arjun Sethi',
      occupation: 'Entrepreneur',
      comment: 'I ditched my wix made portfolio site for this.',
      color: '#4F46E5',
      avatar:
        'https://media.licdn.com/dms/image/v2/D5603AQGauteu5yXwyA/profile-displayphoto-shrink_800_800/B56ZToAevIGoAg-/0/1739059228054?e=1752105600&v=beta&t=9MF6VUiUHpCUVPlHGNr2AtiQrQitwAml0sdgMvrsAGw',
      initials: 'AS',
      pocketlink: 'arjun.pocketlink.co',
    },
  ];

  // Splitting testimonials for two rows
  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  // Enhanced Testimonial card component
  const TestimonialCard = ({ testimonial }) => {
    return (
      <div
        className={cn(
          'relative mx-3 w-80 -translate-y-1 rounded-xl border bg-white/95 p-5 transition-all duration-300',
          'border-gray-200/70 backdrop-blur-sm',
          'dark:border-gray-700/80 dark:bg-gray-800/90 hover:dark:bg-gray-800/95'
        )}
      >
        <div className="flex items-start gap-3">
          {/* Avatar with subtle ring */}
          <Avatar
            className="h-12 w-12 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800"
            style={{ ringColor: testimonial.color + '60' }}
          >
            <AvatarImage
              src={testimonial.avatar}
              alt={`${testimonial.name}'s profile`}
            />
            <AvatarFallback
              className="text-sm font-medium"
              style={{
                backgroundColor: testimonial.color + '20',
                color: testimonial.color,
              }}
            >
              {testimonial.initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col">
              <h3 className="truncate text-sm font-semibold text-gray-800 dark:text-white">
                {testimonial.name}
              </h3>
              <Badge
                variant="outline"
                className="mt-1 w-fit px-2 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: testimonial.color + '15',
                  color: testimonial.color,
                  borderColor: testimonial.color + '30',
                }}
              >
                {testimonial.occupation}
              </Badge>
              <a
                href={`https://${testimonial.pocketlink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-2 top-2 mt-1.5 flex items-center text-xs text-gray-500 underline dark:text-gray-400"
              >
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="relative mt-4">
          <svg
            className="absolute -left-1 -top-2 h-6 w-6 text-gray-300 opacity-40 dark:text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="line-clamp-3 pl-5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {testimonial.comment}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="relative py-12 w-full overflow-hidden bg-gray-50 font-sans md:py-20">
      <div className="relative mx-auto max-w-6xl">
        {/* Enhanced Section Heading */}
        <div className="relative mb-12 text-center">
          <h2 className="mb-4 text-4xl font-medium text-gray-900 md:text-5xl">
            <span className="bg-gradient-to-r from-bento-violet  to-bento-indigo bg-clip-text text-transparent">
              Loved
            </span>{' '}
            by our users
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Join a growing community of inspiring artists and innovators{' '}
          </p>
        </div>

        {/* Enhanced Testimonials Marquee */}
        <div className="relative">
          <Marquee
            pauseOnHover={true}
            className="py-3"
            style={{ '--duration': '40s', '--gap': '1rem' }}
          >
            {firstRow.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Marquee>

          {/* Second row marquee with reverse direction */}
          <Marquee
            pauseOnHover={true}
            className="mt-6 py-3"
            reverse={true}
            style={{ '--duration': '35s', '--gap': '1rem' }}
          >
            {secondRow.map((testimonial) => (
              <TestimonialCard
                key={`reverse-${testimonial.id}`}
                testimonial={testimonial}
              />
            ))}
          </Marquee>
        </div>

        {/* Enhanced Call to Action */}
        <div className="mt-12 text-center">
          <a
            href="/signup"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-bento-violet to-bento-indigo px-6 py-3 font-medium text-white transition-all duration-300"
          >
            Create your profile
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Join over 25,000+ happy users today
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
