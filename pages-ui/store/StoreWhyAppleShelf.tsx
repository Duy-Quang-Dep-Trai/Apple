"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ShelfItem =
    | {
        type: "feature"; // card lớn (image + text)
        id: string;
        href: string;
        eyebrow?: string;
        title: string; // có thể chứa <span> highlight bằng JSX bên dưới (render manual)
        imageSrc: string;
        imageAlt?: string;
        openNewTab?: boolean;
        aspect?: "portrait" | "tall";
    }
    | {
        type: "info"; // card nhỏ (icon + text)
        id: string;
        href: string;
        title: React.ReactNode;
        icon: React.ReactNode;
        openNewTab?: boolean;
    };

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
   APPLE-LIKE MOTION PRESET
   ========================= */
const cardBase =
    "relative overflow-hidden rounded-[20px] bg-white/80 backdrop-blur-[10px] " +
    "shadow-[0_18px_40px_rgba(0,0,0,0.10)] ring-1 ring-black/[0.04]";

const hoverMotion =
    "will-change-transform transition-[transform,box-shadow,filter] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] " +
    "md:hover:-translate-y-[3px] md:hover:shadow-[0_28px_70px_rgba(0,0,0,0.16)] " +
    "motion-reduce:transition-none motion-reduce:transform-none";

const fadeEdgeMask =
    "[mask-image:linear-gradient(to_right,transparent,black_40px,black_calc(100%-40px),transparent)]";

/* =========================
   SIMPLE ICONS (APPLE-LIKE)
   ========================= */
function IconCube(props: { className?: string }) {
    return (
        <svg
            viewBox="0 0 36 36"
            aria-hidden="true"
            className={cn("h-8 w-8", props.className)}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
        >
            <path d="M18 3.8 30 10.1v15.8L18 32.2 6 25.9V10.1L18 3.8Z" />
            <path d="M6 10.1 18 16.4 30 10.1" />
            <path d="M18 16.4v15.8" />
        </svg>
    );
}

function IconSmile(props: { className?: string }) {
    return (
        <svg
            viewBox="0 0 36 36"
            aria-hidden="true"
            className={cn("h-8 w-8", props.className)}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 31c7.2 0 13-5.8 13-13S25.2 5 18 5 5 10.8 5 18s5.8 13 13 13Z" />
            <path d="M12.8 21.2c1.3 1.9 3.1 2.8 5.2 2.8s3.9-.9 5.2-2.8" />
            <path d="M13.2 14.5h.1" />
            <path d="M22.7 14.5h.1" />
        </svg>
    );
}

/* =========================
   DEFAULT DATA (DEMO)
   - Bạn thay href / imageSrc theo ý bạn
   ========================= */
