import { Children, ReactNode } from "react";

type SpinningCarouselProps = {
  children: ReactNode;
  duration?: number;
  className?: string;
};

export function SpinningCarousel({
  children,
  duration = 28,
  className = "",
}: SpinningCarouselProps) {
  const items = Children.toArray(children);
  if (items.length === 0) return null;

  const minVisible = 8;
  const padded = [...items];
  while (padded.length < minVisible) {
    padded.push(...items);
  }
  const loop = [...padded, ...padded];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="mh-marquee flex w-max gap-6 hover:[animation-play-state:paused]"
        style={{ ["--mh-marquee-duration" as string]: `${duration}s` }}
      >
        {loop.map((child, index) => (
          <div key={index} className="shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
