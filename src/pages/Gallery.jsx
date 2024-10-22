import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { cn } from "@/lib/utils";
import ShinyButton from "@/components/ui/shiny-button";
import GradualSpacing from "@/components/ui/gradual-spacing";
import BlurFade from "@/components/ui/blur-fade";
import Modal from './Modal';
import { BentoDemo } from './Files';

axios.defaults.baseURL = 'http://192.168.1.6:8888/api/gallery/';

export default function Gallery() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saveTheme = localStorage.getItem('darkMode');
    return saveTheme === 'true';
  });
  const [Datas, setDatas] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  function fetchData() {
    axios.get('/')
    .then(response => {
      setDatas(response.data);
    })
    .catch(error => {
      console.error('Data not Found:', error);
    }) 
  }

  const toggleModal = (folderData = null) => {
    setSelectedFolder(folderData);
    setModalOpen(!isModalOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(prevState => {
      const newTheme = !prevState;
      localStorage.setItem('darkMode', newTheme);
      return newTheme;
    });
  };

  function theme() {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  useEffect(()=>{
    fetchData();
    document.documentElement.classList.toggle('dark', isDarkMode);
  } ,[Datas, isDarkMode]);

  console.log(Datas)

  return (
    <main className="p-7 bg-background text-foreground min-h-screen font-nunito">

        <Modal openModal={isModalOpen} closeModal={toggleModal} folderData={selectedFolder} />

        <section className="flex justify-between items-center">
            <div className='text-start'>
                <GradualSpacing className='text-2xl md:text-3xl lg:text-4xl'  text="My Gallery" />
                <GradualSpacing 
                  className='hidden md:block md:text-sm lg:text-lg' 
                  duration={0.7}
                  delayMultiple={0.005}
                  text="A collection of my personal photos, capturing moments and memories that I cherish."
                />
            </div>    
            <div>
            <BlurFade>
                <button onClick={toggleTheme} className={`p-2 rounded-md hover:bg-opacity-20 ${isDarkMode ? 'hover:bg-white' : 'hover:bg-[#ccd2d8]'}`}>
                    {isDarkMode ? (
                        <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.4 18.8173H12L11.6437 18.5833C11.4064 18.4274 11.1482 18.2528 10.8692 18.0595C10.5902 17.8662 10.3321 17.6916 10.0947 17.5358L9.98845 17.4659C9.82538 17.3588 9.63455 17.3018 9.43945 17.3018H9.04625C7.65125 17.2403 6.36208 16.848 5.17875 16.125C4.43358 15.6696 3.78705 15.1133 3.23916 14.4562C2.77666 13.9014 3.18371 13.1123 3.88961 12.9594C4.77389 12.768 5.62735 12.4821 6.45 12.1018C7.73333 11.5084 8.88333 10.7021 9.9 9.68275C10.9103 8.66608 11.7171 7.51608 12.3202 6.23275C12.7028 5.41891 12.9874 4.57619 13.1743 3.70458C13.3268 2.99298 14.1223 2.5787 14.6788 3.04767C15.3709 3.6309 15.9488 4.32493 16.4125 5.12975C17.1375 6.38808 17.5 7.75058 17.5 9.21725C17.5 9.33392 17.4952 9.46567 17.4855 9.6125C17.4822 9.6632 17.4784 9.71171 17.4739 9.75804C17.4603 9.89909 17.5347 10.0371 17.6652 10.0923C17.8141 10.1551 17.9805 10.2221 18.1645 10.2933C18.3483 10.3644 18.5147 10.433 18.6635 10.499C18.777 10.5494 18.9076 10.48 18.925 10.3571C18.9454 10.2116 18.9614 10.0634 18.973 9.9125C18.991 9.67717 19 9.44542 19 9.21725C19 7.02758 18.3323 5.07725 16.997 3.36625C15.963 2.04134 14.6943 1.06952 13.1908 0.450792C12.5442 0.184684 11.9008 0.744864 11.8887 1.44401C11.8698 2.5428 11.6806 3.61788 11.3212 4.66925C10.8057 6.17692 9.97558 7.50317 8.83075 8.648C7.68591 9.79283 6.35967 10.623 4.852 11.1385C3.79837 11.4986 2.72093 11.6878 1.61968 11.7061C0.922478 11.7177 0.362671 12.3574 0.625736 13.0031C1.23908 14.5088 2.211 15.7791 3.5415 16.8143C5.2575 18.1496 7.21033 18.8173 9.4 18.8173ZM16.5 17.3173H12C11.5833 17.3173 11.2292 17.1714 10.9375 16.8798C10.6458 16.5881 10.5 16.2339 10.5 15.8173C10.5 15.4006 10.6417 15.0464 10.925 14.7548C11.2083 14.4631 11.55 14.3173 11.95 14.3173H12.5833C12.987 14.3173 13.3511 14.0745 13.5064 13.7019L13.75 13.1173C13.9833 12.5673 14.35 12.1298 14.85 11.8048C15.35 11.4798 15.9 11.3173 16.5 11.3173C17.3333 11.3173 18.0417 11.6048 18.625 12.1798C19.2083 12.7548 19.5 13.4673 19.5 14.3173C19.5 15.1506 19.2083 15.8589 18.625 16.4423C18.0417 17.0256 17.3333 17.3173 16.5 17.3173ZM16.5 18.8173C17.7487 18.8044 18.8108 18.3618 19.6865 17.4893C20.5622 16.6169 21 15.5587 21 14.3145C21 13.0702 20.5622 12.0096 19.6865 11.1328C18.8108 10.2558 17.7483 9.81725 16.499 9.81725C15.5958 9.81725 14.773 10.0621 14.0305 10.5518C13.2882 11.0413 12.737 11.7003 12.377 12.5288L12.3743 12.5349C12.3001 12.7063 12.1311 12.8173 11.9442 12.8173C11.1289 12.8378 10.4343 13.1385 9.8605 13.7195C9.28683 14.3005 9 14.9998 9 15.8173C9 16.6493 9.292 17.3573 9.876 17.9413C10.46 18.5253 11.168 18.8173 12 18.8173H16.5Z" 
                                fill={isDarkMode ? "white" : "black"}/>
                        </svg>
                    ) : (
                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11 4.21154C10.5857 4.21154 10.25 3.87575 10.25 3.46154V1.26929C10.25 0.855073 10.5857 0.519287 11 0.519287C11.4142 0.519287 11.75 0.855074 11.75 1.26929V3.46154C11.75 3.87575 11.4142 4.21154 11 4.21154ZM16.8555 6.19826C16.5618 6.49197 16.0852 6.49087 15.7929 6.19581C15.503 5.90328 15.5034 5.43169 15.7938 5.13965L17.3441 3.58029C17.6403 3.28238 18.123 3.28451 18.4165 3.58502C18.7047 3.87999 18.7019 4.35185 18.4103 4.64342L16.8555 6.19826ZM18.5385 11.75C18.1242 11.75 17.7885 11.4143 17.7885 11C17.7885 10.5858 18.1242 10.25 18.5385 10.25H20.7307C21.1449 10.25 21.4807 10.5858 21.4807 11C21.4807 11.4143 21.1449 11.75 20.7307 11.75H18.5385ZM18.4205 18.3987C18.1235 18.6958 17.6419 18.6958 17.3449 18.3987L15.8025 16.8563C15.508 16.5618 15.508 16.0843 15.8025 15.7897C16.0958 15.4964 16.571 15.495 16.866 15.7866L18.4174 17.32C18.7173 17.6165 18.7188 18.1005 18.4205 18.3987ZM6.21501 6.21198C5.9231 6.50389 5.44982 6.50388 5.15792 6.21195L3.59174 4.64563C3.2955 4.34936 3.29765 3.86838 3.59653 3.57477C3.89291 3.28361 4.369 3.28712 4.66105 3.58262L6.2181 5.15802C6.50708 5.45041 6.5057 5.92129 6.21501 6.21198ZM5.28845 18.0578H9.5962C10.0769 18.0578 10.4887 17.8863 10.8317 17.5433C11.1747 17.2003 11.3462 16.7885 11.3462 16.3078C11.3462 15.827 11.1805 15.4167 10.849 15.077C10.5176 14.7372 10.1115 14.5673 9.6307 14.5673H9.17585C8.77241 14.5673 8.40849 14.3249 8.25305 13.9526L8.07695 13.5308C7.83079 12.9551 7.44645 12.4984 6.92395 12.1605C6.40162 11.8227 5.82437 11.6538 5.1922 11.6538C4.31404 11.6538 3.56887 11.9599 2.9567 12.572C2.34454 13.1842 2.03845 13.9295 2.03845 14.8078C2.03845 15.7116 2.35412 16.4792 2.98545 17.1105C3.61695 17.742 4.38462 18.0578 5.28845 18.0578ZM5.28845 19.5578C3.97562 19.5578 2.85579 19.0943 1.92895 18.1673C1.00195 17.2405 0.538452 16.1206 0.538452 14.8078C0.538452 13.5141 0.990702 12.415 1.8952 11.5105C2.7997 10.606 3.8987 10.1538 5.1922 10.1538C6.14737 10.1538 7.01662 10.4183 7.79995 10.9473C8.39459 11.3487 8.86585 11.8526 9.21376 12.459C9.41701 12.8133 9.77867 13.0528 10.1801 13.128C10.8037 13.2447 11.36 13.53 11.849 13.9838C12.5073 14.5946 12.8397 15.3968 12.8462 16.3903C12.8255 17.2763 12.5018 18.0257 11.875 18.6385C11.248 19.2514 10.4884 19.5578 9.5962 19.5578H5.28845ZM13.5171 15.8939C13.1588 16.0798 12.7402 15.8579 12.6345 15.4683C12.5212 15.0498 12.7449 14.6228 13.1107 14.3903C13.5786 14.0928 13.9743 13.7124 14.298 13.249C14.766 12.5792 15 11.8295 15 11C15 9.90004 14.6083 8.95837 13.825 8.17504C13.0416 7.3917 12.1 7.00004 11 7.00004C9.98079 7.00004 9.09295 7.33629 8.33645 8.00879C7.77943 8.50395 7.39832 9.09321 7.19314 9.77659C7.07405 10.1732 6.6805 10.4531 6.27495 10.3693C5.83717 10.2787 5.54959 9.85424 5.67154 9.42414C5.96172 8.40075 6.52794 7.53372 7.3702 6.82304C8.4157 5.94104 9.62562 5.50004 11 5.50004C12.5256 5.50004 13.8237 6.03529 14.8942 7.10579C15.9647 8.17629 16.5 9.47437 16.5 11C16.5 12.1744 16.1637 13.2324 15.4912 14.174C14.9652 14.9107 14.3072 15.484 13.5171 15.8939Z"
                                fill={isDarkMode ? "white" : "black"}
                            />
                        </svg>
                    )}
                </button>
            </BlurFade>
          </div>
        </section>

        <section className='flex justify-end mt-5'>
            <ShinyButton onClick={toggleModal}>
                <span className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className='size-[20px]' viewBox="0 0 24 24" fill="currentColor">
                    <g>
                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                        <path d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z" />
                    </g>
                    </svg>
                    <span className='text-xs md:text-lg dark:text-accent-foreground'>Add Folder</span>
                </span>
            </ShinyButton>
        </section>

        <section className='mt-7'>
          <BlurFade className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-5'>
              {Datas?.data.map((data) => (
                <div key={data.id}>

                  <BentoDemo 
                    folder_name={data.folder_name} 
                    folder_slug={data.folder_slug} 
                    created_at={data.created_at}
                    openModal={toggleModal}
                  />

                </div>
              ))}
          </BlurFade>
        </section>
    </main>
  );
}