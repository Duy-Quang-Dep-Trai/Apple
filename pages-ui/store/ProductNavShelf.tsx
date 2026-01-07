"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Product navigation shelf (Apple Store–like)
 * - One responsive component (no desktop/mobile split).
 * - Mobile: touch horizontal scroll.
 * - Desktop: paddlenav buttons (prev/next) + smooth scroll.
 * - Images are hotlinked placeholders for interview/demo purposes.
 */

type ProductNavItem = {
    id: string;
    label: string;
    href: string;
    imgSrc: string;
};

export default function ProductNavShelf() {
    const items: readonly ProductNavItem[] = useMemo(
        () => [
            {
                id: "mac",
                label: "Mac",
                href: "/mac",
                imgSrc:
                    "https://res.cloudinary.com/df1gg3pig/image/upload/v1766819833/8ce84d14-689d-4f09-8336-1308c73eec2d.png",
            },
            {
                id: "iphone",
                label: "iPhone",
                href: "/iphone",
                imgSrc:
                    "https://res.cloudinary.com/df1gg3pig/image/upload/v1766819862/530e7ae4-d948-4465-bc8a-99db2160b9f6.png",
            },
            {
                id: "ipad",
                label: "iPad",
                href: "/ipad",
                imgSrc:
                    "https://res.cloudinary.com/df1gg3pig/image/upload/v1766819884/a357fccb-9efa-41a7-809a-e9adac1fec48.png",
            },
            {
                id: "watch",
                label: "Apple Watch",
                href: "/watch",
                imgSrc:
                    "https://res.cloudinary.com/df1gg3pig/image/upload/v1766819932/ee6ee9b2-036e-4bad-a66b-60fc244a909d.png",
            },
            {
                id: "airpods",
                label: "AirPods",
                href: "/airpods",
                imgSrc:
                    "https://res.cloudinary.com/df1gg3pig/image/upload/v1766819955/78dc99e3-039d-4dca-8052-cd423995e6b5.png",
            },
            {
                id: "airtag",
                label: "AirTag",
                href: "/accessories/airtag",
                imgSrc:
                    "https://res.cloudinary.com/df1gg3pig/image/upload/v1766819974/664cf408-c9db-4da7-8689-397d35c7c921.png",
            },
            {
                id: "appletv",
                label: "Apple TV 4K",
                href: "/tv-home",
                imgSrc:
                    "https://res.cloudinary.com/df1gg3pig/image/upload/v1766820134/9b9437ad-0384-40e4-8990-88d1f8767b5a.png",
            },
            {
                id: "accessories",
                label: "Phụ Kiện",
                href: "/accessories",
                imgSrc:
                    "https://res.cloudinary.com/df1gg3pig/image/upload/v1766820150/0728a43b-e162-42e1-b451-33827329d742.png",
            },
        ],
        []
    );

    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const updateNavState = () => {
        const el = scrollerRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        setCanPrev(el.scrollLeft > 0);
        setCanNext(el.scrollLeft < max - 1);
    };

    useEffect(() => {
        updateNavState();

        const el = scrollerRef.current;
        if (!el) return;

        const onScroll = () => updateNavState();
        const onResize = () => updateNavState();

        el.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        return () => {
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const scrollByAmount = (dir: -1 | 1) => {
        const el = scrollerRef.current;
        if (!el) return;
        const delta = Math.round(el.clientWidth * 0.85) * dir;
        el.scrollBy({ left: delta, behavior: "smooth" });
    };

    return (
        <section className="bg-[#f5f5f7]">
            {/* Match Store content width */}
            <div className="mx-auto w-full max-w-[1190px] pb-10">
                <div className="relative">
                    <div
                        ref={scrollerRef}
                        role="list"
                        aria-label="Sản Phẩm"
                        className={[
                            "overflow-x-auto scroll-smooth",
                            // hide scrollbar (Apple-like)
                            "[scrollbar-width:none]",
                            "[-ms-overflow-style:none]",
                            "[&::-webkit-scrollbar]:hidden",
                        ].join(" ")}
                    >
                        <div className="flex gap-6">
                            {items.map((it) => (
                                <div key={it.id} role="listitem" className="shrink-0">
                                    <Link href={it.href} className="group block w-[120px]">
                                        <div className="flex flex-col items-center">
                                            <div className="h-[78px] w-[120px]">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={it.imgSrc}
                                                    alt=""
                                                    loading="lazy"
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>

                                            <div className="mt-3 text-center text-[14px] font-medium text-[#1d1d1f] group-hover:underline">
                                                {it.label}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop-only paddlenav (Apple-like: arrows mainly for desktop) */}
                    <button
                        type="button"
                        aria-label="Trước - Sản Phẩm"
                        disabled={!canPrev}
                        onClick={() => scrollByAmount(-1)}
                        className={[
                            "hidden md:flex", // ẩn trên mobile, hiện từ md
                            "absolute left-[-18px] top-1/2 -translate-y-1/2",
                            "h-10 w-10 items-center justify-center rounded-full",
                            "bg-white/90 backdrop-blur shadow-sm",
                            "transition-opacity",
                            canPrev ? "opacity-100" : "opacity-0 pointer-events-none",
                        ].join(" ")}
                    >
                        <span aria-hidden="true" className="text-[22px] leading-none">
                            ‹
                        </span>
                    </button>

                    <button
                        type="button"
                        aria-label="Tiếp - Sản Phẩm"
                        disabled={!canNext}
                        onClick={() => scrollByAmount(1)}
                        className={[
                            "hidden md:flex", // ẩn trên mobile, hiện từ md
                            "absolute right-[-18px] top-1/2 -translate-y-1/2",
                            "h-10 w-10 items-center justify-center rounded-full",
                            "bg-white/90 backdrop-blur shadow-sm",
                            "transition-opacity",
                            canNext ? "opacity-100" : "opacity-0 pointer-events-none",
                        ].join(" ")}
                    >
                        <span aria-hidden="true" className="text-[22px] leading-none">
                            ›
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
