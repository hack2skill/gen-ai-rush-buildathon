"use client"

import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loading from './loading';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#3717e8',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function Basic(props) {

    const [techStack, setTechStack] = useState("Select TechStack")
    const [loading, setLoading] = useState(false)

    const options = ["DJango", "React.js"]

    const {
        getRootProps,
        getInputProps,
        acceptedFiles,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        maxFiles: 1, accept: {
            'application/zip': ['.zip']
        }
    });

    const style = React.useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const uploadHandler = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            if (acceptedFiles.length > 0) {
                formData.append("file", acceptedFiles[0]);
            }

            var requestOptions = {
                method: "POST",
                body: formData,
                redirect: "follow",
            };

            const response = await fetch("https://b02b-14-142-151-66.ngrok-free.app/doxify", requestOptions);
            if (response.ok) {
                console.log("all is good")
                const blob = await response.blob();
                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'docs.zip'); // Specify the filename for the downloaded file
                document.body.appendChild(link);
                link.click();
                link.remove();
                setLoading(false)
            }else{
                setLoading(false)
            }
        }catch(err){
            console.log(err)
            setLoading(false)
        }
        
    }

    return (

        <div className='flex flex-col h-screen bg-black justify-center items-center relative gap-36'>
            {loading
                ? <Loading />
                : <>
                    <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-gray-400 inline text-[72px] font-bold">
                        DoxifyAI
                    </h1>
                    <div className=' w-1/3 min-h-fit rounded-xl p-10 flex justify-between items-center flex-col border-[1px] border-slate-600 hover:shadow-[5px_5px_rgba(86,_22,_122,_0.4),_10px_10px_rgba(86,_22,_122,_0.3),_15px_15px_rgba(86,_22,_122,_0.2),_20px_20px_rgba(86,_22,_122,_0.1),_25px_25px_rgba(86,_22,_122,_0.05)] z-10 bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40'>
                        <h4 className=' flex justify-center m-4 font-semibold text-gray-100'>Upload Zip file of your code</h4>
                        <section className="container">
                            <div {...getRootProps({ style })}>
                                <input {...getInputProps()} />
                                <p>Drag &apos;n&apos; drop, or click to select files</p>
                                <p>Choose only one file</p>
                            </div>
                            <aside>
                                {acceptedFiles.length > 0 &&
                                    <>
                                        <h4 className=' text-gray-100 font-semibold'>Files</h4>
                                        <ul className=' text-gray-100'>{files}</ul>
                                    </>}
                            </aside>
                        </section>
                        {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">TechStack</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={techStack}
                                defaultValue='Select TechStack'
                                onChange={(e) => setTechStack(e.target.value)}
                                label="TechStack"
                            >
                                {options.map((data, index) => {
                                    return <MenuItem value={data} key={index}>{data}</MenuItem>
                                })}
                            </Select>
                        </FormControl> */}
                        <button onClick={uploadHandler} class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group w-48 mt-10">
                            <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                            <span class="relative w-full text-center text-black transition-colors duration-300 ease-in-out group-hover:text-white">Generate</span>
                        </button>
                    </div>
                </>
            }
            <img src="/gradient.svg" loading="eager" alt="" className=' z-1 absolute'></img>
        </div>
    );
}