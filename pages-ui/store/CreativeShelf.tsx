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

/**
 * ✅ Swatches chuyển sang hex để render dot như Apple.
 * ✅ Bạn vẫn dùng imageSrc Cloudinary của bạn bình thường.
 */
export const DEFAULT_ITEMS: ShelfItem[] = [
    {
        type: "hero",
        id: "creative-hero",
        href: "/vn/shop/accessories/all/creative-tools",
        title: "Thắp lửa khát vọng.",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767788613/a0b4960e-b894-43b1-bac6-c6b84191e8c1.png",
        imageAlt: "Thắp lửa khát vọng",
    },

    {
        type: "product",
        id: "ipad-air-11",
        href: "/vn/shop/buy-ipad/ipad-air",
        title: "iPad Air 11 inch",
        priceText: "Từ 16.689.000đ hoặc 680.000đ/tháng trong 24 tháng",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767788621/587d621d-64a8-46c9-b5fa-d68cd4992fba.png",
        swatches: [
            { name: "Xám Không Gian", hex: "#7C7E83" },
            { name: "Xanh Dương", hex: "#2F6EA6" },
            { name: "Tím", hex: "#7A68B7" },
            { name: "Ánh Sao", hex: "#E8DFD2" },
        ],
    },

    {
        type: "product",
        id: "apple-pencil-pro",
        href: "/vn/shop/product/mx2d3zp/a/apple-pencil-pro",
        title: "Apple Pencil Pro",
        priceText: "3.435.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767788635/4b96d29f-e471-4922-9344-950595fa7869.png",
        violator: "Khắc Miễn Phí",
    },

    {
        type: "product",
        id: "airpods-max-orange",
        href: "/vn/shop/product/mww73za/a/cam",
        title: "AirPods Max - Cam",
        priceText: "14.999.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767788641/f61fd75a-09aa-41bf-ad90-309f7c1e3c53.png",
        violator: "Khắc Miễn Phí",
        swatches: [
            { name: "Xanh Dương", hex: "#2B5E9B" },
            { name: "Tím", hex: "#6D59AA" },
            { name: "Đêm Xanh Thẳm", hex: "#1F2A44" },
            { name: "Ánh Sao", hex: "#E8DFD2" },
            { name: "Cam", hex: "#F08A2B" },
        ],
    },

    {
        type: "product",
        id: "smart-folio-ipad-air-11",
        href: "/vn/shop/product/mwk83fe/a/smart-folio-cho-ipad-air-11-inch-m3",
        title: "Smart Folio cho iPad Air 11 inch (M3) - Tím Nhạt",
        priceText: "2.257.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767801834/0c380621-4b66-49a4-a0ac-126006013644.png",
        swatches: [
            { name: "Xám Than", hex: "#3A3D43" },
            { name: "Xanh Lá Xô Thơm", hex: "#7B8F79" },
            { name: "Xanh Denim", hex: "#3B5A7A" },
            { name: "Tím Nhạt", hex: "#C9B7F2" },
        ],
    },

    {
        type: "product",
        id: "magic-keyboard-ipad-air-11",
        href: "/vn/shop/product/mgyx4za/a/magic-keyboard-cho-ipad-air-11-inch-m3",
        title: "Magic Keyboard cho iPad Air 11 inch (M3) - Màu Đen",
        priceText: "7.657.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767788648/0887e522-9233-4a55-92f0-1ce688bcb8ab.png",
        violator: "Màu Mới",
        swatches: [
            { name: "Trắng", hex: "#F5F5F7" },
            { name: "Đen", hex: "#1D1D1F" },
        ],
    },

    {
        type: "product",
        id: "smart-folio-ipad-a16",
        href: "/vn/shop/product/mdep4fe/a/smart-folio-cho-ipad-a16",
        title: "Smart Folio cho iPad (A16) - Dưa Hấu",
        priceText: "2.257.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767788661/4652706d-7656-451a-9af0-90661090f6ec.png",
        swatches: [
            { name: "Màu Trời", hex: "#5EA7D8" },
            { name: "Trắng", hex: "#F5F5F7" },
            { name: "Dưa Hấu", hex: "#E64664" },
            { name: "Vàng Chanh", hex: "#F4D24A" },
        ],
    },

    {
        type: "product",
        id: "magic-keyboard-ipad-pro-13",
        href: "/vn/shop/product/mwr43za/a/magic-keyboard-cho-ipad-pro-13-inch",
        title: "Magic Keyboard cho iPad Pro 13 inch (M5) - Trắng",
        priceText: "9.620.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767788679/a792b9d4-f945-48b9-861e-535a083c70a0.png",
        swatches: [
            { name: "Trắng", hex: "#F5F5F7" },
            { name: "Đen", hex: "#1D1D1F" },
        ],
    },

    {
        type: "product",
        id: "magic-mouse-usbc",
        href: "/vn/shop/product/mxk53za/a/magic-mouse-usb%E2%80%91c",
        title: "Magic Mouse (USB-C) - Trắng",
        priceText: "1.962.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767788686/74f7a1d6-d800-4ff0-aaea-451df78eebca.png",
        swatches: [
            { name: "Trắng", hex: "#F5F5F7" },
            { name: "Đen", hex: "#1D1D1F" },
        ],
    },

    {
        type: "product",
        id: "magic-keyboard-touch-id",
        href: "/vn/shop/product/mxk73za/a/magic-keyboard-touch-id",
        title: "Magic Keyboard với Touch ID và Numeric Keypad - Tiếng Anh (Mỹ)",
        priceText: "4.150.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767788700/84cd32ba-780f-4592-8631-b81be8269de1.png",
        swatches: [
            { name: "Phím Trắng", hex: "#F5F5F7" },
            { name: "Phím Đen", hex: "#1D1D1F" },
        ],
    },

    {
        type: "product",
        id: "magic-trackpad-usbc",
        href: "/vn/shop/product/mxk93za/a/magic-trackpad-usb%E2%80%91c",
        title: "Magic Trackpad (USB-C) - Trắng",
        priceText: "2.993.000đ",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767788709/d3dc0d42-a47e-46ae-9b38-5fedb2e6ab3f.png",
        swatches: [
            { name: "Trắng", hex: "#F5F5F7" },
            { name: "Đen", hex: "#1D1D1F" },
        ],
    },
];