export const DEFAULT_ITEMS: ShelfItem[] = [
    {
        type: "feature",
        id: "specialist",
        href: "/vn/shop/browse/overlay/store/specialist",
        eyebrow: "CHUYÊN GIA APPLE",
        title: "Mua hàng với tư vấn trực tiếp từ Chuyên Gia trực tuyến.",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-holiday-specialist-help-202511?wid=2000&hei=2083&fmt=p-jpg&qlt=95&.v=VXNuZmVZU0R3VzJZalF2dFJTeUN3K0hwSnRqZittbW9zMW4wdkliUkY4czJtSnl1aWxWK21rcHM4QnZ6MzIvSS85UDFrREVCUFJWRFNDVDBTQjFJZ3VCc3FjamJwVXJjd2U3WEc3Smc2MXc5bnRCTzNjcGJSeTBxcEdNeDUvdDdmbW94YnYxc1YvNXZ4emJGL0IxNFp3",
        imageAlt: "Chuyên Gia Apple đang mỉm cười",
        aspect: "tall",
    },
    {
        type: "feature",
        id: "gifting",
        href: "/vn/shop/browse/overlay/store/asa_digital_gifting",
        title: "Chia sẻ niềm vui. Thông báo tin tốt lành với lời nhắn số đi kèm quà.",
        imageSrc:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-gifting-card-50-cny-202601?wid=1200&hei=1250&fmt=p-jpg&qlt=95&.v=eTAzZ3RmK3V3N3Q0SmJod2x6OHN4TExVV0VNbXBaSHpCNC9OYjdVKzVyV3h2dSsyQnY0dzFrQjVuY3QwQUw2UVpwRE93ZVBDaGlEa25QZUpFTG9OUTFNMzRRS0s0UUNQM3FlRnRvUDdzYUhEQTBYNnVKSXR6VElMblR5ZFNFUWU",
        imageAlt: "Thiệp quà tặng iPhone",
        aspect: "portrait",
    },
    {
        type: "info",
        id: "delivery",
        href: "/vn/shop/browse/overlay/store/delivery",
        icon: <IconCube className="text-black/70" />,
        title: (
            <span>
                Giao hàng <span className="text-[#b36b00]">miễn phí</span>.
            </span>
        ),
    },
    {
        type: "info",
        id: "engraving",
        href: "/vn/shop/browse/overlay/store/engraving",
        icon: <IconSmile className="text-black/70" />,
        title: (
            <span>
                Thêm dấu ấn của riêng bạn.{" "}
                <span className="text-[#b36b00]">
                    Khắc kết hợp biểu tượng cảm xúc, tên và số miễn phí.
                </span>
            </span>
        ),
    },
    {
        type: "info",
        id: "tradein",
        href: "/vn/shop/browse/overlay/store/tradein",
        icon: (
            <svg
                viewBox="0 0 36 36"
                aria-hidden="true"
                className="h-8 w-8 text-black/70"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 11h15" />
                <path d="M9 18h18" />
                <path d="M12 25h15" />
                <path d="M10.5 7.5h15c1.7 0 3 1.3 3 3v15c0 1.7-1.3 3-3 3h-15c-1.7 0-3-1.3-3-3v-15c0-1.7 1.3-3 3-3Z" />
            </svg>
        ),
        title: (
            <span>
                <span className="text-[#b36b00]">Đổi thiết bị cũ đủ điều kiện,</span> nhận
                điểm tín dụng để mua thiết bị mới.
            </span>
        ),
        openNewTab: false,
    },
    {
        type: "info",
        id: "financing",
        href: "/vn/shop/browse/financing",
        icon: (
            <svg
                viewBox="0 0 36 36"
                aria-hidden="true"
                className="h-8 w-8 text-black/70"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M18 31c7.2 0 13-5.8 13-13S25.2 5 18 5 5 10.8 5 18s5.8 13 13 13Z" />
                <path d="M18 11v14" />
                <path d="M12 18h12" />
            </svg>
        ),
        title: (
            <span>
                <span className="text-[#b36b00]">Thanh toán hàng tháng</span> thật dễ
                dàng. Bao gồm lựa chọn lãi suất 0%.
            </span>
        ),
        openNewTab: true,
    },
];

/* =========================
   COMPONENT
   ========================= */
