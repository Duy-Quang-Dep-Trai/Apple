"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type LatestProductItem = {
    id: string;
    href: string;
    title: string;
    priceText?: string;
    imageSrc?: string;
    imageAlt?: string;
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
        badge: "Apple Intelligence",
        priceText: "Từ 34.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767865038/479a1eeb-6c20-4546-a38a-b103f64750dc.png",
    },
    {
        id: "macbook-pro-14-m5",
        href: "/vn/shop/buy-mac/macbook-pro",
        title: 'MacBook Pro 14" với M5',
        badge: "Apple Intelligence",
        priceText: "Từ 41.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767865053/631bc02f-299b-4714-a729-f00abfb73be7.png",
    },
    {
        id: "ipad-pro",
        href: "/vn/shop/buy-ipad/ipad-pro",
        title: "iPad Pro",
        badge: "Apple Intelligence",
        priceText: "Từ 29.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767865056/b70f1c39-cce2-4892-9c75-ca79d79d8978.png",
    },
    {
        id: "apple-watch-series-11",
        href: "/vn/shop/buy-watch/apple-watch",
        title: "Apple Watch Series 11",
        priceText: "Từ 11.499.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767865077/4a6bd9e6-84cf-42c7-bc36-8139eca1da6a.png",
    },
    {
        id: "iphone-air",
        href: "/vn/shop/buy-iphone/iphone-air",
        title: "iPhone Air",
        badge: "Apple Intelligence",
        priceText: "Từ 31.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767865090/5577f9c9-77a7-4a2c-9bbb-702abde331db.png",
    },
    {
        id: "macbook-air",
        href: "/vn/shop/buy-mac/macbook-air",
        title: "MacBook Air",
        badge: "Apple Intelligence",
        priceText: "Từ 26.508.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767865096/b30d22a6-e2c2-45a3-954d-5b3ebbe81f89.png",
    },
    {
        id: "iphone-17",
        href: "/vn/shop/buy-iphone/iphone-17",
        title: "iPhone 17",
        badge: "Apple Intelligence",
        priceText: "Từ 24.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767865114/71f3553b-065b-4588-bd7b-4cd6aa936f38.png",
    },
    {
        id: "apple-watch-ultra-3",
        href: "/vn/shop/buy-watch/apple-watch-ultra",
        title: "Apple Watch Ultra 3",
        priceText: "Từ 23.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767865123/d02e1452-de60-4321-9711-7eaac8baebc6.png",
    },
    {
        id: "apple-watch-se-3",
        href: "/vn/shop/buy-watch/apple-watch-se",
        title: "Apple Watch SE 3",
        priceText: "Từ 6.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767865533/e2d2fe8d-88c3-400b-a412-e785f5a2c01e.png",
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

    const scrollByStep = useCallback((dir: -1 | 1) => {
        const el = scrollerRef.current;
        if (!el) return;

        const step = 400 + 18;
        el.scrollTo({ left: el.scrollLeft + dir * step, behavior: "smooth" });
    }, []);

    // hover style
    const cardHover = cn(
        "will-change-transform",
        "transition-transform transition-shadow duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        "md:hover:-translate-y-[8px] md:hover:shadow-[0_28px_70px_rgba(0,0,0,0.18)]",
        "active:-translate-y-[2px]",
        "motion-reduce:transition-none motion-reduce:transform-none"
    );

    return (
        // ❌ bỏ nền xám của shelf, để ăn theo nền trang
        <div
            className={cn(
                "bg-transparent",
                "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",
                className
            )}
        >
            <section className="py-10">
                {/* Header container 1190 */}
                <div className="mx-auto w-full max-w-[1190px] px-4 sm:px-6 lg:px-0">
                    <div className="mb-6">
                        <h2 className="text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#1d1d1f]">
                            {title} <span className="font-semibold text-black/55">{subtitle}</span>
                        </h2>
                    </div>
                </div>

                <div className="relative">
                    <div
                        ref={scrollerRef}
                        role="region"
                        aria-label={title}
                        className={cn(
                            "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",

                            // ✅ quan trọng: cho phép hover nhô lên không bị cắt
                            "overflow-x-auto overflow-y-visible",

                            "scroll-smooth [-webkit-overflow-scrolling:touch]",
                            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                            "[scroll-snap-type:x_mandatory]",

                            // ✅ tạo khoảng “đệm” phía trên để card lift không chạm mép
                            "pt-8 pb-6",

                            "scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-[max(0px,calc((100vw-1190px)/2))]",
                            "scroll-pr-4 sm:scroll-pr-6 lg:scroll-pr-[max(0px,calc((100vw-1190px)/2))]"
                        )}
                    >
                        <div
                            role="list"
                            aria-label={title}
                            className={cn(
                                "flex gap-[18px]",
                                "px-4 sm:px-6",
                                "lg:px-[max(0px,calc((100vw-1190px)/2))]"
                            )}
                        >
                            {data.map((item, idx) => (
                                <div key={item.id} role="listitem" className="shrink-0 [scroll-snap-align:start]">
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "group relative block overflow-hidden rounded-[18px] bg-white",
                                            "shadow-[0_18px_40px_rgba(0,0,0,0.10)]",
                                            "h-[500px] w-[400px]",
                                            "max-[520px]:h-[112vw] max-[520px]:w-[86vw] max-[520px]:max-h-[520px]",
                                            cardHover
                                        )}
                                    >
                                        <div className="relative z-[2] p-[28px]">
                                            <div className="text-[24px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#1d1d1f]">
                                                {item.title}
                                            </div>

                                            {item.badge ? (
                                                <div className="mt-[10px] text-[14px] font-semibold leading-[1.2] tracking-[-0.01em]">
                                                    <span className="bg-gradient-to-r from-[#0071e3] via-[#6e56cf] to-[#d63384] bg-clip-text text-transparent">
                                                        {item.badge}
                                                    </span>
                                                </div>
                                            ) : null}

                                            {item.priceText ? (
                                                <div className="mt-[8px] text-[14px] leading-[1.25] tracking-[-0.01em] text-black/70">
                                                    {item.priceText}
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="absolute inset-0">
                                            <div className="absolute inset-x-0 top-0 h-[170px]" />

                                            {item.imageSrc ? (
                                                <div className="absolute inset-x-0 bottom-0 top-0">
                                                    <Image
                                                        src={item.imageSrc}
                                                        alt={item.imageAlt ?? item.title}
                                                        fill
                                                        sizes="(max-width: 520px) 86vw, 400px"
                                                        className="object-contain object-bottom"
                                                        priority={idx === 0}
                                                    />
                                                </div>
                                            ) : null}

                                            <div
                                                className={cn(
                                                    "pointer-events-none absolute inset-0",
                                                    "bg-[radial-gradient(1000px_520px_at_20%_10%,rgba(0,0,0,0.05),transparent_60%)]",
                                                    "transition-opacity duration-300",
                                                    "md:group-hover:opacity-90"
                                                )}
                                            />
                                        </div>
                                    </Link>
                                </div>
                            ))}

                            {/* End spacer */}
                            <div
                                aria-hidden="true"
                                className={cn(
                                    "shrink-0",
                                    "w-4 sm:w-6",
                                    "lg:w-[max(0px,calc((100vw-1190px)/2))]"
                                )}
                            />
                        </div>
                    </div>

                    {/* Paddlenav */}
                    <button
                        type="button"
                        aria-label={`Trước - ${title}`}
                        onClick={() => scrollByStep(-1)}
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
                        onClick={() => scrollByStep(1)}
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
        </div>
    );
}
