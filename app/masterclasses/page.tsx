"use client";

import masterclasses from "./masterclasses.json";
import Image from "next/image";
import Link from "next/link";

export default function ExplorePage() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-16 pb-8 sm:pb-10 2xl:pb-8">
        <div className="my-4 sm:my-6">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold">Upcoming Masterclasses</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {masterclasses.map((course) => (
            <Link
              key={course.id}
              href={`/masterclasses/${course.id}`}
              className="block transition-transform hover:scale-[1.02]"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow h-full flex flex-col">
                <div className="h-56 md:h-64 bg-gray-200 relative">
                  <Image
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    width={400}
                    height={256}
                  />
                </div>
                <div className="p-4 sm:p-6 flex-grow flex flex-col">
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">{course.date}</p>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">{course.title}</h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow">by {course.instructor}</p>
                  <div className="flex items-center mt-auto">
                    {course.isFree ? (
                      <>
                        <span className="text-[#0e8144] border border-solid border-[#0e8144] rounded px-2 py-1 bg-[#0e8144]/10 font-medium text-sm">
                          Free
                        </span>
                        <span className="ml-2 line-through text-gray-400 text-sm">{course.originalPrice}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[#0e8144] border border-solid border-[#0e8144] rounded px-2 py-1 bg-[#0e8144]/10 font-medium text-sm">
                          {course.currentPrice}
                        </span>
                        <span className="ml-2 line-through text-gray-400 text-sm">{course.originalPrice}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
