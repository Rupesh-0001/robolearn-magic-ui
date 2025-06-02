"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Rohan",
    username: "@rohan_k",
    body: "Harpreet's teaching style is exceptional! The robotics course was well-structured and his practical approach made complex concepts easy to understand.",
    img: "/indianPerson1.jpg",
  },
  {
    name: "Arsh",
    username: "@aisha_s",
    body: "The hands-on experience with robotics projects was incredible. Harpreet's guidance helped me build my first working robot. Highly recommend his courses!",
    img: "/indianPerson2.jpg",
  },
  {
    name: "Siddharth",
    username: "@siddharth_m",
    body: "As a beginner in robotics, I found Harpreet's teaching methods perfect. The step-by-step approach and real-world examples helped me grasp the fundamentals quickly.",
    img: "/indianPerson4.jpg",
  },
  {
    name: "Priya",
    username: "@priya_d",
    body: "The community and support in Harpreet's classes are fantastic. His prompt responses to questions and detailed explanations made learning robotics enjoyable.",
    img: "/indianPerson3.jpg",
  },
  {
    name: "Suman",
    username: "@suman_k",
    body: "Harpreet's expertise in robotics is evident in his teaching. The course content is comprehensive and his practical demonstrations are invaluable.",
    img: "/indianPerson5.jpg",
  },
  {
    name: "Abhishek",
    username: "@abhishek_n",
    body: "The robotics projects were challenging yet achievable. Harpreet's mentorship helped me overcome technical hurdles and build confidence in my skills.",
    img: "/indianPerson6.jpg",
  },
  {
    name: "Himanshu",
    username: "@himanshu_b",
    body: "Harpreet's course transformed my understanding of robotics. His practical approach and real-world applications made learning engaging and effective.",
    img: "/indianPerson7.jpg",
  },
  {
    name: "Vaishnavi",
    username: "@vaishnavi_k",
    body: "The robotics course exceeded my expectations. Harpreet's teaching style and the hands-on projects provided a perfect learning experience.",
    img: "/indianPerson8.jpg",
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-80 shrink-0 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2",
        "border-gray-200 bg-gray-50 hover:bg-gray-50",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image 
          className="rounded-full w-8 h-8 object-cover border-2 border-white shadow-sm transition-transform hover:scale-105" 
          width={32} 
          height={32} 
          alt={`${name}'s avatar`} 
          src={img} 
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Reviews() {
  const half = reviews.length / 2;
  const firstRow = reviews.slice(0, half);
  const secondRow = reviews.slice(half);

  return (
    <section id="reviews" className="relative flex w-full flex-col items-center justify-center overflow-hidden mb-12 p-4 z-20">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-16 text-center">
        <span className="relative z-10">What our customers are saying</span>
      </h2>
      <Marquee 
        pauseOnHover 
        className="[--duration:20s]"
      >
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee 
        reverse 
        pauseOnHover 
        className="[--duration:20s]"
      >
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </section>
  );
}
