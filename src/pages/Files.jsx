import React from 'react';
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import Marquee from "@/components/ui/marquee";
import { FileTextIcon } from "@radix-ui/react-icons";
import { FileIcon } from "@radix-ui/react-icons";

const files = [
  {
    name: "/images/1.png",
  },
  {
    name: "/images/1.png",
  },
  {
    name: "/images/1.png",
  },
  {
    name: "/images/1.png",
  },
  {
    name: "/images/1.png",
  },
];

export function BentoDemo({ folder_name, folder_slug, created_at, openModal }) {
  const features = [
    {
      Icon: FileIcon,
      name: folder_name || 'Loading...',
      slug: folder_slug,
      description: `${new Date(created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}`,
      cta: "Open Folder",
      cte: "Edit",
      ctd: "Delete",
      open: () => openModal({ folder_name, folder_slug }),
      className: "col-span-2 md:col-span-3 lg:col-span-4",
      background: (
        <Marquee
          pauseOnHover
          className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
        >
          {files.map((f, idx) => (
            <figure
              key={idx}
              className={cn(
                "relative w-32 overflow-hidden rounded-xl border p-4",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                  <img src={f.name} alt={`Image ${idx + 1}`} className="w-full h-72 rounded-md" />
                </div>
              </div>
              <blockquote className="mt-2 text-xs">{f.body}</blockquote>
            </figure>
          ))}
        </Marquee>
      ),
    }
  ];
  
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}