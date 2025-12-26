"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import FlyoutMenu from "./FlyoutMenu";
import { useHoverIntent } from "./useHoverIntent";

import { storeMenu } from "./Menu/Store/menu";
import { macMenu } from "./Menu/Mac/menu";
import { ipadMenu } from "./Menu/Ipad/menu";
import { iphoneMenu } from "./Menu/Iphone/menu";
import { watchMenu } from "./Menu/Watch/menu";
import { airpodsMenu } from "./Menu/AirPods/menu";
import { tvHomeMenu } from "./Menu/TvHome/menu";
import { entertainmentMenu } from "./Menu/Entertainment/menu";
import { accessoriesMenu } from "./Menu/accessories/menu";
import { supportMenu } from "./Menu/Support/menu";

// 1) OpenKey: chỉ những cái có dropdown
type OpenKey =
    | "store"
    | "mac"
    | "ipad"
    | "iphone"
    | "watch"
    | "airpods"
    | "tv-home"
    | "entertainment"
    | "accessories"
    | "support"
    | null;

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
    { label: "TV & Nhà", href: "/tv-home", menuKey: "tv-home" },
    { label: "Giải Trí", href: "/entertainment", menuKey: "entertainment" },
    { label: "Phụ Kiện", href: "/accessories", menuKey: "accessories" },
    { label: "Hỗ Trợ", href: "/support", menuKey: "support" },
] satisfies readonly NavItem[];

