"use client";

import { useEffect, useRef } from "react";

export default function AppleMenuTrigger({
    isOpen,
    onToggle,
}: {
    isOpen: boolean;
    onToggle: () => void;
}) {
    const openTop = useRef<SVGAnimateElement | null>(null);
    const openBottom = useRef<SVGAnimateElement | null>(null);
    const closeTop = useRef<SVGAnimateElement | null>(null);
    const closeBottom = useRef<SVGAnimateElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            openTop.current?.beginElement();
            openBottom.current?.beginElement();
        } else {
            closeTop.current?.beginElement();
            closeBottom.current?.beginElement();
        }
    }, [isOpen]);

    return (
        <button
            aria-label={isOpen ? "Close" : "Menu"}
            onClick={onToggle}
            className="flex h-8 w-8 items-center justify-center hover:opacity-80"
        >
            <svg width="18" height="18" viewBox="0 0 18 18">
                {/* bottom line */}
                <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="2 12, 16 12"
                >
                    <animate
                        ref={(el) => (openBottom.current = el)}
                        attributeName="points"
                        dur="0.24s"
                        begin="indefinite"
                        fill="freeze"
                        values="2 12,16 12; 2 9,16 9; 3.5 15,15 3.5"
                    />
                    <animate
                        ref={(el) => (closeBottom.current = el)}
                        attributeName="points"
                        dur="0.24s"
                        begin="indefinite"
                        fill="freeze"
                        values="3.5 15,15 3.5; 2 9,16 9; 2 12,16 12"
                    />
                </polyline>

                {/* top line */}
                <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="2 5, 16 5"
                >
                    <animate
                        ref={(el) => (openTop.current = el)}
                        attributeName="points"
                        dur="0.24s"
                        begin="indefinite"
                        fill="freeze"
                        values="2 5,16 5; 2 9,16 9; 3.5 3.5,15 15"
                    />
                    <animate
                        ref={(el) => (closeTop.current = el)}
                        attributeName="points"
                        dur="0.24s"
                        begin="indefinite"
                        fill="freeze"
                        values="3.5 3.5,15 15; 2 9,16 9; 2 5,16 5"
                    />
                </polyline>
            </svg>
        </button>
    );
}
