"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Swatch = { name: string; hex: string };

type HeroItem = {
    type: "hero";
    id: string;
    href: string;
    title: string;
    imageSrc: string;
    imageAlt?: string;
    openNewTab?: boolean;
};

type ProductItem = {
    type: "product";
    id: string;
    href: string;
    title: string;
    priceText?: string;
    imageSrc?: string;
    imageAlt?: string;
    violator?: string;
    swatches?: Swatch[];
    openNewTab?: boolean;
};

type ShelfItem = HeroItem | ProductItem;

type Props = {
    title?: string;
    subtitle?: string;
    items?: ShelfItem[];
    className?: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

const cardHover = cn(
    "group",
    "will-change-transform",
    "transition-transform transition-shadow duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
    "md:hover:-translate-y-[8px] md:hover:shadow-[0_28px_70px_rgba(0,0,0,0.18)]",
    "active:-translate-y-[2px]",
    "motion-reduce:transition-none motion-reduce:transform-none"
);

// ✅ helper: nếu ảnh từ Apple CDN thì bỏ optimize để tránh upstream 404 trên Vercel
function shouldUnoptimize(src?: string) {
    if (!src) return false;
    try {
        const u = new URL(src);
        return u.hostname === "store.storeimages.cdn-apple.com";
    } catch {
        return false;
    }
}

export const DEFAULT_ITEMS: ShelfItem[] = [
    {
        type: "hero",
        id: "health-hero",
        href: "/vn/shop/accessories/all/health-fitness",
        title: "Có sức khỏe là có hạnh phúc.",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-cny-health-202601_GEO_VN?wid=800&hei=1000&fmt=png-alpha",
        imageAlt:
            "Sản phẩm Apple: Apple Watch Series 11, AirPods Pro 3... nền mây cam và xanh lá",
        openNewTab: true,
    },

    {
        type: "product",
        id: "apple-watch-ultra-3",
        href: "/vn/shop/buy-watch/apple-watch-ultra",
        title: "Apple Watch Ultra 3",
        priceText: "Từ 23.999.000đ hoặc 977.000đ/tháng trong 24 tháng",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/49-cell-titanium-natural-milanese-loop-natural-ultra?wid=400&hei=400&fmt=jpeg&qlt=90",
        violator: "Mới",
    },

    {
        type: "product",
        id: "nike-sport-band-mgc64",
        href: "https://www.apple.com/vn/shop/product/mgc64fe/a/d%C3%A2y-%C4%91eo-th%E1%BB%83-thao-nike-m%C3%A0u-h%E1%BB%93ng-ho%C3%A0ng-h%C3%B4n-46mm-s-m",
        title: "Dây Đeo Thể Thao Nike Màu Hồng Hoàng Hôn 46mm - S/M",
        priceText: "1.499.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGC64ref?wid=400&hei=400&fmt=jpeg&qlt=90",
        openNewTab: true,
    },

    {
        type: "product",
        id: "powerbeats-pro-2-mx743",
        href: "https://www.apple.com/vn/shop/product/mx743za/a/powerbeats-pro-2-tainbspnghe-hi%E1%BB%87u-n%C4%83ng-cao-cam-n%C3%B3ng-b%E1%BB%8Fng",
        title: "Powerbeats Pro 2 – Tai Nghe Hiệu Năng Cao – Cam Nóng Bỏng",
        priceText: "6.380.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MX743?wid=400&hei=400&fmt=jpeg&qlt=90",
        openNewTab: true,
    },

    {
        type: "product",
        id: "beats-pill-mw463",
        href: "https://www.apple.com/vn/shop/product/mw463zp/a/beats-pill-loa-bluetooth-kh%C3%B4ng-d%C3%A2y-v%C3%A0ng-champagne",
        title: "Beats Pill – Loa Bluetooth® Không Dây – Vàng Champagne",
        priceText: "4.220.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MW463?wid=400&hei=400&fmt=jpeg&qlt=90",
        openNewTab: true,
    },

    {
        type: "product",
        id: "beats-flex-mymd2",
        href: "https://www.apple.com/vn/shop/product/mymd2za/a/beats-flex-tai-nghe-kh%C3%B4ng-d%C3%A2y-d%C3%B9ng-c%E1%BA%A3-ng%C3%A0y-v%C3%A0ng-x%C6%B0%C6%A1ng-r%E1%BB%93ng",
        title: "Beats Flex – Tai Nghe Không Dây Dùng Cả Ngày – Vàng Xương Rồng",
        priceText: "1.659.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MYMD2?wid=400&hei=400&fmt=jpeg&qlt=90",
        openNewTab: true,
    },

    {
        type: "product",
        id: "airpods-4-anc-mxp93",
        href: "https://www.apple.com/vn/shop/product/mxp93zp/a/v%E1%BB%9Bi-t%C3%ADnh-n%C4%83ng-ch%E1%BB%A7-%C4%91%E1%BB%99ng-kh%E1%BB%AD-ti%E1%BA%BFng-%E1%BB%93n",
        title: "AirPods 4 với Chủ Động Khử Tiếng Ồn",
        priceText: "4.999.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXP93?wid=400&hei=400&fmt=jpeg&qlt=90",
        violator: "Khắc Miễn Phí",
        openNewTab: true,
    },

    {
        type: "product",
        id: "milanese-loop-gold-mgj54",
        href: "https://www.apple.com/vn/shop/product/mgj54fe/a/d%C3%A2y-qu%E1%BA%A5n-milan-m%C3%A0u-gold-46mm-m-l",
        title: "Dây Quấn Milan Màu Gold 46mm - M/L",
        priceText: "2.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767807520/38db42ea-2e45-449a-9fb9-b2eab2db8ac9.png",
        openNewTab: true,
    },

    {
        type: "product",
        id: "ocean-band-mgcl4",
        href: "https://www.apple.com/vn/shop/product/mgcl4fe/a/d%C3%A2y-%C4%91eo-ocean-m%C3%A0u-xanh-d%E1%BA%A1-quang-49mm-titan-%C4%91en",
        title: "Dây Đeo Ocean Màu Xanh Dạ Quang 49mm - Titan Đen",
        priceText: "2.999.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGCL4?wid=400&hei=400&fmt=jpeg&qlt=90",
        openNewTab: true,
    },

    {
        type: "product",
        id: "nike-sport-loop-lightgray-mgcq4",
        href: "https://www.apple.com/vn/shop/product/mgcq4fe/a/d%C3%A2y-qu%E1%BA%A5n-th%E1%BB%83-thao-nike-m%C3%A0u-x%C3%A1m-nh%E1%BA%A1t-40mm",
        title: "Dây Quấn Thể Thao Nike Màu Xám Nhạt 40mm",
        priceText: "1.499.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGCQ4?wid=400&hei=400&fmt=jpeg&qlt=90",
        openNewTab: true,
    },
];

export default function HealthShelf({
    title = "Sức khoẻ.",
    subtitle = "Bày tỏ lòng quan tâm của bạn.",
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

    const scrollByPage = useCallback((dir: -1 | 1) => {
        const el = scrollerRef.current;
        if (!el) return;

        const gutter = window.innerWidth >= 640 ? 24 : 16;
        const step = Math.max(280, el.clientWidth - gutter * 2);

        el.scrollBy({ left: dir * step, behavior: "smooth" });
    }, []);

    return (
        <div
            className={cn(
                "bg-[#f5f5f7]",
                "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",
                className
            )}
        >
            <section className="py-10">
                <div className="mx-auto w-full max-w-[1190px] px-4 sm:px-6 lg:px-0">
                    <div className="mb-6">
                        <h2 className="text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#1d1d1f]">
                            <span className="text-[#b36b00]">{title}</span>{" "}
                            <span className="font-semibold text-black/55">{subtitle}</span>
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
                            "overflow-x-auto overflow-y-visible",
                            "scroll-smooth [-webkit-overflow-scrolling:touch]",
                            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                            "[scroll-snap-type:x_mandatory]",
                            "pt-8 pb-6",
                            "scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-[max(0px,calc((100vw-1190px)/2))]",
                            "scroll-pr-4 sm:scroll-pr-6 lg:scroll-pr-[max(0px,calc((100vw-1190px)/2))]"
                        )}
                    >
                        <div
                            role="list"
                            className={cn(
                                "flex gap-5",
                                "px-4 sm:px-6",
                                "lg:px-[max(0px,calc((100vw-1190px)/2))]"
                            )}
                        >
                            {data.map((item, idx) => {
                                const unoptimized = shouldUnoptimize(
                                    item.type === "hero" ? item.imageSrc : item.imageSrc
                                );

                                if (item.type === "hero") {
                                    return (
                                        <div
                                            key={item.id}
                                            role="listitem"
                                            className="shrink-0 [scroll-snap-align:start]"
                                        >
                                            <Link
                                                href={item.href}
                                                target={item.openNewTab ? "_blank" : undefined}
                                                rel={item.openNewTab ? "noopener noreferrer" : undefined}
                                                className={cn(
                                                    "block rounded-[18px] bg-white",
                                                    "shadow-[0_18px_40px_rgba(0,0,0,0.10)]",
                                                    cardHover,
                                                    "w-[320px] h-[500px]",
                                                    "max-[520px]:w-[74vw] max-[520px]:h-[112vw] max-[520px]:max-h-[520px]"
                                                )}
                                            >
                                                <div className="relative z-[2] p-7">
                                                    <div className="text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#1d1d1f]">
                                                        {item.title}
                                                    </div>
                                                </div>

                                                <div className="absolute inset-0">
                                                    <Image
                                                        src={item.imageSrc}
                                                        alt={item.imageAlt ?? item.title}
                                                        fill
                                                        sizes="(max-width: 520px) 86vw, 400px"
                                                        className="object-cover"
                                                        priority={idx === 0}
                                                        unoptimized={unoptimized}
                                                        referrerPolicy="no-referrer"
                                                    />
                                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_520px_at_20%_10%,rgba(0,0,0,0.05),transparent_60%)]" />
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        key={item.id}
                                        role="listitem"
                                        className="shrink-0 [scroll-snap-align:start]"
                                    >
                                        <Link
                                            href={item.href}
                                            target={item.openNewTab ? "_blank" : undefined}
                                            rel={item.openNewTab ? "noopener noreferrer" : undefined}
                                            className={cn(
                                                "block rounded-[18px] bg-white",
                                                "shadow-[0_18px_40px_rgba(0,0,0,0.10)]",
                                                cardHover,
                                                "w-[320px] h-[500px]",
                                                "max-[520px]:w-[74vw] max-[520px]:h-[112vw] max-[520px]:max-h-[520px]"
                                            )}
                                        >
                                            <div className="h-full p-7 flex flex-col">
                                                <div className="relative h-[290px]">
                                                    <div className="absolute inset-x-0 top-0 bottom-[52px] flex items-center justify-center pt-6">
                                                        {item.imageSrc ? (
                                                            <div className="relative h-[220px] w-[220px]">
                                                                <Image
                                                                    src={item.imageSrc}
                                                                    alt={item.imageAlt ?? item.title}
                                                                    fill
                                                                    sizes="220px"
                                                                    className="object-contain"
                                                                    unoptimized={unoptimized}
                                                                    referrerPolicy="no-referrer"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="h-[220px] w-[220px] rounded-[14px] bg-black/5" />
                                                        )}
                                                    </div>

                                                    {item.swatches?.length ? (
                                                        <div className="absolute inset-x-0 bottom-0 h-[52px] flex items-center justify-center">
                                                            <ul
                                                                role="list"
                                                                aria-label={`${item.title} Các màu có sẵn:`}
                                                                className="flex h-[16px] items-center gap-[10px]"
                                                            >
                                                                {item.swatches.slice(0, 6).map((s) => (
                                                                    <li
                                                                        key={s.name}
                                                                        title={s.name}
                                                                        className="flex h-[16px] w-[16px] items-center justify-center"
                                                                    >
                                                                        <span
                                                                            className="block h-[10px] w-[10px] rounded-full ring-1 ring-black/10"
                                                                            style={{ backgroundColor: s.hex }}
                                                                        />
                                                                    </li>
                                                                ))}

                                                                {item.swatches.length > 6 ? (
                                                                    <li className="flex h-[16px] w-[16px] items-center justify-center">
                                                                        <span className="text-[14px] leading-none text-black/50">
                                                                            +
                                                                        </span>
                                                                    </li>
                                                                ) : null}
                                                            </ul>
                                                        </div>
                                                    ) : (
                                                        <div className="absolute inset-x-0 bottom-0 h-[52px]" />
                                                    )}
                                                </div>

                                                {item.violator ? (
                                                    <div className="mt-3">
                                                        <span className="inline-flex rounded-full bg-black/5 px-2 py-1 text-[12px] font-medium text-[#bf4800]">
                                                            {item.violator}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="mt-3 h-[24px]" />
                                                )}

                                                <div className="mt-3">
                                                    <div className="text-[17px] font-semibold leading-[1.2] text-[#1d1d1f] line-clamp-2 min-h-[42px]">
                                                        {item.title}
                                                    </div>

                                                    {item.priceText ? (
                                                        <div className="mt-2 text-[14px] leading-[1.25] text-black/70 line-clamp-2 min-h-[36px]">
                                                            {item.priceText}
                                                        </div>
                                                    ) : (
                                                        <div className="mt-2 h-[36px]" />
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}

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
        </div>
    );
}
