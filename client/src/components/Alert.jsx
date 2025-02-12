import React, { useState } from 'react'
import { X } from 'lucide-react'
import { MdOutlineDone } from "react-icons/md";

export default function Alert({ error = null, success = null }) {

    const [hide, setHide] = useState(false);

    return (
        <div
            className={`fixed min-w-96 flex gap-2 z-10 capitalize text-xs py-1 px-2 font-code bottom-5 left-1/2 transform -translate-x-1/2 rounded text-gray-700 dark:text-gray-200 bg-[#f0f0f0] dark:bg-[#1f1f1f] border border-gray-300 dark:border-[#444]
      transition-transform ${ error || success && hide === false ? "translate-y-0" : "translate-y-[300%]"}`}
        >
            {error ? (
                <p className="flex gap-2 justify-center items-center w-full">
                    {error}
                </p>
            ) : success ? (
                <p className='flex gap-2 justify-center items-center'>
                    <MdOutlineDone className="text-green-500 rounded-full text-xl" /> {success}
                </p>
            ) : null}


            <button onClick={() => setHide(p => !p)}>
                <X size="12" className='stroke-gray-700 dark:stroke-gray-300 hover:stroke-black dark:hover:stroke-white' />
            </button>
        </div>
    )
}
