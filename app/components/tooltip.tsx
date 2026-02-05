"use client"

import { ReactNode, useRef, useState } from "react";

export default function Tooltip({ children, content, position = "bottom" }:
    {
        children: ReactNode,
        content: ReactNode,
        position: 'top' | 'bottom' | 'left' | 'right'
    }) {

    const [hidden, setHidden] = useState(true)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const positionClasses = {
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
        left: 'right-full top-1/2 -translte-y-1/2 mr-2'
    }

    function showTooltip() {
        timeoutRef.current = setTimeout(() => setHidden(false), 150)
    }

    function closeTooltip() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setHidden(true)
    }

    return (
        <div
            className="relative inline-block"
            onMouseEnter={showTooltip}
            onMouseLeave={closeTooltip}
            onFocus={showTooltip}
            onBlur={closeTooltip}
        >
            {children}

            {/* the tooltip  */}
            {!hidden && (
                <div className={`absolute ${positionClasses[position]} z-50 bg-[var(--primary-bg)] border rounded-md shadow-md border-[var(--primary-border)] max-w-fit p-2 min-w-22 font-code`}>
                    {content}
                </div>
            )}
        </div>
    )
}