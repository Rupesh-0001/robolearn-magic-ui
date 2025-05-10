import { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
  image?: string | ReactNode;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[28rem] grid-cols-3 gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  image,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col overflow-hidden rounded-xl",
      // light styles
      "bg-transparent border border-neutral-100 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-transparent dark:border-neutral-800 dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
    {...props}
  >
    <a href={href} className="h-full flex flex-col">
      {/* Text content - reduced padding */}
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-4">
        <h3 className="text-2xl font-semibold text-[#ff4164] dark:text-neutral-300">
          {name}
        </h3>
        <span className="max-w-lg text-neutral-600 dark:text-neutral-400 text-base">{description}</span>
      </div>

      {/* Image section - expanded for larger images */}
      <div className="flex-grow flex items-center justify-center p-2 min-h-[65%]">
        {image && (
          <div className="w-full h-full flex items-center justify-center transition-all duration-300 group-hover:scale-200">
            {typeof image === "string" ? (
              <img 
                src={image} 
                alt={name} 
                className="object-contain max-h-full" 
              />
            ) : (
              image
            )}
          </div>
        )}
      </div>
    </a>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
