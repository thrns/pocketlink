import { cn } from '@/lib/utils';

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  direction = 'left', // Add direction prop
  ...props
}) {
  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
              'animate-marquee-left flex-row':
                !vertical && (!direction || direction === 'left'),
              'animate-marquee-right flex-row':
                !vertical && direction === 'right',
              'animate-marquee-up flex-col': vertical && direction === 'up',
              'animate-marquee-down flex-col': vertical && direction === 'down',
              'animate-marquee-vertical flex-col': vertical && !direction,
              'group-hover:pause': pauseOnHover,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
