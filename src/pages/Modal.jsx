import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlurFade from "@/components/ui/blur-fade";

export default function Modal({ openModal, closeModal, folderData }) {
    const [folder, setFolder] = useState({ folder_name: '' });
    const [isCreating, setIsCreating] = useState(false);
    const [buttonText, setButtonText] = useState("Create");

    useEffect(() => {
        if (folderData && folderData.folder_name) {
            // Only set folder data if folderData exists and has folder_name
            setFolder({ folder_name: folderData.folder_name });
            setButtonText("Save Changes");
        } else {
            // Reset form for creating a new folder
            setFolder({ folder_name: '' });
            setButtonText("Create");
        }
    }, [folderData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFolder((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        setButtonText(folderData && folderData.folder_name ? "Saving..." : "Creating...");
        
        try {
            let response;
            if (folderData && folderData.folder_name) {
                response = await axios.put(`/${folderData.folder_slug}`, folder);
                console.log("Folder Updated:", response.data);
            } else {
                response = await axios.post('/', folder);
                console.log("Folder Created:", response.data);
            }
            setFolder({ folder_name: '' });
            closeModal();
        } catch (error) {
            console.error('Error Creating/Editing Folder:', error);
        } finally {
            setIsCreating(false);
            setButtonText(folderData && folderData.folder_name ? "Save Changes" : "Create");
        }
    };

    return (
        <>
            {openModal && (
                <div className='relative z-30'>
                    <div className='fixed inset-0 backdrop-blur-sm'></div>
                    <div className='fixed inset-0 grid place-items-center'>
                        <BlurFade className='text-black relative bg-white border border-slate-400 rounded-md p-2 w-[20rem] md:w-[30rem] lg:w-[40rem] shadow-md'>
                            <div className='absolute top-1 right-1'>
                                <button onClick={closeModal} className='p-2 duration-200 hover:text-red-600'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="m7 7l10 10M7 17L17 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className='px-4 lg:px-6 my-2 md:my-4 lg:my-5'>
                                <h1 className='text-lg md:text-2xl text-center lg:text-start text-blue-800 font-medium'>
                                    {folderData && folderData.folder_name ? 'Edit Folder' : 'Add New Folder'}
                                </h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className='w-full gap-y-2 px-3 md:px-8 mb-2 md:mb-4'>
                                    <div className="w-full">
                                        <label htmlFor="folder_name" className='text-sm md:text-lg block'>Folder Name</label>
                                        <input
                                            id="folder_name"
                                            name="folder_name"
                                            value={folder.folder_name}
                                            onChange={handleChange}
                                            required
                                            className='w-full text-sm md:text-lg py-1 px-2 md:px-2 md:py-2 border border-black rounded-md'
                                        />
                                    </div>
                                </div>
                                <div className="px-3 md:px-8 py-4 md:py-5 text-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 opacity-85 hover:opacity-100 text-white rounded-md w-full py-2 md:py-3"
                                        disabled={isCreating}
                                    >
                                        {buttonText}
                                    </button>
                                </div>
                            </form>
                        </BlurFade>
                    </div>
                </div>
            )}
        </>
    );
}
