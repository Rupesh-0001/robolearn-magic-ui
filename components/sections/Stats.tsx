import React from "react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface StatItemProps {
  value: number;
  label: string;
  symbol: string;
}

const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  symbol,
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div className="text-center text-gray-950 flex flex-col items-center">
      <div className="flex items-center">
        <NumberTicker
          value={value}
          className={`font-bold tracking-tighter ${
            isSmallScreen ? 'text-2xl' : isMediumScreen ? 'text-3xl' : 'text-4xl 2xl:text-5xl'
          }`}
        />
        <span className={`font-bold ${
          isSmallScreen ? 'text-2xl' : isMediumScreen ? 'text-3xl' : 'text-4xl'
        }`}>{symbol}</span>
      </div>
      <div className={`mt-2 ${
        isSmallScreen ? 'text-base' : isMediumScreen ? 'text-lg' : 'text-xl'
      }`}>{label}</div>
    </div>
  );
};

export const Stats: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  return (
    <section className="pb-12">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-around items-center gap-8 sm:gap-4 relative">
          <div className="w-full sm:w-auto px-4 sm:px-8">
            <StatItem value={10000} symbol="+" label="Learners" />
          </div>
          {!isSmallScreen && (
            <div className="hidden sm:block h-20 md:h-28 w-px bg-gray-200 absolute" style={{ left: '33.33%' }}></div>
          )}
          <div className="w-full sm:w-auto px-4 sm:px-8">
            <StatItem value={7000} symbol="+" label="Industry Grade Projects" />
          </div>
          {!isSmallScreen && (
            <div className="hidden sm:block h-20 md:h-28 w-px bg-gray-200 absolute" style={{ left: '66.66%' }}></div>
          )}
          <div className="w-full sm:w-auto px-4 sm:px-8">
            <StatItem value={95} symbol="%" label="Student Satisfaction" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
