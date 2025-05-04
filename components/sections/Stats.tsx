import React from 'react';

interface StatItemProps {
  value: string;
  color?: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, color = '#2196F3' }) => {
  return (
    <div 
      className="rounded-full py-3 px-8 text-white font-bold text-center"
      style={{ backgroundColor: color }}
    >
      {value}
    </div>
  );
};

export const Stats: React.FC = () => {
  return (
    <section className="pb-12">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-around items-center gap-8 md:gap-16">
          <StatItem value="100+" />
          <StatItem value="50+" />
          <StatItem value="95%" />
        </div>
      </div>
    </section>
  );
};

export default Stats;
