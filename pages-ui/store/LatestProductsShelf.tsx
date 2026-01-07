"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type LatestProductItem = {
    id: string;
    href: string;
    title: string;
    tagline?: string;
    priceText?: string;
    imageSrc?: string;
    imageAlt?: string;
    theme?: "dark" | "light";
    badge?: string;
};

type Props = {
    title?: string;
    subtitle?: string;
    items?: LatestProductItem[];
    className?: string;
};

const DEFAULT_ITEMS: LatestProductItem[] = [
    {
        id: "iphone-17-pro",
        href: "/vn/shop/buy-iphone/iphone-17-pro",
        title: "iPhone 17 Pro",
        tagline: "Pro đỉnh cao.",
        priceText: "Từ 34.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1766825034/2e1761d9-5517-4705-8484-11d083879b84.png",
        imageAlt: "iPhone 17 Pro",
        theme: "dark",
    },
    {
        id: "mbp-14",
        href: "/vn/shop/buy-mac/macbook-pro",
        title: 'MacBook Pro 14"',
        tagline: "Siêu mạnh mẽ với M5.",
        priceText: "Từ 41.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1766825190/ab31a490-d62e-4e8f-a333-1d234ab24dcf.png",
        imageAlt: "MacBook Pro 14 inch",
        theme: "dark",
    },
    {
        id: "ipad-pro",
        href: "/vn/shop/buy-ipad/ipad-pro",
        title: "iPad Pro",
        tagline: "Mmmmmạnh mẽ.",
        priceText: "Từ 29.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1766825226/3fdb4526-c7be-4bd9-afb0-e7bdd5dadad2.png",
        imageAlt: "iPad Pro",
        theme: "dark",
    },
    {
        id: "watch-s11",
        href: "/vn/shop/buy-watch/apple-watch",
        title: "Apple Watch Series 11",
        tagline: "Chiếc Apple Watch cực đỉnh giúp bạn theo dõi sức khỏe.",
        priceText: "Từ 11.499.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1766825241/bc61a76c-d425-4f62-bcea-5760d196026d.png",
        imageAlt: "Apple Watch Series 11",
        theme: "light",
    },
    {
        id: "iphone-17",
        href: "/vn/shop/buy-iphone/iphone-17",
        title: "iPhone 17",
        tagline: "Đa tài, đa sắc.",
        priceText: "Từ 24.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1766825266/a942ba9a-79e2-4ae4-993c-0bdba7275c66.png",
        imageAlt: "iPhone 17",
        theme: "light",
    },
    {
        id: "mba",
        href: "/vn/shop/buy-mac/macbook-air",
        title: "MacBook Air",
        tagline: "Nhẹ mê. Nhanh dễ nể.",
        priceText: "Từ 26.508.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1766825584/dc938e2b-552d-4894-a1f0-2ce8eac1422b.png",
        imageAlt: "MacBook Air",
        theme: "light",
    },
    {
        id: "iphone-air",
        href: "/vn/shop/buy-iphone/iphone-air",
        title: "iPhone Air",
        tagline: "iPhone mỏng nhất từng có.",
        priceText: "Từ 31.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1766825596/a1604b9d-edd9-47f7-9b0d-3de9884d9e46.png",
        imageAlt: "iPhone Air",
        theme: "light",
    },
    {
        id: "watch-ultra-3",
        href: "/vn/shop/buy-watch/apple-watch-ultra",
        title: "Apple Watch Ultra 3",
        tagline: "Tay chơi cự phách.",
        priceText: "Từ 23.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1766825610/d80f0473-0f74-4532-86ef-8c32462bef46.png",
        imageAlt: "Apple Watch Ultra 3",
        theme: "dark",
    },
    {
        id: "watch-se-3",
        href: "/vn/shop/buy-watch/apple-watch-se",
        title: "Apple Watch SE 3",
        tagline: "Đi cùng. Trò chuyện. Theo sát. Mãi yêu.",
        priceText: "Từ 6.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1766825627/e57cb919-b81a-47a6-8112-e3c5257b85fd.png",
        imageAlt: "Apple Watch SE 3",
        theme: "light",
    },
];

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export default function LatestProductsShelf({
    title = "Mẫu mã mới nhất.",
    subtitle = "Thêm chút tuyệt vời cho năm mới.",
    items,
    className,
}: Props) {
    const data = useMemo(() => items ?? DEFAULT_ITEMS, [items]);

    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const measure = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        const x = el.scrollLeft;
        const tol = 2;
        setCanPrev(x > tol);
        setCanNext(x < max - tol);
    }, []);

    useEffect(() => {
        measure();
        const el = scrollerRef.current;
        if (!el) return;

        const onScroll = () => measure();
        const onResize = () => measure();

        el.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        return () => {
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, [measure]);

    // ✅ Apple-like: scroll theo "page" (viewport) thay vì 1 card cố định
    const scrollByPage = useCallback((dir: -1 | 1) => {
        const el = scrollerRef.current;
        if (!el) return;

        const firstCard = el.querySelector<HTMLElement>("[data-card]");
        if (!firstCard) return;

        const cardW = firstCard.offsetWidth;
        const gap = 18; // nếu bạn dùng gap-[18px]
        const step = cardW + gap;

        el.scrollBy({ left: dir * step, behavior: "smooth" });
    }, []);


    return (
        <section className={cn("bg-[#f5f5f7] py-10", className)}>
            {/* ✅ Header giữ theo container 1190 (giống Apple) */}
            <div className="mx-auto w-full max-w-[1190px] px-4 sm:px-6 lg:px-0">
                <div className="mb-6">
                    <h2 className="text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#1d1d1f]">
                        {title}{" "}
                        <span className="font-semibold text-black/55">{subtitle}</span>
                    </h2>
                </div>
            </div>

            {/* ✅ Scroller FULL-BLEED: tràn theo viewport để card "ra/vào 2 bên màn hình" */}
            <div className="relative">
                <div
                    ref={scrollerRef}
                    role="region"
                    aria-label={title}
                    className={cn(
                        // full-bleed trick
                        "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",

                        // scroll
                        "overflow-x-auto scroll-smooth",
                        "overscroll-x-contain",                 // tránh giật overscroll
                        "touch-pan-x",                          // hint cho browser chỉ pan ngang
                        "[-webkit-overflow-scrolling:touch]",   // iOS momentum
                        // hide scrollbar
                        "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",

                        // snap
                        "[scroll-snap-type:x_proximity] [-webkit-overflow-scrolling:touch]",

                        // ✅ QUAN TRỌNG: scroll-padding = gutter để snap về đúng vị trí dưới header
                        "[scroll-padding-left:1rem] sm:[scroll-padding-left:1.5rem]",
                        "[scroll-padding-right:1rem] sm:[scroll-padding-right:1.5rem]",
                        "lg:[scroll-padding-left:max(0px,calc((100vw-1190px)/2))]",
                        "lg:[scroll-padding-right:max(0px,calc((100vw-1190px)/2))]"
                    )}
                >
                    {/* ✅ Platter: padding = gutter động để card đầu tiên thẳng hàng với header 1190 */}
                    <div
                        role="list"
                        aria-label={title}
                        className={cn(
                            "flex gap-[18px] pb-6",

                            // ✅ QUAN TRỌNG: gutter thật sự (nếu thiếu cái này card sẽ dính sát mép)
                            "px-4 sm:px-6",
                            "lg:px-[max(0px,calc((100vw-1190px)/2))]"
                        )}
                    >
                        {data.map((item, idx) => {
                            const dark = item.theme === "dark";
                            return (
                                <div
                                    key={item.id}
                                    role="listitem"
                                    className="shrink-0 [scroll-snap-align:start] [scroll-snap-stop:always]"
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "relative block overflow-hidden rounded-[18px]",
                                            "shadow-[0_18px_40px_rgba(0,0,0,0.12)]",
                                            // card size
                                            "h-[500px] w-[400px]",
                                            // mobile sizing
                                            "max-[520px]:h-[112vw] max-[520px]:w-[86vw] max-[520px]:max-h-[520px]",
                                            dark ? "bg-black text-white" : "bg-white text-[#1d1d1f]"
                                        )}
                                    >
                                        {/* content */}
                                        <div className="relative z-[2] p-[28px] max-w-[340px]">
                                            <div className="text-[28px] font-semibold leading-[1.12] tracking-[-0.02em]">
                                                {item.title}
                                            </div>

                                            {item.badge ? (
                                                <div className="mt-2 text-[14px] font-medium text-[#bf4800]">
                                                    {item.badge}
                                                </div>
                                            ) : null}

                                            {item.tagline ? (
                                                <div className="mt-2 text-[17px] leading-[1.25] opacity-90">
                                                    {item.tagline}
                                                </div>
                                            ) : null}

                                            {item.priceText ? (
                                                <div className="mt-2 text-[14px] leading-[1.25] opacity-75">
                                                    {item.priceText}
                                                </div>
                                            ) : null}
                                        </div>

                                        {/* image */}
                                        <div className="absolute inset-0">
                                            {/* giữ khoảng thở trên cho text */}
                                            <div className="absolute inset-x-0 top-0 h-[170px]" />

                                            {item.imageSrc ? (
                                                <div className="absolute inset-x-0 bottom-0 top-0">
                                                    <Image
                                                        src={item.imageSrc}
                                                        alt={item.imageAlt ?? item.title}
                                                        fill
                                                        sizes="(max-width: 520px) 86vw, 400px"
                                                        className={cn(
                                                            "object-contain object-bottom",
                                                            "scale-[1.08] translate-y-[1px]"
                                                        )}
                                                        priority={idx === 0}
                                                    />
                                                </div>
                                            ) : null}

                                            {/* subtle overlay */}
                                            <div
                                                className={cn(
                                                    "pointer-events-none absolute inset-0",
                                                    dark
                                                        ? "bg-[radial-gradient(1200px_520px_at_20%_10%,rgba(255,255,255,0.06),transparent_55%)]"
                                                        : "bg-[radial-gradient(1200px_520px_at_20%_10%,rgba(0,0,0,0.04),transparent_55%)]"
                                                )}
                                            />
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                        {/* ✅ END SPACER: tạo khoảng trống cuối giống Apple */}
                        <div aria-hidden="true" className="shrink-0 w-4 sm:w-6 lg:w-[max(0px,calc((100vw-1190px)/2))]" />

                    </div>
                </div>

                {/* ✅ Paddlenav (giống Apple: bám theo viewport) */}
                <button
                    type="button"
                    aria-label={`Trước - ${title}`}
                    onClick={() => scrollByPage(-1)}
                    disabled={!canPrev}
                    className={cn(
                        "hidden md:grid place-items-center rounded-full",
                        "h-12 w-12 bg-black/10 text-black backdrop-blur-[8px]",
                        "transition-opacity duration-200",
                        "absolute top-1/2 -translate-y-1/2 left-4 lg:left-6",
                        canPrev ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                >
                    <span aria-hidden="true" className="text-[28px] leading-none">
                        ‹
                    </span>
                </button>

                <button
                    type="button"
                    aria-label={`Tiếp - ${title}`}
                    onClick={() => scrollByPage(1)}
                    disabled={!canNext}
                    className={cn(
                        "hidden md:grid place-items-center rounded-full",
                        "h-12 w-12 bg-black/10 text-black backdrop-blur-[8px]",
                        "transition-opacity duration-200",
                        "absolute top-1/2 -translate-y-1/2 right-4 lg:right-6",
                        canNext ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                >
                    <span aria-hidden="true" className="text-[28px] leading-none">
                        ›
                    </span>
                </button>
            </div>
        </section>
    );

}
