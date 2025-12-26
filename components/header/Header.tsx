"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
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

/**
 * Header (Apple-like globalnav)
 * - Desktop: hover flyout (only on real hover devices)
 * - Mobile: fullscreen overlay + focus trap + iOS-safe scroll lock
 *
 * MOBILE IMPROVEMENTS:
 * - "Drop" from top with Apple-ish easing
 * - Stagger list items
 * - Hamburger morph to X using SVG <animate> (SMIL) like Apple
 */

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

type NavItemBase = { label: string; href: string };
type NavItemWithMenu = NavItemBase & { menuKey: Exclude<OpenKey, null> };
type NavItem = NavItemBase | NavItemWithMenu;

function hasMenu(item: NavItem): item is NavItemWithMenu {
    return "menuKey" in item;
}

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

function getFocusable(container: HTMLElement | null) {
    if (!container) return [];
    const selectors = [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
    ].join(",");

    return Array.from(container.querySelectorAll<HTMLElement>(selectors)).filter(
        (el) =>
            !el.hasAttribute("disabled") &&
            el.tabIndex !== -1 &&
            !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
    );
}

export default function Header() {
    // Desktop flyout
    const [openKey, setOpenKey] = useState<OpenKey>(null);
    const { cancelClose, scheduleClose } = useHoverIntent();

    // Mobile overlay menu
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileMounted, setMobileMounted] = useState(false);

    // Apple-ish timing
    const MOBILE_ANIM_MS = 240;

    // Hover capability gate
    const [canHover, setCanHover] = useState(false);

    // Track keyboard vs pointer input
    const lastInputWasKeyboard = useRef(false);

    // Focus trap refs (mobile)
    const mobileOverlayRef = useRef<HTMLDivElement | null>(null);
    const restoreFocusRef = useRef<HTMLElement | null>(null);

    // SVG animate refs (SMIL like Apple)
    const animTopOpenRef = useRef<SVGAnimateElement | null>(null);
    const animTopCloseRef = useRef<SVGAnimateElement | null>(null);
    const animBotOpenRef = useRef<SVGAnimateElement | null>(null);
    const animBotCloseRef = useRef<SVGAnimateElement | null>(null);

    const closeDesktopFlyout = useCallback(() => setOpenKey(null), []);
    const closeMobileMenu = useCallback(() => setMobileOpen(false), []);
    const closeAll = useCallback(() => {
        setOpenKey(null);
        setMobileOpen(false);
    }, []);

    // =========================
    // 1) Detect real hover device
    // =========================
    useEffect(() => {
        if (typeof window === "undefined") return;

        const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
        const update = () => setCanHover(mq.matches);
        update();

        if (typeof mq.addEventListener === "function") {
            mq.addEventListener("change", update);
            return () => mq.removeEventListener("change", update);
        } else {
            mq.addListener(update);
            return () => mq.removeListener(update);
        }
    }, []);

    // =========================
    // Track keyboard vs pointer
    // =========================
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Tab" || e.key === "Enter" || e.key === " " || e.key.startsWith("Arrow")) {
                lastInputWasKeyboard.current = true;
            }
        };
        const onPointerDown = () => {
            lastInputWasKeyboard.current = false;
        };

        window.addEventListener("keydown", onKeyDown, true);
        window.addEventListener("pointerdown", onPointerDown, true);

        return () => {
            window.removeEventListener("keydown", onKeyDown, true);
            window.removeEventListener("pointerdown", onPointerDown, true);
        };
    }, []);

    // =========================
    // Mobile mount/unmount
    // =========================
    useEffect(() => {
        if (mobileOpen) {
            setMobileMounted(true);
            return;
        }
        const t = window.setTimeout(() => setMobileMounted(false), MOBILE_ANIM_MS);
        return () => window.clearTimeout(t);
    }, [mobileOpen]);

    // =========================
    // Apple-like icon morph sync
    // - start open anim when mobileOpen=true
    // - start close anim when mobileOpen=false (but only after first mount)
    // =========================
    const hasEverOpenedRef = useRef(false);
    useEffect(() => {
        // On first render, do nothing
        if (!hasEverOpenedRef.current && !mobileOpen) return;

        if (mobileOpen) {
            hasEverOpenedRef.current = true;
            // begin open
            animTopOpenRef.current?.beginElement?.();
            animBotOpenRef.current?.beginElement?.();
        } else {
            // begin close
            animTopCloseRef.current?.beginElement?.();
            animBotCloseRef.current?.beginElement?.();
        }
    }, [mobileOpen]);

    // Desktop: open by focus only if keyboard
    const openByFocus = (key: Exclude<OpenKey, null>) => {
        if (!lastInputWasKeyboard.current) return;
        setOpenKey(key);
    };

    // =========================
    // Close when tab hidden
    // =========================
    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === "hidden") closeAll();
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, [closeAll]);

    // =========================
    // ESC closes all
    // =========================
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeAll();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [closeAll]);

    // =========================
    // iOS-safe scroll lock (mobile open)
    // =========================
    useEffect(() => {
        if (!mobileOpen) return;

        const body = document.body;
        const html = document.documentElement;

        const prevBodyOverflow = body.style.overflow;
        const prevBodyPosition = body.style.position;
        const prevBodyTop = body.style.top;
        const prevBodyWidth = body.style.width;
        const prevHtmlOverflow = html.style.overflow;

        const scrollY = window.scrollY;

        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.width = "100%";

        return () => {
            const top = body.style.top;

            html.style.overflow = prevHtmlOverflow;
            body.style.overflow = prevBodyOverflow;
            body.style.position = prevBodyPosition;
            body.style.top = prevBodyTop;
            body.style.width = prevBodyWidth;

            const y = top ? -parseInt(top, 10) : scrollY;
            window.scrollTo(0, y);
        };
    }, [mobileOpen]);

    // =========================
    // Focus trap + restore focus (mobile)
    // =========================
    useEffect(() => {
        if (!mobileOpen) return;

        restoreFocusRef.current = document.activeElement as HTMLElement | null;

        const focusables = getFocusable(mobileOverlayRef.current);
        (focusables[0] ?? mobileOverlayRef.current)?.focus?.();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            const container = mobileOverlayRef.current;
            const items = getFocusable(container);

            if (items.length === 0) {
                e.preventDefault();
                return;
            }

            const first = items[0];
            const last = items[items.length - 1];
            const active = document.activeElement as HTMLElement | null;

            if (e.shiftKey && active === first) {
                e.preventDefault();
                last.focus();
                return;
            }

            if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
                return;
            }
        };

        document.addEventListener("keydown", onKeyDown, true);
        return () => {
            document.removeEventListener("keydown", onKeyDown, true);
            restoreFocusRef.current?.focus?.();
            restoreFocusRef.current = null;
        };
    }, [mobileOpen]);

    // =========================
    // Desktop flyout menu selection
    // =========================
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

    // =========================
    // Mobile toggle handler (sync icon + menu)
    // =========================
    const toggleMobile = () => setMobileOpen((v) => !v);

    return (
        <header className="sticky top-0 z-50 relative">
            {/* ================= MOBILE HEADER ================= */}
            <div className="md:hidden">
                <div className="bg-[#f5f5f7]/95 dark:bg-[#1d1d1f]/95 backdrop-blur">
                    <div className="mx-auto h-11 px-4 flex items-center text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80">
                        {/* LEFT: Logo */}
                        <Link
                            href="/"
                            aria-label="Apple"
                            className="flex h-8 w-8 items-center justify-center hover:opacity-80"
                            onClick={closeAll}
                        >
                            <span className="text-xl leading-none"></span>
                        </Link>

                        {/* RIGHT: Search + Bag + Menu */}
                        <div className="ml-auto flex items-center gap-3">
                            {/* Search */}
                            <button
                                aria-label="Tìm kiếm"
                                className="flex h-8 w-8 items-center justify-center hover:opacity-80"
                                type="button"
                                onClick={() => {
                                    closeDesktopFlyout();
                                    closeMobileMenu();
                                    // TODO: open search overlay
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="44" viewBox="0 0 15 44" className="fill-current">
                                    <path d="M14.298,27.202l-3.87-3.87c0.701-0.929,1.122-2.081,1.122-3.332c0-3.06-2.489-5.55-5.55-5.55c-3.06,0-5.55,2.49-5.55,5.55 c0,3.061,2.49,5.55,5.55,5.55c1.251,0,2.403-0.421,3.332-1.122l3.87,3.87c0.151,0.151,0.35,0.228,0.548,0.228 s0.396-0.076,0.548-0.228C14.601,27.995,14.601,27.505,14.298,27.202z M1.55,20c0-2.454,1.997-4.45,4.45-4.45 c2.454,0,4.45,1.997,4.45,4.45S8.454,24.45,6,24.45C3.546,24.45,1.55,22.454,1.55,20z"></path>
                                </svg>
                            </button>

                            {/* Bag */}
                            <button
                                aria-label="Giỏ hàng"
                                className="flex h-8 w-8 items-center justify-center hover:opacity-80"
                                type="button"
                                onClick={() => {
                                    closeDesktopFlyout();
                                    closeMobileMenu();
                                    // TODO: open bag
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="44" viewBox="0 0 14 44" className="fill-current">
                                    <path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"></path>
                                </svg>
                            </button>

                            {/* Menu trigger - Apple SMIL morph */}
                            <button
                                id="globalnav-menutrigger-button"
                                className="flex h-8 w-8 items-center justify-center hover:opacity-80"
                                aria-controls="mobile-globalnav-list"
                                aria-expanded={mobileOpen}
                                aria-label={mobileOpen ? "Close" : "Menu"}
                                type="button"
                                onClick={toggleMobile}
                            >
                                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                                    {/* Bottom bread */}
                                    <polyline
                                        id="globalnav-menutrigger-bread-bottom"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        points="2 12, 16 12"
                                    >
                                        <animate
                                            ref={animBotOpenRef}
                                            id="globalnav-anim-menutrigger-bread-bottom-open"
                                            attributeName="points"
                                            keyTimes="0;0.5;1"
                                            dur={`${MOBILE_ANIM_MS}ms`}
                                            begin="indefinite"
                                            fill="freeze"
                                            calcMode="spline"
                                            keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
                                            values="2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5"
                                        />
                                        <animate
                                            ref={animBotCloseRef}
                                            id="globalnav-anim-menutrigger-bread-bottom-close"
                                            attributeName="points"
                                            keyTimes="0;0.5;1"
                                            dur={`${MOBILE_ANIM_MS}ms`}
                                            begin="indefinite"
                                            fill="freeze"
                                            calcMode="spline"
                                            keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
                                            values="3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12"
                                        />
                                    </polyline>

                                    {/* Top bread */}
                                    <polyline
                                        id="globalnav-menutrigger-bread-top"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        points="2 5, 16 5"
                                    >
                                        <animate
                                            ref={animTopOpenRef}
                                            id="globalnav-anim-menutrigger-bread-top-open"
                                            attributeName="points"
                                            keyTimes="0;0.5;1"
                                            dur={`${MOBILE_ANIM_MS}ms`}
                                            begin="indefinite"
                                            fill="freeze"
                                            calcMode="spline"
                                            keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
                                            values="2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15"
                                        />
                                        <animate
                                            ref={animTopCloseRef}
                                            id="globalnav-anim-menutrigger-bread-top-close"
                                            attributeName="points"
                                            keyTimes="0;0.5;1"
                                            dur={`${MOBILE_ANIM_MS}ms`}
                                            begin="indefinite"
                                            fill="freeze"
                                            calcMode="spline"
                                            keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
                                            values="3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5"
                                        />
                                    </polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= MOBILE MENU OVERLAY ================= */}
                {mobileMounted && (
                    <div
                        ref={mobileOverlayRef}
                        tabIndex={-1}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu"
                        className={[
                            // Keep layout, just overlay
                            "fixed inset-0 z-[100]",
                            "bg-[#f5f5f7] dark:bg-[#1d1d1f]",

                            // "Drop" effect: translateY + slight scale + opacity
                            "transform-gpu will-change-[transform,opacity]",
                            "transition-[opacity,transform]",
                            `duration-[${MOBILE_ANIM_MS}ms]`,

                            // Apple-ish: first half quick, second half settle
                            "ease-[cubic-bezier(0.42,0,0.58,1)]",

                            // Add top spacing like Apple (they have padding-top around 50px)
                            "pt-[50px]",

                            mobileOpen
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 -translate-y-3 scale-[0.985] pointer-events-none",
                        ].join(" ")}
                    >
                        {/* List (no extra close X; Apple uses the same trigger morph) */}
                        <nav className="px-6" aria-label="Mobile global navigation">
                            <ul
                                id="mobile-globalnav-list"
                                className="space-y-4 text-[28px] font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-white"
                            >
                                {navItems.map((item, index) => (
                                    <li
                                        key={item.href}
                                        className={[
                                            "transition-[opacity,transform]",
                                            // Apple-like stagger: slow enough to feel "light"
                                            "duration-[420ms]",
                                            "ease-[cubic-bezier(0.22,0.61,0.36,1)]",
                                            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
                                        ].join(" ")}
                                        style={{
                                            transitionDelay: mobileOpen ? `${index * 36 + 70}ms` : "0ms",
                                        }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="block"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>

            {/* ================= DESKTOP HEADER (UNCHANGED) ================= */}
            <div className="hidden md:block">
                <div
                    onMouseEnter={() => {
                        if (!canHover) return;
                        cancelClose();
                    }}
                    onMouseLeave={() => {
                        if (!canHover) return;
                        scheduleClose(closeDesktopFlyout, 120);
                    }}
                >
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
                                        <Link href="/" className="flex h-7 w-7 items-center justify-center hover:opacity-80 cursor-pointer">
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
                                                    onMouseEnter={() => {
                                                        if (!canHover) return;
                                                        dropdown ? setOpenKey(item.menuKey) : closeDesktopFlyout();
                                                    }}
                                                    onFocus={() => (dropdown ? openByFocus(item.menuKey) : closeDesktopFlyout())}
                                                    onClick={closeDesktopFlyout}
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
                                            onMouseEnter={closeDesktopFlyout}
                                            onFocus={closeDesktopFlyout}
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
                                            onMouseEnter={closeDesktopFlyout}
                                            onFocus={closeDesktopFlyout}
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

                    {/* Desktop overlay: click to close flyout */}
                    {isDesktopFlyoutOpen && (
                        <button
                            type="button"
                            aria-label="Đóng menu"
                            onClick={closeDesktopFlyout}
                            className="fixed left-0 right-0 bottom-0 bg-black/10 backdrop-blur-[6px]"
                            style={{ top: "44px" }}
                        />
                    )}

                    {/* Flyout */}
                    {activeMenu && (
                        <div id={activeId}>
                            <FlyoutMenu open={isDesktopFlyoutOpen} menu={activeMenu} id={activeId} onNavigate={closeDesktopFlyout} />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
