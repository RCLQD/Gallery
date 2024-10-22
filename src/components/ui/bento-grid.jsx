import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import React, { useState } from 'react';

function BentoGrid({ children, className }) {
  return (
    <div className={cn("grid w-full auto-rows-[22rem] grid-cols-3 gap-4", className)}>
      {children}
    </div>
  );
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  cte,
  ctd,
  slug,
  open,
}) => {
  const [isDeleting, setIsDeleting] = useState(false); // Track the deletion state

  const deleteFolder = (slug) => {
    setIsDeleting(true); // Start deleting, set state to true
    axios.delete(`/${slug}`)
      .then(response => {
        console.log('Folder deleted successfully:', response);
      })
      .catch(error => {
        console.error('Failed to delete folder:', error);
      })
      .finally(() => {
        setIsDeleting(false); // Set state to false when done
      });
  };

  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className
      )}>
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        <div className="flex items-end gap-1">
          <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            {name}
          </h3>
        </div>
        <p className="max-w-lg text-neutral-400">{description}</p>
      </div>

      <div className={cn("pointer-events-none absolute bottom-0 flex justify-between w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100")}>
        <div>
          <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
            <Link to={`/${slug}`}>
              {cta}
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-x-1">
          <Button onClick={open} variant="ghost" asChild size="sm" className="pointer-events-auto cursor-pointer hover:text-green-500 hover:font-bold">
            <a>
              {cte}
            </a>
          </Button>
          <Button
            onClick={() => deleteFolder(slug)}
            variant="ghost"
            asChild
            size="sm"
            className="pointer-events-auto cursor-pointer hover:text-red-500 hover:font-bold"
            disabled={isDeleting}
          >
            <a>
              {isDeleting ? "Deleting..." : ctd}
            </a>
          </Button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  );
};

export { BentoCard, BentoGrid };