export default function CreativeShelf({
    title = "Sáng tạo.",
    subtitle = "Những món quà không ngừng biến hóa.",
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

        // step = (card width + gap)
        const step = 320 + 20;
        el.scrollTo({ left: el.scrollLeft + dir * step, behavior: "smooth" });
    }, []);

    return (
        <section className={cn("bg-[#f5f5f7] py-10", className)}>
            {/* Header container 1190 */}
            <div className="mx-auto w-full max-w-[1190px] px-4 sm:px-6 lg:px-0">
                <div className="mb-6">
                    <h2 className="text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#1d1d1f]">
                        <span className="text-[#b36b00]">{title}</span>{" "}
                        <span className="font-semibold text-black/55">{subtitle}</span>
                    </h2>
                </div>
            </div>

            {/* Full-bleed scroller */}
            <div className="relative">
                <div
                    ref={scrollerRef}
                    role="region"
                    aria-label={title}
                    className={cn(
                        "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",
                        "overflow-x-auto scroll-smooth [-webkit-overflow-scrolling:touch]",
                        "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                        "[scroll-snap-type:x_mandatory]",
                        // snap offset để khi kéo về đầu, card nằm đúng dưới text header
                        "scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-[max(0px,calc((100vw-1190px)/2))]",
                        "scroll-pr-4 sm:scroll-pr-6 lg:scroll-pr-[max(0px,calc((100vw-1190px)/2))]"
                    )}
                >
                    <div
                        role="list"
                        className={cn(
                            "flex gap-5 pb-6",
                            "px-4 sm:px-6",
                            "lg:px-[max(0px,calc((100vw-1190px)/2))]"
                        )}
                    >
                        {data.map((item, idx) => {
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
                                                "relative block overflow-hidden rounded-[18px] bg-white",
                                                "shadow-[0_18px_40px_rgba(0,0,0,0.10)]",
                                                "h-[500px] w-[400px]",
                                                "max-[520px]:h-[112vw] max-[520px]:w-[86vw] max-[520px]:max-h-[520px]"
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
                                                />
                                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_520px_at_20%_10%,rgba(0,0,0,0.05),transparent_60%)]" />
                                            </div>
                                        </Link>
                                    </div>
                                );
                            }

                            // ✅ PRODUCT (dots always aligned across cards)
                            return (
                                <div
                                    key={item.id}
                                    role="listitem"
                                    className="shrink-0 [scroll-snap-align:start]"
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "block rounded-[18px] bg-white",
                                            "shadow-[0_18px_40px_rgba(0,0,0,0.10)]",
                                            "w-[320px] h-[500px]",
                                            "max-[520px]:w-[74vw] max-[520px]:h-[112vw] max-[520px]:max-h-[520px]"
                                        )}
                                    >
                                        <div className="h-full p-7 flex flex-col">
                                            {/* ✅ MEDIA fixed height (Apple-like) */}
                                            {/* ✅ MEDIA: tách riêng vùng ảnh + vùng swatches để không bao giờ sát nhau */}
                                            <div className="relative h-[290px]">
                                                {/* Image zone: chừa chỗ phía dưới cho swatches */}
                                                <div className="absolute inset-x-0 top-0 bottom-[44px] flex items-center justify-center pt-6">
                                                    {item.imageSrc ? (
                                                        <div className="relative h-[220px] w-[220px]">
                                                            <Image
                                                                src={item.imageSrc}
                                                                alt={item.imageAlt ?? item.title}
                                                                fill
                                                                sizes="220px"
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="h-[220px] w-[220px] rounded-[14px] bg-black/5" />
                                                    )}
                                                </div>

                                                {/* Swatch lane: luôn nằm cùng 1 hàng và cách ảnh một khoảng cố định */}
                                                {item.swatches?.length ? (
                                                    <div className="absolute inset-x-0 bottom-0 h-[44px] flex items-center justify-center">
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
                                                                    <span className="text-[14px] leading-none text-black/50">+</span>
                                                                </li>
                                                            ) : null}
                                                        </ul>
                                                    </div>
                                                ) : null}
                                            </div>


                                            {/* ✅ INFO stable heights so layout doesn't shift */}
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

                        {/* ✅ end padding like Apple */}
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
    );
}
