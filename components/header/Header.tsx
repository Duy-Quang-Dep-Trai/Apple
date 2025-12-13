"use client";

import { useEffect, useState } from "react";

/* =======================
   TYPES
======================= */

type NavItem = {
    label: string;
    key: string;
    hasDropdown?: boolean;
};

type StoreMenuItem = {
    label: string;
    href: string;
};

type StoreMenuGroup = {
    title: string;
    items: StoreMenuItem[];
    elevated?: boolean;
};

type DropdownKey = "store" | null;

/* =======================
   DATA
======================= */

const navItems: NavItem[] = [
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
];

const storeMenu: StoreMenuGroup[] = [
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
            { label: "Phụ Kiện", href: "/vn/shop/accessories/all" },
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
];

/* =======================
   COMPONENT
======================= */

export default function Header() {
    const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
    const showStore = openDropdown === "store";

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
                        className="mx-auto max-w-[1024px] h-11 flex items-center justify-center
              text-[13px] text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80"
                    >
                        <ul className="flex h-11 w-full max-w-[996px] items-center justify-between list-none mx-[-8px]">
                            <li className="flex h-11 w-[30px] items-center justify-center">
                                <span className="text-xl"></span>
                            </li>

                            {navItems.map((item) => {
                                const isStore = item.key === "store";
                                return (
                                    <li key={item.key} className="px-2">
                                        <button
                                            onMouseEnter={() =>
                                                setOpenDropdown(isStore ? "store" : null)
                                            }
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* STORE MENU */}
            <div
                className={[
                    "absolute left-0 right-0 bg-[#f5f5f7]/95 dark:bg-[#1d1d1f]/95",
                    showStore
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none",
                ].join(" ")}
            >
                <div className="mx-auto max-w-[1024px] px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {storeMenu.map((group) => (
                            <div key={group.title}>
                                <h2 className="text-[12px] font-medium text-[#6e6e73]">
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
                                                        ? "text-[20px] text-[#1d1d1f]"
                                                        : "text-[13px] text-[#1d1d1f]/85",
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
            </div>
        </header>
    );
}
