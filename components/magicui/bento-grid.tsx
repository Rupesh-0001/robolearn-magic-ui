import React, { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background?: string;
  description: string;
  href: string;
  cta?: string;
  image?: string | ReactNode;
  descriptionClassName?: string;
  imageClassName?: string;
  hoverClassName?: string;
}

// Function to check if an element is a specific component type
const isComponentType = (element: React.ReactElement, componentNames: string[]): boolean => {
  if (!element || !element.type) return false;
  
  const typeName = typeof element.type === 'string' 
    ? element.type 
    : (element.type as React.ComponentType).displayName || (element.type as React.ComponentType).name || '';
  
  return componentNames.includes(typeName);
};

// Helper function to safely get children from a React element
const getElementChildren = (element: React.ReactElement): React.ReactNode => {
  try {
    // Using type assertion to handle props
    return (element.props as { children?: React.ReactNode }).children;
  } catch {
    return null;
  }
};

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[20rem] grid-cols-3 gap-4",
        className
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
  description,
  href,
  image,
  descriptionClassName,
  imageClassName,
  hoverClassName,
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
      className
    )}
    {...props}
  >
    <a href={href} className="h-full flex flex-col">
      {/* Text content - reduced padding */}
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-3">
        <h3 className="text-xl font-semibold text-[#ff4164]">{name}</h3>
        <span className={cn(
            "text-neutral-600 text-sm",
            descriptionClassName
          )}
        >
          {description}
        </span>
      </div>

      {/* Image section with position-based animations */}
      <div className="flex-grow flex items-center justify-center p-2 min-h-[60%] relative">
        {image && (
          <>
            {/* This is for background elements that should remain fixed */}
            {typeof image !== "string" && React.isValidElement(image) && (
              <div className="absolute inset-0 z-0">
                {/* Extract background component - this won't move */}
                {isComponentType(image, ['WarpBackground', 'FlickeringGrid', 'Ripple']) 
                  ? image 
                  : null}
              </div>
            )}
            
            {/* This is the actual content that will animate on hover */}
            <div 
              className={cn(
                "w-full h-full flex items-center justify-center transition-all duration-300 z-10 relative",
                imageClassName
              )}
            >
              {typeof image === "string" ? (
                <img
                  src={image}
                  alt={name}
                  className="object-contain max-h-full"
                />
              ) : React.isValidElement(image) ? (
                // If the image is a background component, render its children instead
                isComponentType(image, ['WarpBackground', 'FlickeringGrid', 'Ripple']) && 
                getElementChildren(image) ? 
                  getElementChildren(image) : image
              ) : (
                // Fallback for any other ReactNode type
                image
              )}
            </div>
          </>
        )}
      </div>
    </a>
    <div className={cn("pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:dark:bg-neutral-800/10",
      hoverClassName
    )} />
  </div>
);

export { BentoCard, BentoGrid };
