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

/* =========================
   HOVER PRESET — MATCH LatestProductsShelf (Y CHANG)
   ========================= */
const cardHover = cn(
    "group",
    "will-change-transform",
    "transition-transform transition-shadow duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
    "md:hover:-translate-y-[8px] md:hover:shadow-[0_28px_70px_rgba(0,0,0,0.18)]",
    "active:-translate-y-[2px]",
    "motion-reduce:transition-none motion-reduce:transform-none"
);

/* =========================
   DEMO DATA (GIỮ NGUYÊN)
   ========================= */
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
            { name: "Trắng", hex: "#F5F5F5" },
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
        setCanPrev(x > 2);
        setCanNext(x < max - 2);
    }, []);

    useEffect(() => {
        measure();
        const el = scrollerRef.current;
        if (!el) return;
        el.addEventListener("scroll", measure, { passive: true });
        window.addEventListener("resize", measure);
        return () => {
            el.removeEventListener("scroll", measure);
            window.removeEventListener("resize", measure);
        };
    }, [measure]);

    const scrollByStep = (dir: -1 | 1) => {
        const el = scrollerRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * 340, behavior: "smooth" });
    };

    return (
        <div
            className={cn(
                "bg-[#f5f5f7]",
                "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",
                className
            )}
        >
            <section className="py-10">
                <div className="mx-auto max-w-[1190px] px-4 sm:px-6 lg:px-0 mb-6">
                    <h2 className="text-[32px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                        <span className="text-[#b36b00]">{title}</span>{" "}
                        <span className="text-black/55">{subtitle}</span>
                    </h2>
                </div>

                <div className="relative">
                    <div
                        ref={scrollerRef}
                        className={cn(
                            "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",

                            // ✅ quan trọng: cho phép hover nhô lên không bị cắt
                            "overflow-x-auto overflow-y-visible",

                            "scroll-smooth [-webkit-overflow-scrolling:touch]",
                            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",

                            // ✅ tạo khoảng “đệm” phía trên để card lift không chạm mép
                            "pt-8 pb-6",

                            "scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-[max(0px,calc((100vw-1190px)/2))]"
                        )}
                    >
                        <div className="flex gap-5 px-4 sm:px-6 lg:px-[max(0px,calc((100vw-1190px)/2))]">
                            {data.map((item, idx) =>
                                item.type === "hero" ? (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        target={item.openNewTab ? "_blank" : undefined}
                                        rel={item.openNewTab ? "noopener noreferrer" : undefined}
                                        className={cn(
                                            "relative shrink-0 overflow-hidden rounded-[18px] bg-white",
                                            "shadow-[0_18px_40px_rgba(0,0,0,0.10)]",
                                            cardHover,
                                            "h-[500px] w-[400px]"
                                        )}
                                    >
                                        <div className="relative z-10 p-7">
                                            <div className="text-[28px] font-semibold text-[#1d1d1f]">
                                                {item.title}
                                            </div>
                                        </div>

                                        <Image
                                            src={item.imageSrc}
                                            alt={item.imageAlt ?? item.title}
                                            fill
                                            sizes="400px"
                                            className={cn(
                                                "object-cover",
                                                "transition-transform duration-300",
                                                // ✅ nhẹ thôi, không scale card (card đã lift)
                                                "md:group-hover:scale-[1.02]"
                                            )}
                                            priority={idx === 0}
                                        />
                                    </Link>
                                ) : (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className={cn(
                                            "shrink-0 rounded-[18px] bg-white",
                                            "shadow-[0_18px_40px_rgba(0,0,0,0.10)]",
                                            cardHover,
                                            "w-[320px] h-[500px]"
                                        )}
                                    >
                                        <div className="h-full p-7 flex flex-col">
                                            <div className="relative h-[290px]">
                                                <div className="absolute inset-x-0 top-0 bottom-[52px] flex items-center justify-center">
                                                    {item.imageSrc ? (
                                                        <Image
                                                            src={item.imageSrc}
                                                            alt={item.imageAlt ?? item.title}
                                                            width={220}
                                                            height={220}
                                                            className={cn(
                                                                "object-contain",
                                                                "transition-transform duration-300",
                                                                "md:group-hover:scale-[1.05]"
                                                            )}
                                                        />
                                                    ) : (
                                                        <div className="h-[220px] w-[220px] rounded-[14px] bg-black/5" />
                                                    )}
                                                </div>

                                                <div className="absolute inset-x-0 bottom-0 h-[52px] flex justify-center items-center gap-2">
                                                    {item.swatches?.map((s) => (
                                                        <span
                                                            key={s.name}
                                                            title={s.name}
                                                            className="h-[10px] w-[10px] rounded-full ring-1 ring-black/10"
                                                            style={{ backgroundColor: s.hex }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Violator (giữ layout đồng đều) */}
                                            {item.violator ? (
                                                <div className="mt-3">
                                                    <span className="inline-flex rounded-full bg-black/5 px-2 py-1 text-[12px] font-medium text-black/70">
                                                        {item.violator}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="mt-3 h-[24px]" />
                                            )}

                                            <div className="mt-3 text-[17px] font-semibold text-[#1d1d1f] line-clamp-2 min-h-[42px]">
                                                {item.title}
                                            </div>
                                            <div className="mt-2 text-[14px] text-black/70 line-clamp-2 min-h-[36px]">
                                                {item.priceText}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            )}

                            {/* ✅ END SPACER — Apple-style trailing space */}
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
                        onClick={() => scrollByStep(-1)}
                        className={cn(
                            "hidden md:grid place-items-center rounded-full",
                            "absolute left-4 top-1/2 -translate-y-1/2",
                            "h-12 w-12 bg-black/10 text-black backdrop-blur-[8px]",
                            "transition-opacity duration-200",
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
                        className={cn(
                            "hidden md:grid place-items-center rounded-full",
                            "absolute right-4 top-1/2 -translate-y-1/2",
                            "h-12 w-12 bg-black/10 text-black backdrop-blur-[8px]",
                            "transition-opacity duration-200",
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
