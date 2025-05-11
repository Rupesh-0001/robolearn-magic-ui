import React from "react";
import { NumberTicker } from "@/components/magicui/number-ticker";

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
  return (
    <div className="text-center text-gray-950 flex flex-col items-center">
      <div className="flex items-center">
        <NumberTicker
          value={value}
          className="text-4xl font-bold tracking-tighter 2xl:text-5xl"
        />
        <span className="text-4xl font-bold">{symbol}</span>
      </div>
      <div className="text-xl mt-2">{label}</div>
    </div>
  );
};

export const Stats: React.FC = () => {
  return (
    <section className="pb-12">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-around items-center gap-4 relative">
          <div className="px-8">
            <StatItem value={1000} symbol="+" label="Learners" />
          </div>
          <div className="h-28 w-px bg-gray-200 absolute" style={{ left: '33.33%' }}></div>
          <div className="px-8">
            <StatItem value={500} symbol="+" label="Industry Grade Projects" />
          </div>
          <div className="h-28 w-px bg-gray-200 absolute" style={{ left: '66.66%' }}></div>
          <div className="px-8">
          <StatItem value={95} symbol="%" label="Student Satisfaction" />
        </div>
      </div>
      </div>
    </section>
  );
};

export default Stats;
