import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShinyButton from "@/components/ui/shiny-button";
import BlurFade from "@/components/ui/blur-fade";
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { UploadIcon } from "@radix-ui/react-icons";

export default function Folder() {
    const { folder_name } = useParams();
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            const fetchedImages = Array.from({ length: 9 }, (_, i) => {
                const isLandscape = i % 2 === 0;
                const width = isLandscape ? 800 : 600;
                const height = isLandscape ? 600 : 800;
                return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
            });

            setImages(fetchedImages);
            setLoading(false); // Set loading to false once data is fetched
        }, 2000); // Simulate a 2-second fetch time
    }, []);

    return (
        <div className="p-7 font-nunito">
            <Link to="/">
                <ArrowLeftIcon className="size-6 hover:text-red-600 transition hover:scale-110" />
            </Link>

            <div className='flex justify-between mt-1 mb-10'>
                <h1 className='text-4xl capitalize'>{folder_name.replace(/-/g, ' ')}</h1>
                <ShinyButton>
                    <span className="flex items-center space-x-2">
                        <UploadIcon className='size-5' />
                        <span className='text-xs md:text-lg dark:text-accent-foreground'>Upload Photo</span>
                    </span>
                </ShinyButton>
            </div>

            <section id="photos">
                <div className="columns-2 gap-4 sm:columns-3">
                    {loading
                        ? Array.from({ length: 9 }).map((_, idx) => (
                            <Skeleton key={idx}>
                                <div className="mb-4 size-full rounded-lg bg-gray-200 h-[400px]" />
                            </Skeleton>
                          ))
                        : images.map((imageUrl, idx) => (
                            <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
                                <img
                                    className="mb-4 size-full rounded-lg object-contain"
                                    src={imageUrl}
                                    alt={`Random stock image ${idx + 1}`}
                                />
                            </BlurFade>
                          ))
                    }
                </div>
            </section>
        </div>
    );
}