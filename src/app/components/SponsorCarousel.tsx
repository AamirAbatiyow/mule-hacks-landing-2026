import sponsors from "@/data/sponsors.json";
import { SpinningCarousel } from "./SpinningCarousel";

type Sponsor = {
  name: string;
  url?: string;
  logo?: string;
};

export function SponsorCarousel({ emptyClassName = "text-center text-white/70" }: { emptyClassName?: string }) {
  const list = sponsors as Sponsor[];

  if (list.length === 0) {
    return (
      <p className={emptyClassName}>
        Sponsors will be announced soon. Interested in supporting Mule Hacks? Email us at mulehacks2026@gmail.com
      </p>
    );
  }

  return (
    <SpinningCarousel duration={32}>
      {list.map((sponsor) => {
        const card = (
          <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 flex items-center justify-center w-56 h-32 hover:border-white/50 transition-all">
            {sponsor.logo ? (
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="max-h-20 max-w-full object-contain"
              />
            ) : (
              <span className="text-xl text-white text-center px-2">{sponsor.name}</span>
            )}
          </div>
        );

        return sponsor.url ? (
          <a key={sponsor.name} href={sponsor.url} target="_blank" rel="noopener noreferrer" className="block">
            {card}
          </a>
        ) : (
          <div key={sponsor.name}>{card}</div>
        );
      })}
    </SpinningCarousel>
  );
}