export default function StoreWhyAppleShelf({
    title = "Apple Store tạo nên mọi khác biệt.",
    subtitle = "Thêm nhiều lý do để mua sắm cùng chúng tôi.",
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

    const scrollByPage = useCallback((dir: -1 | 1) => {
        const el = scrollerRef.current;
        if (!el) return;

        const gutter = window.innerWidth >= 1024 ? 0 : window.innerWidth >= 640 ? 24 : 16;
        const step = Math.max(320, el.clientWidth - gutter * 2);
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
            <section className="py-14">
                {/* Header container 1190 */}
                <div className="mx-auto w-full max-w-[1190px] px-4 sm:px-6 lg:px-0">
                    <div
                        className="mb-6 focus:outline-none"
                        tabIndex={-1}
                    >
                        <h2 className="text-[28px] sm:text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#1d1d1f]">
                            Apple Store tạo nên mọi khác biệt.
                        </h2>

                        <span className="mt-2 block text-[17px] leading-[1.47] text-black/55">
                            Thêm nhiều lý do để mua sắm cùng chúng tôi.
                        </span>
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
                            "scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-[max(0px,calc((100vw-1190px)/2))]",
                            "scroll-pr-4 sm:scroll-pr-6 lg:scroll-pr-[max(0px,calc((100vw-1190px)/2))]",
                            fadeEdgeMask
                        )}
                    >
                        <div
                            role="list"
                            className={cn(
                                "flex gap-5 pb-10",
                                "px-4 sm:px-6",
                                "lg:px-[max(0px,calc((100vw-1190px)/2))]"
                            )}
                        >
                            {data.map((item, idx) => {
                                const isFirst = idx === 0;

                                // FEATURE (lớn)
                                if (item.type === "feature") {
                                    const isTall = item.aspect === "tall";
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
                                                    cardBase,
                                                    hoverMotion,
                                                    "block",
                                                    // sizes
                                                    isTall ? "w-[420px] h-[520px]" : "w-[420px] h-[520px]",
                                                    "max-[560px]:w-[86vw] max-[560px]:h-[112vw] max-[560px]:max-h-[560px]"
                                                )}
                                            >
                                                {/* subtle gradient overlay (Apple-like paper) */}
                                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),transparent_45%,rgba(0,0,0,0.10))]" />
                                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_10%,rgba(0,0,0,0.06),transparent_55%)]" />

                                                {/* content layer */}
                                                <div className="relative z-10 p-7">
                                                    {item.eyebrow ? (
                                                        <div className="text-[12px] font-semibold tracking-[0.12em] text-black/55">
                                                            {item.eyebrow}
                                                        </div>
                                                    ) : null}

                                                    <div
                                                        className={cn(
                                                            "mt-2 text-[24px] sm:text-[26px] font-semibold tracking-[-0.02em] leading-[1.08] text-black/90",
                                                            "max-w-[18ch]"
                                                        )}
                                                    >
                                                        {item.title}
                                                    </div>
                                                </div>

                                                {/* image */}
                                                <div className="absolute inset-0">
                                                    <Image
                                                        src={item.imageSrc}
                                                        alt={item.imageAlt ?? item.title}
                                                        fill
                                                        priority={isFirst}
                                                        sizes="(max-width: 560px) 86vw, 420px"
                                                        className={cn(
                                                            "object-cover",
                                                            "transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                                                            "md:group-hover:scale-[1.02]"
                                                        )}
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                }

                                // INFO (nhỏ)
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
                                                cardBase,
                                                hoverMotion,
                                                "block",
                                                "w-[260px] h-[520px]",
                                                "max-[560px]:w-[60vw] max-[560px]:h-[112vw] max-[560px]:max-h-[560px]"
                                            )}
                                        >
                                            <div className="h-full p-7 flex flex-col">
                                                <div className="mb-4">{item.icon}</div>

                                                <div className="mt-1 text-[20px] font-semibold tracking-[-0.02em] leading-[1.12] text-black/85">
                                                    {item.title}
                                                </div>

                                                {/* Apple-like empty breathing space */}
                                                <div className="mt-auto" />

                                                {/* tiny “hint” line (very subtle) */}
                                                <div className="pt-6 text-[12px] text-black/35">
                                                    Tìm hiểu thêm
                                                </div>
                                            </div>

                                            {/* very subtle bottom vignette */}
                                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.04))]" />
                                        </Link>
                                    </div>
                                );
                            })}

                            {/* End spacer (Apple trailing space) */}
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

                    {/* Paddle nav (Apple-like) */}
                    <button
                        type="button"
                        aria-label={`Trước - ${title}`}
                        onClick={() => scrollByPage(-1)}
                        disabled={!canPrev}
                        className={cn(
                            "hidden md:grid place-items-center rounded-full",
                            "h-12 w-12 bg-white/70 text-black shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
                            "backdrop-blur-[10px] ring-1 ring-black/[0.06]",
                            "transition-opacity duration-200",
                            "absolute top-1/2 -translate-y-1/2 left-4 lg:left-6",
                            canPrev ? "opacity-100" : "opacity-0 pointer-events-none"
                        )}
                    >
                        <span aria-hidden="true" className="text-[26px] leading-none">
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
                            "h-12 w-12 bg-white/70 text-black shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
                            "backdrop-blur-[10px] ring-1 ring-black/[0.06]",
                            "transition-opacity duration-200",
                            "absolute top-1/2 -translate-y-1/2 right-4 lg:right-6",
                            canNext ? "opacity-100" : "opacity-0 pointer-events-none"
                        )}
                    >
                        <span aria-hidden="true" className="text-[26px] leading-none">
                            ›
                        </span>
                    </button>
                </div>
            </section>
        </div>
    );
}
