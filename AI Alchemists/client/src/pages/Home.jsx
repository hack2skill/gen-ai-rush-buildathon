import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import ImageResizer from 'react-image-file-resizer';
import Footer from '../components/Footer';
import { IoReloadOutline } from 'react-icons/io5'
import { axios } from '../api';

function Home() {

  const [defaultImage] = useState('/not-found.jpg');
  const [data, setData] = useState({
    imagePreview: defaultImage,
    image: defaultImage,
    showInstructions: false,
    selectedCrop: null,
    cropDetails: {},
    moreDetails: false
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    ImageResizer.imageFileResizer(
      file,
      1000,
      1000,
      'JPEG',
      100,
      0,
      (uri) => {
        setData((prevData) => ({
          ...prevData,
          imagePreview: uri,
        }));
        const blobImage = dataURItoBlob(uri);
        setData((prevData) => ({
          ...prevData,
          image: blobImage,
        }));
      },
      'base64'
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData((prevData) => ({
      ...prevData,
      showInstructions: true,
    })); await submitImage();
  };

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  const submitImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', data.image);
      const response = await axios.post('/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      setData((prevData) => ({
        ...prevData,
        cropDetails: response.data,
      }));
    } catch (error) {
      console.error('Error submitting image:', error);
    }
  };

  const closeModal = () => {
    setData((prevData) => ({
      ...prevData,
      moreDetails: false,
    }));
  };


  return (
    <div className='bg-slate-100 dark:bg-slate-900 w-full'>

      <div className='fixed h-screen bg-cover top-0 w-screen bg-right left-0 bg-[url("https://tailwindcss.com/_next/static/media/1-dark@tinypng.a99d6c93.png")]' />
      <Navbar />

      <div className='h-screen w-full lg:grid lg:grid-cols-2 flex flex-col lg:mt-0 mt-16 gap-6 p-10 justify-items-center place-items-center'>
        <div>
          <h1 className='text-[clamp(32px,6vw,48px)] text-black dark:text-slate-200 font-[500] tracking-[-1.4px] leading-[115%]'>Discover AgriSenseAI:</h1>
          <h1 className='text-[clamp(24px,6vw,30px)] text-slate-700 dark:text-slate-200 font-[500] tracking-[-1.4px] leading-[115%]'>Transforming Agriculture with Cutting-Edge AI Solutions</h1>
          <div className='text-[clamp(14px,4vw,18px)] mt-4 text-slate-500 dark:text-slate-300 '>Empowering Agriculture through AI: Revolutionizing Crop Health and Yield Optimization</div>
        </div>
        <div className='w-full aspect-[3/2] bg-purple-500 rounded-lg'></div>

      </div>

      <div className='w-full p-3 sm:p-10 md:p-20 flex bg-transparent items-center justify-center'>
        <form className='w-full' onSubmit={submitImage}>
          <div className='p-6 w-full bg-slate-300/50 dark:bg-slate-950/50 backdrop-blur rounded-lg flex flex-col items-center'>
            <h1 className='text-3xl font-semibold text-slate-800 dark:text-slate-100'>Analyze your Crops</h1>
            <div className='flex flex-col min-h-[60vh] w-full gap-4'>
              <div className="relative- mt-10 flex w-full gap-6 overflow-x-hidden">
                <div className="relative pt-10 overflow-hidden w-full">
                  <div className={` duration-500 transition-[width] ${data.showInstructions ? "w-full md:w-1/2" : "w-full"}`}>
                    <label className="inline-block w-min rounded mb-8">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <span className="px-4 py-2 text-sm font-medium bg-purple-500 text-white rounded-l">
                        Choose
                      </span>
                      <span className="px-4 py-2 w-fit whitespace-nowrap text-sm font-medium bg-slate-400 dark:bg-slate-600 text-white rounded-r">
                        Upload Image
                      </span>
                    </label>
                    {data.imagePreview && (
                      <div className="my-4 w-full flex justify-center">
                        <img src={data.imagePreview} alt="Uploaded" className="rounded object-contain aspect-[3/2] max-w-2xl w-full" />
                      </div>
                    )}
                  </div>
                  <div className={`md:w-1/2 w-full h-full md:absolute md:top-0 md:right-0 transition-[transform,opacity] delay-100 duration-500 ${data.showInstructions ? "translate-y-0 opacity-100" : "translate-y-[100%] opacity-0"}`}>
                    <button type='submit' className='absolute right-0 top-0 text-slate-800 dark:text-slate-200'>
                      <IoReloadOutline />
                    </button>
                    <h1 className='text-2xl text-slate-800 underline dark:text-slate-100'>Result</h1>
                    <div className='text-slate-600 dark:text-slate-300 text-justify'>
                      {data.cropDetails.title}
                    </div>
                    <h1 className='text-2xl text-slate-800 mt-6 underline dark:text-slate-100'>Description</h1>
                    <div className='text-slate-600 text-sm mt-6 dark:text-slate-300 text-justify'>{data.cropDetails.desc}</div>
                    <div className='flex w-full py-4 justify-end'>
                      {
                        data.cropDetails.sname ? (
                          <button
                            className='bg-purple-500 text-white py-1 px-4 rounded'
                            type='button'
                            onClick={() => {
                              setData((prevData) => ({
                                ...prevData,
                                moreDetails: true,
                              }));
                            }}
                          >
                            More Details
                          </button>
                        ) : (
                          <div className='text-sm text-slate-800 dark:text-slate-200'>No Problems</div>
                        )
                      }

                    </div>
                  </div>
                </div>

              </div>
              <div className={`w-full py-4 justify-end ${data.showInstructions ? "hidden" : "flex"}`}>
                <button
                  className='bg-purple-500 text-white py-1 px-4 rounded'
                  disabled={data.imagePreview === defaultImage}
                  onClick={handleSubmit}
                  type='button'
                >
                  Upload
                </button>
              </div>

              {/* Modal */}
              {data.moreDetails && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                  <div className='bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 p-8 rounded-lg'>
                    {/* Modal content */}
                    <h2 className='text-xl font-bold mb-4'>Solutions</h2>
                    <div className='flex flex-col gap-3 items-center'>
                      <h1>{data.cropDetails.sname}</h1>
                      <a className='overflow-hidden rounded' href={data.cropDetails.buy_link}>
                        <img src={data.cropDetails.simage} className='w-48' alt="supplement_image" />
                      </a>
                    </div>

                    {/* Close button */}
                    <div className='w-full flex justify-end'>
                      <button
                        className='bg-purple-500 text-white py-1 px-4 rounded mt-4'
                        type='button'
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Home