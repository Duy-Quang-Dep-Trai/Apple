"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import FlyoutMenu from "./FlyoutMenu";
import { useHoverIntent } from "./useHoverIntent";

import { storeMenu } from "./Menu/Store/menu";
import { macMenu } from "./Menu/Mac/menu";
import { ipadMenu } from "./Menu/Ipad/menu";
import { iphoneMenu } from "./Menu/Iphone/menu";
import { watchMenu } from "./Menu/Watch/menu";

// 1) OpenKey: chỉ những cái có dropdown
type OpenKey = "store" | "mac" | "ipad" | "iphone" | "watch" | "airpods" | null;

// 2) NavItem types
type NavItemBase = {
    label: string;
    href: string;
};

type NavItemWithMenu = NavItemBase & {
    menuKey: Exclude<OpenKey, null>;
};

type NavItem = NavItemBase | NavItemWithMenu;

// 3) type guard
function hasMenu(item: NavItem): item is NavItemWithMenu {
    return "menuKey" in item;
}

// 4) navItems typed chắc chắn -> không ra string|undefined
const navItems = [
    { label: "Cửa Hàng", href: "/store", menuKey: "store" },
    { label: "Mac", href: "/mac", menuKey: "mac" },
    { label: "iPad", href: "/ipad", menuKey: "ipad" },
    { label: "iPhone", href: "/iphone", menuKey: "iphone" },
    { label: "Watch", href: "/watch", menuKey: "watch" },
    { label: "AirPods", href: "/airpods", menuKey: "airpods" },

    { label: "TV & Nhà", href: "/tv-home" },
    { label: "Giải Trí", href: "/entertainment" },
    { label: "Phụ Kiện", href: "/accessories" },
    { label: "Hỗ Trợ", href: "/support" },
] satisfies readonly NavItem[];

export default function Header() {
    const [openKey, setOpenKey] = useState<OpenKey>(null);
    const { cancelClose, scheduleClose } = useHoverIntent();

    const closeAll = () => setOpenKey(null);

    // ESC để đóng
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeAll();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const isOpen = openKey !== null;

    const activeMenu = useMemo(() => {
        if (openKey === "store") return storeMenu;
        if (openKey === "mac") return macMenu;
        if (openKey === "ipad") return ipadMenu;
        if (openKey === "iphone") return iphoneMenu;
        if (openKey === "watch") return watchMenu;

        // airpods bạn chưa làm menu thì return null, còn nếu có thì thêm airpodsMenu ở đây
        return null;
    }, [openKey]);

    const activeId = openKey ? `globalnav-submenu-${openKey}` : undefined;

    return (
        <header className="sticky top-0 z-50 relative">
            <div onMouseEnter={cancelClose} onMouseLeave={() => scheduleClose(closeAll, 120)}>
                {/* NAV BAR */}
                <div className="bg-[#f5f5f7]/95 dark:bg-[#1d1d1f]/95 backdrop-blur">
                    <div className="mx-auto max-w-[1470px]">
                        <nav
                            aria-label="Apple global navigation"
                            className="mx-auto max-w-[1024px] h-11 flex items-center justify-center
                         text-[13px] text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80"
                        >
                            <ul
                                id="globalnav-list"
                                className="flex h-11 w-full max-w-[996px] items-center justify-between
                           list-none mx-[-8px] leading-[25px] tracking-[-0.374px]"
                            >
                                {/* Logo  */}
                                <li className="flex h-11 w-[30px] items-center justify-center">
                                    <Link
                                        href="/"
                                        aria-label="Trang chủ"
                                        className="flex h-7 w-7 items-center justify-center hover:opacity-80"
                                        onMouseEnter={closeAll}
                                        onFocus={closeAll}
                                    >
                                        <span className="text-xl leading-none"></span>
                                    </Link>
                                </li>

                                {/* Menu items */}
                                {navItems.map((item) => {
                                    const dropdown = hasMenu(item);

                                    return (
                                        <li key={item.href} className="flex h-11 items-center justify-center px-2">
                                            <Link
                                                href={item.href}
                                                className="relative py-[2px] transition hover:text-[#1d1d1f] dark:hover:text-white hover:translate-y-[1px]"
                                                onMouseEnter={() => (dropdown ? setOpenKey(item.menuKey) : closeAll())}
                                                onFocus={() => (dropdown ? setOpenKey(item.menuKey) : closeAll())}
                                                aria-expanded={dropdown ? openKey === item.menuKey : undefined}
                                                aria-controls={dropdown ? `globalnav-submenu-${item.menuKey}` : undefined}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}

                                {/* Search icon */}
                                <li className="flex h-11 w-[30px] items-center justify-center">
                                    <button
                                        aria-label="Tìm kiếm"
                                        className="flex h-7 w-7 items-center justify-center hover:opacity-80"
                                        onMouseEnter={closeAll}
                                        onFocus={closeAll}
                                        type="button"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="44" viewBox="0 0 15 44" className="fill-current">
                                            <path d="M14.298,27.202l-3.87-3.87c0.701-0.929,1.122-2.081,1.122-3.332c0-3.06-2.489-5.55-5.55-5.55c-3.06,0-5.55,2.49-5.55,5.55 c0,3.061,2.49,5.55,5.55,5.55c1.251,0,2.403-0.421,3.332-1.122l3.87,3.87c0.151,0.151,0.35,0.228,0.548,0.228 s0.396-0.076,0.548-0.228C14.601,27.995,14.601,27.505,14.298,27.202z M1.55,20c0-2.454,1.997-4.45,4.45-4.45 c2.454,0,4.45,1.997,4.45,4.45S8.454,24.45,6,24.45C3.546,24.45,1.55,22.454,1.55,20z"></path>
                                        </svg>
                                    </button>
                                </li>

                                {/* Bag icon */}
                                <li className="flex h-11 w-[30px] items-center justify-center">
                                    <button
                                        aria-label="Giỏ hàng"
                                        className="flex h-7 w-7 items-center justify-center hover:opacity-80"
                                        onMouseEnter={closeAll}
                                        onFocus={closeAll}
                                        type="button"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="44" viewBox="0 0 14 44" className="fill-current">
                                            <path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"></path>
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Overlay mờ phần dưới (không mờ nav) */}
                {isOpen && (
                    <div
                        className="fixed left-0 right-0 bottom-0 bg-black/10 backdrop-blur-[6px] pointer-events-none"
                        style={{ top: "44px" }}
                    />
                )}

                {/* Flyout */}
                {activeMenu && (
                    <div id={activeId}>
                        <FlyoutMenu open={isOpen} menu={activeMenu} id={activeId} />
                    </div>
                )}
            </div>
        </header>
    );
}
