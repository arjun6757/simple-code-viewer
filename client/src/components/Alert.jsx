import React from 'react'

export default function Alert({ error }) {
    return (
        <div
            className={`fixed z-50 capitalize text-xs py-1 px-2 font-code bottom-5 left-1/2 transform -translate-x-1/2 rounded text-gray-700 dark:text-gray-200 bg-[#f0f0f0] dark:bg-[#1f1f1f] border border-gray-300 dark:border-[#444]
      transition-transform ${success ? "translate-y-0" : "translate-y-[300%]"}`}
        >
            <p className="flex gap-2 justify-center items-center">
                {error}
            </p>
        </div>
    )
}