export default function Header() {
    // Desktop flyout state
    const [openKey, setOpenKey] = useState<OpenKey>(null);
    const { cancelClose, scheduleClose } = useHoverIntent();

    // Mobile menu state
    const [mobileOpen, setMobileOpen] = useState(false);

    const closeAll = () => setOpenKey(null);

    // ✅ Only open by focus when user is using keyboard
    const lastInputWasKeyboard = useRef(false);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            // Tab / Arrow / Enter / Space
            if (
                e.key === "Tab" ||
                e.key === "Enter" ||
                e.key === " " ||
                e.key.startsWith("Arrow")
            ) {
                lastInputWasKeyboard.current = true;
            }
        };

        const onPointerDown = () => {
            // mouse / touch
            lastInputWasKeyboard.current = false;
        };

        window.addEventListener("keydown", onKeyDown, true);
        window.addEventListener("pointerdown", onPointerDown, true);

        return () => {
            window.removeEventListener("keydown", onKeyDown, true);
            window.removeEventListener("pointerdown", onPointerDown, true);
        };
    }, []);

    const openByFocus = (key: Exclude<OpenKey, null>) => {
        if (!lastInputWasKeyboard.current) return; // block focus restore / mouse click focus
        setOpenKey(key);
    };

    // ✅ Close menus when tab becomes hidden (Alt+Tab / switch tabs)
    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === "hidden") {
                closeAll();
                setMobileOpen(false);
            }
        };

        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);

    // ✅ Optional: ESC closes both desktop flyout and mobile menu
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeAll();
                setMobileOpen(false);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const isDesktopFlyoutOpen = openKey !== null;

    const activeMenu = useMemo(() => {
        if (openKey === "store") return storeMenu;
        if (openKey === "mac") return macMenu;
        if (openKey === "ipad") return ipadMenu;
        if (openKey === "iphone") return iphoneMenu;
        if (openKey === "watch") return watchMenu;
        if (openKey === "airpods") return airpodsMenu;
        if (openKey === "tv-home") return tvHomeMenu;
        if (openKey === "entertainment") return entertainmentMenu;
        if (openKey === "accessories") return accessoriesMenu;
        if (openKey === "support") return supportMenu;
        return null;
    }, [openKey]);

    const activeId = openKey ? `globalnav-submenu-${openKey}` : undefined;

    // Apple-like menutrigger morph points
    const menuTopPoints = mobileOpen ? "3.5 3.5, 15 15" : "2 5, 16 5";
    const menuBottomPoints = mobileOpen ? "3.5 15, 15 3.5" : "2 12, 16 12";

    return (
        <header className="sticky top-0 z-50 relative">
            {/* ================= MOBILE HEADER (Apple-like) ================= */}
            {/* ================= MOBILE HEADER (Apple mobile layout) ================= */}
            <div className="md:hidden">
                <div className="bg-[#f5f5f7]/95 dark:bg-[#1d1d1f]/95 backdrop-blur">
                    <div className="mx-auto h-11 px-4 flex items-center text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80">
                        {/* LEFT: Logo */}
                        <Link
                            href="/"
                            aria-label="Apple"
                            className="flex h-8 w-8 items-center justify-center hover:opacity-80"
                            onClick={() => setMobileOpen(false)}
                        >
                            <span className="text-xl leading-none"></span>
                        </Link>

                        {/* RIGHT: Search + Bag + Menu */}
                        <div className="ml-auto flex items-center gap-3">
                            {/* Search (y hệt desktop) */}
                            <button
                                aria-label="Tìm kiếm"
                                className="flex h-8 w-8 items-center justify-center hover:opacity-80"
                                type="button"
                                onClick={() => {
                                    setMobileOpen(false);
                                    closeAll();
                                    // TODO: open search overlay
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="44" viewBox="0 0 15 44" className="fill-current">
                                    <path d="M14.298,27.202l-3.87-3.87c0.701-0.929,1.122-2.081,1.122-3.332c0-3.06-2.489-5.55-5.55-5.55c-3.06,0-5.55,2.49-5.55,5.55 c0,3.061,2.49,5.55,5.55,5.55c1.251,0,2.403-0.421,3.332-1.122l3.87,3.87c0.151,0.151,0.35,0.228,0.548,0.228 s0.396-0.076,0.548-0.228C14.601,27.995,14.601,27.505,14.298,27.202z M1.55,20c0-2.454,1.997-4.45,4.45-4.45 c2.454,0,4.45,1.997,4.45,4.45S8.454,24.45,6,24.45C3.546,24.45,1.55,22.454,1.55,20z"></path>
                                </svg>
                            </button>

                            {/* Bag (y hệt desktop) */}
                            <button
                                aria-label="Giỏ hàng"
                                className="flex h-8 w-8 items-center justify-center hover:opacity-80"
                                type="button"
                                onClick={() => {
                                    setMobileOpen(false);
                                    closeAll();
                                    // TODO: open bag
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="44" viewBox="0 0 14 44" className="fill-current">
                                    <path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"></path>
                                </svg>
                            </button>

                            {/* Menu trigger (Apple-like SVG) */}
                            <button
                                id="globalnav-menutrigger-button"
                                className="flex h-8 w-8 items-center justify-center hover:opacity-80"
                                aria-controls="mobile-globalnav-list"
                                aria-label={mobileOpen ? "Close" : "Menu"}
                                type="button"
                                onClick={() => setMobileOpen((v) => !v)}
                            >
                                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                                    <polyline
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        points={menuBottomPoints}
                                        style={{ transition: "all 240ms cubic-bezier(0.42, 0, 1, 1)" }}
                                    />
                                    <polyline
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        points={menuTopPoints}
                                        style={{ transition: "all 240ms cubic-bezier(0.42, 0, 1, 1)" }}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= MOBILE MENU OVERLAY (list) ================= */}
                <div
                    className={[
                        "fixed inset-0 z-[100]",
                        "bg-[#f5f5f7] dark:bg-[#1d1d1f]",
                        "transition-[opacity,transform] duration-200 ease-out",
                        mobileOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1",
                    ].join(" ")}
                    aria-hidden={!mobileOpen}
                >
                    <div className="flex h-11 items-center justify-end px-4 border-b border-black/10 dark:border-white/10">
                        <button
                            aria-label="Đóng menu"
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            className="flex h-8 w-8 items-center justify-center hover:opacity-80 text-[#1d1d1f] dark:text-[#f5f5f7]"
                        >
                            <span className="text-[18px] leading-none">✕</span>
                        </button>
                    </div>

                    <nav className="px-6 pt-6" aria-label="Mobile global navigation">
                        <ul
                            id="mobile-globalnav-list"
                            className="space-y-4 text-[28px] font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-white"
                        >
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} onClick={() => setMobileOpen(false)} className="block">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>


            {/* ================= DESKTOP HEADER (your current header) ================= */}
            <div className="hidden md:block">
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
                                            className="flex h-7 w-7 items-center justify-center hover:opacity-80 cursor-pointer"
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
                                                    onFocus={() => (dropdown ? openByFocus(item.menuKey) : closeAll())}
                                                    onClick={closeAll} // ✅ click closes flyout
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
                    {isDesktopFlyoutOpen && (
                        <div
                            className="fixed left-0 right-0 bottom-0 bg-black/10 backdrop-blur-[6px] pointer-events-none"
                            style={{ top: "44px" }}
                        />
                    )}

                    {/* Flyout */}
                    {activeMenu && (
                        <div id={activeId}>
                            <FlyoutMenu
                                open={isDesktopFlyoutOpen}
                                menu={activeMenu}
                                id={activeId}
                                onNavigate={closeAll}
                            />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
