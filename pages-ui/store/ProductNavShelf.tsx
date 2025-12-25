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
                    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-mac-nav-202510?wid=400&hei=260&fmt=png-alpha",
            },
            {
                id: "iphone",
                label: "iPhone",
                href: "/iphone",
                imgSrc:
                    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-iphone-nav-202509?wid=1200&hei=780&fmt=png-alpha",
            },
            {
                id: "ipad",
                label: "iPad",
                href: "/ipad",
                imgSrc:
                    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-ipad-nav-202405?wid=400&hei=260&fmt=png-alpha",
            },
            {
                id: "watch",
                label: "Apple Watch",
                href: "/watch",
                imgSrc:
                    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-watch-nav-202509_GEO_VN?wid=400&hei=260&fmt=png-alpha",
            },
            {
                id: "airpods",
                label: "AirPods",
                href: "/airpods",
                imgSrc:
                    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-airpods-nav-202509?wid=400&hei=260&fmt=png-alpha",
            },
            {
                id: "airtag",
                label: "AirTag",
                href: "/accessories/airtag",
                imgSrc:
                    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-airtags-nav-202108?wid=400&hei=260&fmt=png-alpha",
            },
            {
                id: "appletv",
                label: "Apple TV 4K",
                href: "/tv-home",
                imgSrc:
                    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-appletv-nav-202210?wid=400&hei=260&fmt=png-alpha",
            },
            {
                id: "accessories",
                label: "Phụ Kiện",
                href: "/accessories",
                imgSrc:
                    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-13-accessories-nav-202509?wid=400&hei=260&fmt=png-alpha",
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
                            "hidden md:flex", // ✅ ẩn trên mobile, hiện từ md
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
                            "hidden md:flex", // ✅ ẩn trên mobile, hiện từ md
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
