"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Swatch = { name: string; src: string }; // icon 16x16

type StoryShelfItem =
    | {
        type: "hero";
        id: string;
        href: string;
        title: string;
        imageSrc: string;
        imageAlt: string;
        openNewTab?: boolean;
    }
    | {
        type: "product";
        id: string;
        href: string;
        title: string;
        priceText: string;
        imageSrc?: string;
        imageAlt?: string;
        swatches?: Swatch[];
        violator?: string;
    };

type Props = {
    title?: string;
    subtitle?: string;
    items?: StoryShelfItem[];
    className?: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

/** Demo data (bạn thay bằng data thật của bạn) */
const DEFAULT_ITEMS: StoryShelfItem[] = [
    {
        type: "hero",
        id: "gratitude-hero",
        href: "/vn/shop/accessories/all/chinese-new-year/gratitude",
        title: "Trao món quà khó quên.",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-cny-gratitude-202601?wid=800&hei=1000&fmt=png-alpha",
        imageAlt:
            "Sản phẩm Apple: iPhone 17 Pro, ốp lưng kiêm ví MagSafe, iPhone Air và dây đeo chéo, nền mây cam và xanh dương",
        openNewTab: true,
    },
    {
        type: "product",
        id: "iphone-air",
        href: "/vn/shop/buy-iphone/iphone-air",
        title: "iPhone Air",
        priceText: "Từ 31.999.000đ hoặc 1.303.000đ/tháng trong 24 tháng",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-air-finish-select-lightgold-202509?wid=400&hei=400&fmt=jpeg&qlt=90",
        imageAlt: "iPhone Air màu Vàng Nhạt",
        swatches: [
            {
                name: "Xanh Da Trời",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-air-finish-select-skyblue-202509_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Vàng Nhạt",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-air-finish-select-lightgold-202509_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Trắng Mây",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-air-finish-select-cloudwhite-202509_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Đen Không Gian",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-air-finish-select-spaceblack-202509_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
        ],
    },
    {
        type: "product",
        id: "case-mgf04",
        href: "/vn/shop/product/mgf04fe/a/%E1%BB%91p-l%C6%B0ng-silicon-magsafe-cho-iphone-17-t%C3%ADm-s%C6%B0%C6%A1ng-kh%C3%B3i",
        title: "Ốp Lưng Silicon MagSafe cho iPhone 17 – Tím Sương Khói",
        priceText: "1.403.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGF04?wid=400&hei=400&fmt=jpeg&qlt=90",
        imageAlt: "Ốp Lưng Silicon MagSafe màu Tím Sương Khói",
        swatches: [
            {
                name: "Vàng Dạ Quang",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGEV4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Xanh Mỏ Neo",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGEW4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Tím Sương Khói",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGF04_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Rêu Đá",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGEX4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Đen",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGF14_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
        ],
    },
    {
        type: "product",
        id: "crossbody-mggh4",
        href: "/vn/shop/product/mggh4fe/a/d%C3%A2y-%C4%91eo-ch%C3%A9o-xanh-d%C6%B0%C6%A1ng-nh%E1%BA%A1t",
        title: "Dây Đeo Chéo - Xanh Dương Nhạt",
        priceText: "1.668.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGGH4?wid=400&hei=400&fmt=jpeg&qlt=90",
        imageAlt: "Dây Đeo Chéo màu Xanh Dương Nhạt",
        swatches: [
            {
                name: "Vàng Dạ Quang",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGGE4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Xanh Dương Nhạt",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGGH4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Xanh Dương",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGGG4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Tím",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGGJ4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Nâu Sienna",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGGN4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Cam",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGGD4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Đen",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGGM4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
        ],
    },
    {
        type: "product",
        id: "beats-solo-4-muw33",
        href: "/vn/shop/product/muw33zp/a/beats-solo-4",
        title: "Beats Solo 4 – Tai Nghe Kiểu Áp Tai Không Dây – Mây Hồng",
        priceText: "4.908.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MUW33?wid=400&hei=400&fmt=jpeg&qlt=90",
        imageAlt: "Beats Solo 4 màu Mây Hồng",
        swatches: [
            {
                name: "Đen Nhám",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MUW23_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Lam Đá Phiến",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MUW43_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Mây Hồng",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MUW33_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
        ],
    },
    {
        type: "product",
        id: "wallet-mgh64",
        href: "/vn/shop/product/mgh64fe/a/v%C3%AD-v%E1%BA%A3i-tinh-d%E1%BB%87t-magsafe-cho-iphone-cam-l%C3%B4ng-c%C3%A1o",
        title: "Ví Vải Tinh Dệt MagSafe cho iPhone – Cam Lông Cáo",
        priceText: "1.668.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGH64?wid=400&hei=400&fmt=jpeg&qlt=90",
        imageAlt: "Ví Vải Tinh Dệt MagSafe màu Cam Lông Cáo",
        swatches: [
            {
                name: "Cam Lông Cáo",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGH64_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Tím Trời Đêm",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGH84_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Xanh Navy",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGH94_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Rêu",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGH74_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Đen",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGHA4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
        ],
    },
    {
        type: "product",
        id: "magsafe-battery-mgpg4",
        href: "https://www.apple.com/vn/shop/product/MGPG4VN/A/pin-magsafe-cho-iphone-air",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767764843/c457c790-0e33-409c-96a4-7c38fa72b875.png",
        imageAlt: "Pin MagSafe cho iPhone Air",
        title: "Pin MagSafe cho iPhone Air",
        priceText: "2.699.000đ",
    },
    {
        type: "product",
        id: "airtag-keyring-mgfy4",
        href: "/vn/shop/product/mgfy4fe/a/m%C3%B3c-kh%C3%B3a-v%E1%BA%A3i-tinh-d%E1%BB%87t-airtag-cam-l%C3%B4ng-c%C3%A1o",
        title: "Móc Khóa Vải Tinh Dệt AirTag - Cam Lông Cáo",
        priceText: "1.070.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGFY4?wid=400&hei=400&fmt=jpeg&qlt=90",
        imageAlt: "Móc khoá AirTag màu Cam Lông Cáo",
        swatches: [
            {
                name: "Cam Lông Cáo",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGFY4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Tím Trời Đêm",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGG04_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Xanh Navy",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGG14_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Rêu",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGFX4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Đen",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGG24_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
        ],
    },
    {
        type: "product",
        id: "beats-case-mgjv4",
        href: "/vn/shop/product/mgjv4pa/a/%E1%BB%91p-l%C6%B0ng-beats-cho-iphone-air-v%E1%BB%9Bi-magsafe-v%C3%A0-%C4%91i%E1%BB%81u-khi%E1%BB%83n-camera-h%E1%BB%93ng-kh%C3%B3i",
        title: "Ốp Lưng Beats cho iPhone Air với MagSafe và Điều Khiển Camera — Hồng Khói",
        priceText: "1.199.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGJV4?wid=400&hei=400&fmt=jpeg&qlt=90",
        imageAlt: "Ốp lưng Beats màu Hồng Khói",
        swatches: [
            {
                name: "Xám Kem",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGJU4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Hồng Khói",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGJV4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Xanh Đá Trầm",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGJW4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Xám Granite",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGJT4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
        ],
    },
    {
        type: "product",
        id: "techwoven-mgf64",
        href: "/vn/shop/product/mgf64fe/a/%E1%BB%91p-l%C6%B0ng-techwoven-magsafe-cho-iphone-17-pro-n%C3%A2u-sienna",
        title: "Ốp Lưng TechWoven MagSafe cho iPhone 17 Pro – Nâu Sienna",
        priceText: "1.668.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGF64?wid=400&hei=400&fmt=jpeg&qlt=90",
        imageAlt: "Ốp lưng TechWoven màu Nâu Sienna",
        swatches: [
            {
                name: "Xanh Dương",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGF44_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Tím",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGF54_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Nâu Sienna",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGF64_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Xanh Lá",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGF74_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Đen",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGF34_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
        ],
    },
    {
        type: "product",
        id: "bumper-mh024",
        href: "/vn/shop/product/mh024fe/a/%E1%BB%91p-%C4%91%E1%BB%87m-cho-iphone-air-xanh-d%C6%B0%C6%A1ng-nh%E1%BA%A1t",
        title: "Ốp Đệm cho iPhone Air - Xanh Dương Nhạt",
        priceText: "1.177.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MH024?wid=400&hei=400&fmt=jpeg&qlt=90",
        imageAlt: "Ốp đệm iPhone Air màu Xanh Dương Nhạt",
        swatches: [
            {
                name: "Xanh Dương Nhạt",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MH024_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Nâu Da Nhạt",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MH044_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Xám Nhạt",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MH014_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Đen",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MH004_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
        ],
    },
    {
        type: "product",
        id: "appletv-mn873",
        href: "/tv-home",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1766820134/9b9437ad-0384-40e4-8990-88d1f8767b5a.png",
        title: "Apple TV 4K Wi-Fi với bộ nhớ 64GB",
        priceText: "3.435.000đ",
    },
    {
        type: "product",
        id: "beats-rugged-mgjq4",
        href: "/vn/shop/product/mgjq4pa/a/%E1%BB%91p-l%C6%B0ng-beats-si%C3%AAu-b%E1%BB%81n-cho-iphone-17-pro-v%E1%BB%9Bi-magsafe-v%C3%A0-%C4%91i%E1%BB%81u-khi%E1%BB%83n-camera-cam-sierra",
        title:
            "Ốp Lưng Beats Siêu Bền cho iPhone 17 Pro với MagSafe và Điều Khiển Camera – Cam Sierra",
        priceText: "2.199.000đ",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGJQ4?wid=400&hei=400&fmt=jpeg&qlt=90",
        imageAlt: "Ốp Beats Siêu Bền màu Cam Sierra",
        swatches: [
            {
                name: "Cam Sierra",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGJQ4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Xanh Đá Núi",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGJN4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Xám Alpine",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGJP4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
            {
                name: "Đen Everest",
                src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGJM4_SW_COLOR?wid=32&hei=32&fmt=png-alpha",
            },
        ],
    },
    {
        type: "product",
        id: "airtag-4pack",
        href: "/vn/shop/product/mx542vn/a/4-c%C3%A1i",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767782122/028b0e36-97c2-4c33-a529-7263fea2fa80.png",
        title: "Gói 4 chiếc AirTag",
        priceText: "2.650.000đ",
        violator: "Khắc Miễn Phí",
    },
    {
        type: "product",
        id: "airpods-pro-3",
        href: "/vn/shop/product/mfhp4zp/a",
        imageSrc:
            "https://res.cloudinary.com/df1gg3pig/image/upload/v1767782132/c65dc6a5-d9b9-4250-aaf1-8900eb968047.png",
        title: "AirPods Pro 3",
        priceText: "6.799.000đ",
        violator: "Khắc Miễn Phí",
    },
];

export default function StoreStory({
    title = "Lòng biết ơn.",
    subtitle = "Bày tỏ tấm lòng thành của bạn.",
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

    /**
     * ✅ Apple-like: scroll theo "viewport page"
     * - Step ~= clientWidth - 2*gutter
     */
    const scrollByPage = useCallback((dir: -1 | 1) => {
        const el = scrollerRef.current;
        if (!el) return;

        const gutter = window.innerWidth >= 640 ? 24 : 16; // sm:px-6 vs px-4
        const step = Math.max(280, el.clientWidth - gutter * 2);

        el.scrollBy({ left: dir * step, behavior: "smooth" });
    }, []);

    /**
     * ✅ HOVER Y CHANG LatestProductsShelf:
     * - lift + shadow
     * - desktop only
     */
    const cardHover = cn(
        "will-change-transform",
        "transition-transform transition-shadow duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        "md:hover:-translate-y-[8px] md:hover:shadow-[0_28px_70px_rgba(0,0,0,0.18)]",
        "active:-translate-y-[2px]",
        "motion-reduce:transition-none motion-reduce:transform-none"
    );

    return (
        <div
            className={cn(
                "bg-[#f5f5f7]",
                "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",
                className
            )}
        >
            <section className="py-10">
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

                            // ✅ quan trọng: cho phép hover nhô lên không bị cắt
                            "overflow-x-auto overflow-y-visible",

                            "scroll-smooth [-webkit-overflow-scrolling:touch]",
                            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                            "[scroll-snap-type:x_mandatory]",

                            // ✅ tạo khoảng “đệm” phía trên để card lift không chạm mép
                            "pt-8 pb-6",

                            // snap offset để item đầu thẳng hàng header
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
                                                    cardHover,
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
                                                        alt={item.imageAlt}
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

                                // PRODUCT
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
                                                cardHover,
                                                "w-[320px] h-[500px]",
                                                "max-[520px]:w-[74vw] max-[520px]:h-[112vw] max-[520px]:max-h-[520px]"
                                            )}
                                        >
                                            <div className="h-full p-7 flex flex-col">
                                                {/* Media stage */}
                                                <div className="relative h-[290px]">
                                                    {/* Image zone: chừa lane 52px cho swatches */}
                                                    <div className="absolute inset-x-0 top-0 bottom-[52px] flex items-center justify-center pt-6">
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

                                                    {/* Swatch lane: luôn cùng chiều cao */}
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
                                                                        <img
                                                                            src={s.src}
                                                                            alt={s.name}
                                                                            width={16}
                                                                            height={16}
                                                                            className="block"
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

                                                {/* Violator */}
                                                {item.violator ? (
                                                    <div className="mt-3">
                                                        <span className="inline-flex rounded-full bg-black/5 px-2 py-1 text-[12px] font-medium text-black/70">
                                                            {item.violator}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="mt-3 h-[24px]" />
                                                )}

                                                {/* Title + price */}
                                                <div className="mt-3">
                                                    <div className="text-[17px] font-semibold leading-[1.2] text-[#1d1d1f] line-clamp-2 min-h-[42px]">
                                                        {item.title}
                                                    </div>
                                                    <div className="mt-2 text-[14px] leading-[1.25] text-black/70 line-clamp-2 min-h-[36px]">
                                                        {item.priceText}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}

                            {/* End spacer như Apple */}
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
