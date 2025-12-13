"use client";

import { useEffect, useState } from "react";

const navItems = [
    { label: "Cửa Hàng", key: "store", hasDropdown: true },
    { label: "Mac", key: "mac" },
    { label: "iPad", key: "ipad" },
    { label: "iPhone", key: "iphone" },
    { label: "Watch", key: "watch" },
    { label: "AirPods", key: "airpods" },
    { label: "TV & Nhà", key: "tv-home" },
    { label: "Giải Trí", key: "entertainment" },
    { label: "Phụ Kiện", key: "accessories" },
    { label: "Hỗ Trợ", key: "support" },
] as const;

const storeMenu = [
    {
        title: "Mua Hàng",
        elevated: true,
        items: [
            { label: "Mua Sắm Quà Tặng", href: "/vn/store" },
            { label: "Mac", href: "/vn/shop/buy-mac" },
            { label: "iPad", href: "/vn/shop/buy-ipad" },
            { label: "iPhone", href: "/vn/shop/buy-iphone" },
            { label: "Apple Watch", href: "/vn/shop/buy-watch" },
            { label: "AirPods", href: "/vn/shop/goto/airpods/accessories" },
            { label: "Phụ Kiện", href: "/vn/shop/accessories/all" }
        ],
    },
    {
        title: "Liên Kết Nhanh",
        items: [
            { label: "Tình Trạng Đơn Hàng", href: "/vn/shop/order/list" },
            { label: "Apple Trade In", href: "/vn/shop/trade-in" },
            { label: "Tài Chính", href: "/vn/shop/goto/ww/financing" },
        ],
    },
    {
        title: "Mua Tại Cửa Hàng Đặc Biệt",
        items: [
            { label: "Giáo Dục", href: "/vn/shop/browse/home/education_routing" },
            { label: "Doanh Nghiệp", href: "/vn/retail/business/" },
        ],
    },
] as const;

type DropdownKey = "store" | null;

export default function Header() {
    const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
    const showStore = openDropdown === "store";

    // ESC để đóng dropdown
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpenDropdown(null);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <header className="sticky top-0 z-50 relative">
            {/* NAV BAR */}
            <div
                className="bg-[#f5f5f7]/90 dark:bg-[#1d1d1f]/90 backdrop-blur"
                onMouseLeave={() => setOpenDropdown(null)}
            >
                <div className="mx-auto max-w-[1470px]">
                    <nav
                        aria-label="Apple global navigation"
                        className="mx-auto max-w-[1024px]
                       h-11 flex items-center justify-center
                       text-[13px] text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80"
                    >
                        <ul
                            id="globalnav-list"
                            className="flex h-11 w-full max-w-[996px]
                         items-center justify-between
                         list-none mx-[-8px]
                         leading-[25px] tracking-[-0.374px]"
                        >
                            {/* Logo  */}
                            <li className="flex h-11 w-[30px] items-center justify-center">
                                <button
                                    aria-label="Apple"
                                    className="flex h-7 w-7 items-center justify-center hover:opacity-80"
                                    onMouseEnter={() => setOpenDropdown(null)}
                                >
                                    <span className="text-xl leading-none"></span>
                                </button>
                            </li>

                            {/* Nav items */}
                            {navItems.map((item) => {
                                const isStore = item.key === "store";
                                return (
                                    <li key={item.key} className="flex h-11 items-center justify-center px-2">
                                        <button
                                            className="relative py-[2px] transition
                                 hover:text-[#1d1d1f] dark:hover:text-white
                                 hover:translate-y-[1px]"
                                            aria-expanded={isStore ? showStore : undefined}
                                            aria-controls={isStore ? "globalnav-submenu-store" : undefined}
                                            onMouseEnter={() => setOpenDropdown(isStore ? "store" : null)}
                                            onFocus={() => setOpenDropdown(isStore ? "store" : null)}
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                );
                            })}

                            {/* Search icon */}
                            <li className="flex h-11 w-[30px] items-center justify-center">
                                <button
                                    aria-label="Tìm kiếm trên apple.com"
                                    className="flex h-7 w-7 items-center justify-center hover:opacity-80"
                                    onMouseEnter={() => setOpenDropdown(null)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="44"
                                        viewBox="0 0 15 44"
                                        className="fill-current"
                                    >
                                        <path d="M14.298,27.202l-3.87-3.87c0.701-0.929,1.122-2.081,1.122-3.332c0-3.06-2.489-5.55-5.55-5.55c-3.06,0-5.55,2.49-5.55,5.55 c0,3.061,2.49,5.55,5.55,5.55c1.251,0,2.403-0.421,3.332-1.122l3.87,3.87c0.151,0.151,0.35,0.228,0.548,0.228 s0.396-0.076,0.548-0.228C14.601,27.995,14.601,27.505,14.298,27.202z M1.55,20c0-2.454,1.997-4.45,4.45-4.45 c2.454,0,4.45,1.997,4.45,4.45S8.454,24.45,6,24.45C3.546,24.45,1.55,22.454,1.55,20z"></path>
                                    </svg>
                                </button>
                            </li>

                            {/* Bag icon */}
                            <li className="flex h-11 w-[30px] items-center justify-center">
                                <button
                                    aria-label="Giỏ hàng Apple"
                                    className="flex h-7 w-7 items-center justify-center hover:opacity-80"
                                    onMouseEnter={() => setOpenDropdown(null)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="44"
                                        viewBox="0 0 14 44"
                                        className="fill-current"
                                    >
                                        <path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"></path>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* STORE FLYOUT (Apple-like) */}
            <div
                id="globalnav-submenu-store"
                className={[
                    "absolute left-0 right-0",
                    "bg-[#f5f5f7]/95 dark:bg-[#1d1d1f]/95 backdrop-blur-xl",
                    "border-t border-black/5 dark:border-white/10",
                    "transition-all duration-200 ease-out",
                    showStore
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none",
                ].join(" ")}
                onMouseEnter={() => setOpenDropdown("store")}
                onMouseLeave={() => setOpenDropdown(null)}
            >
                <div className="mx-auto max-w-[1024px] px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {storeMenu.map((group) => (
                            <div key={group.title}>
                                <h2 className="text-[12px] font-medium text-[#6e6e73] dark:text-[#86868b]">
                                    {group.title}
                                </h2>

                                <ul className="mt-4 space-y-3">
                                    {group.items.map((it) => (
                                        <li key={it.label}>
                                            <a
                                                href={it.href}
                                                className={[
                                                    "block hover:opacity-80",
                                                    group.elevated
                                                        ? "text-[20px] leading-[1.2] tracking-[-0.02em] text-[#1d1d1f] dark:text-white"
                                                        : "text-[13px] text-[#1d1d1f]/85 dark:text-[#f5f5f7]/85",
                                                ].join(" ")}
                                            >
                                                {it.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Optional overlay click-away: giống cảm giác Apple hơn */}
                {showStore && (
                    <div
                        className="fixed inset-0 top-11"
                        onClick={() => setOpenDropdown(null)}
                        aria-hidden="true"
                    />
                )}
            </div>
        </header>
    );
}
