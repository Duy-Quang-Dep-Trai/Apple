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

function AppleSearchIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="44"
            viewBox="0 0 15 44"
            aria-hidden="true"
            className="fill-current"
        >
            <path d="M14.298,27.202l-3.87-3.87c0.701-0.929,1.122-2.081,1.122-3.332c0-3.06-2.489-5.55-5.55-5.55c-3.06,0-5.55,2.49-5.55,5.55 c0,3.061,2.49,5.55,5.55,5.55c1.251,0,2.403-0.421,3.332-1.122l3.87,3.87c0.151,0.151,0.35,0.228,0.548,0.228 s0.396-0.076,0.548-0.228C14.601,27.995,14.601,27.505,14.298,27.202z M1.55,20c0-2.454,1.997-4.45,4.45-4.45 c2.454,0,4.45,1.997,4.45,4.45S8.454,24.45,6,24.45C3.546,24.45,1.55,22.454,1.55,20z"></path>
        </svg>
    );
}

function AppleBagIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="44"
            viewBox="0 0 14 44"
            aria-hidden="true"
            className="fill-current"
        >
            <path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"></path>
        </svg>
    );
}

export default function Header() {
    // Desktop flyout
    const [openKey, setOpenKey] = useState<OpenKey>(null);
    const { cancelClose, scheduleClose } = useHoverIntent();

    // “closing” state để animation đóng mượt (giống lúc mở)
    const [closing, setClosing] = useState(false);
    const closeTimerRef = useRef<number | null>(null);

    // Mobile overlay menu
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileMounted, setMobileMounted] = useState(false);
    const MOBILE_ANIM_MS = 240;

    // Hover capability gate
    const [canHover, setCanHover] = useState(false);

    // Track keyboard vs pointer
    const lastInputWasKeyboard = useRef(false);

    // Focus trap refs (mobile)
    const mobileOverlayRef = useRef<HTMLDivElement | null>(null);
    const restoreFocusRef = useRef<HTMLElement | null>(null);

    const clearCloseTimer = useCallback(() => {
        if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
    }, []);

    // ✅ Đóng mượt: giữ FlyoutMenu “open” thêm 1 nhịp để nó animate height/opacity xuống nhẹ nhàng
    const closeDesktopFlyoutSmooth = useCallback(() => {
        if (openKey === null) return;
        clearCloseTimer();
        setClosing(true);
        closeTimerRef.current = window.setTimeout(() => {
            setOpenKey(null);
            setClosing(false);
            closeTimerRef.current = null;
        }, 220); // khớp với FlyoutMenu close duration bạn đang dùng (220ms)
    }, [openKey, clearCloseTimer]);

    // ✅ Mở lại thì hủy closing ngay lập tức
    const openDesktopFlyout = useCallback(
        (key: Exclude<OpenKey, null>) => {
            clearCloseTimer();
            setClosing(false);
            setOpenKey(key);
        },
        [clearCloseTimer]
    );

    const closeMobileMenu = useCallback(() => setMobileOpen(false), []);
    const closeAll = useCallback(() => {
        clearCloseTimer();
        setClosing(false);
        setOpenKey(null);
        setMobileOpen(false);
    }, [clearCloseTimer]);

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

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
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
            lastInputWasKeyboard.current = false;
        };

        window.addEventListener("keydown", onKeyDown, true);
        window.addEventListener("pointerdown", onPointerDown, true);

        return () => {
            window.removeEventListener("keydown", onKeyDown, true);
            window.removeEventListener("pointerdown", onPointerDown, true);
        };
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            setMobileMounted(true);
            return;
        }
        const t = window.setTimeout(() => setMobileMounted(false), MOBILE_ANIM_MS);
        return () => window.clearTimeout(t);
    }, [mobileOpen]);

    const openByFocus = (key: Exclude<OpenKey, null>) => {
        if (!lastInputWasKeyboard.current) return;
        openDesktopFlyout(key);
    };

    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === "hidden") closeAll();
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, [closeAll]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeAll();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [closeAll]);

    // iOS-safe scroll lock when mobile menu open
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

    // Focus trap + restore focus (mobile)
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

    // Flyout open thực sự khi openKey != null
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

    // Shared styling (Apple-ish)
    const barClass =
        "h-11 bg-[#f5f5f7]/92 dark:bg-[#1d1d1f]/92 backdrop-blur-[18px] supports-[backdrop-filter]:bg-[#f5f5f7]/80 dark:supports-[backdrop-filter]:bg-[#1d1d1f]/80";

    const textClass = "text-[#1d1d1f]/80 dark:text-[#f5f5f7]/80";
    const hoverTextClass = "hover:text-[#1d1d1f] dark:hover:text-white";

    // “globalnav-content” spec: 1024 width, 22px paddings (content box ~980)
    const DESKTOP_CONTENT = "mx-auto max-w-[1024px] px-[22px]";

    // ✅ Flyout “đang animate đóng” vẫn coi như open để FlyoutMenu tự animate xuống
    const flyoutVisible = isDesktopFlyoutOpen || closing;

    return (
        <header id="globalheader" className="sticky top-0 z-[70]">
            {/* ================= MOBILE ================= */}
            <div className="md:hidden">
                <div className={barClass}>
                    <div className={`h-11 px-4 flex items-center ${textClass}`}>
                        <Link
                            href="/"
                            aria-label="Apple"
                            className={`flex h-11 w-11 items-center justify-center ${hoverTextClass} hover:opacity-90`}
                            onClick={closeAll}
                        >
                            <span className="text-[20px] leading-none"></span>
                        </Link>

                        <div className="ml-auto flex items-center">
                            <button
                                aria-label="Tìm kiếm"
                                className={`flex h-11 w-11 items-center justify-center ${hoverTextClass} hover:opacity-90`}
                                type="button"
                                onClick={() => {
                                    closeAll();
                                }}
                            >
                                <AppleSearchIcon />
                            </button>

                            <button
                                aria-label="Giỏ hàng"
                                className={`flex h-11 w-11 items-center justify-center ${hoverTextClass} hover:opacity-90`}
                                type="button"
                                onClick={() => {
                                    closeAll();
                                }}
                            >
                                <AppleBagIcon />
                            </button>

                            <button
                                id="globalnav-menutrigger-button"
                                className={`flex h-11 w-11 items-center justify-center ${hoverTextClass} hover:opacity-90`}
                                aria-controls="mobile-globalnav-list"
                                aria-expanded={mobileOpen}
                                aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
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

                {mobileMounted && (
                    <div
                        ref={mobileOverlayRef}
                        tabIndex={-1}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu"
                        className={[
                            "fixed inset-0 z-[100]",
                            "bg-[#f5f5f7] dark:bg-[#1d1d1f]",
                            "transform-gpu",
                            "transition-[opacity,transform] duration-[240ms]",
                            "ease-[cubic-bezier(0.42,0,0.58,1)]",
                            "will-change-[transform,opacity]",
                            mobileOpen
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 -translate-y-2 scale-[0.985] pointer-events-none",
                        ].join(" ")}
                    >
                        <div className="h-11 px-4 flex items-center justify-end border-b border-black/10 dark:border-white/10">
                            <button
                                aria-label="Đóng menu"
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                className="flex h-11 w-11 items-center justify-center text-[#1d1d1f] dark:text-[#f5f5f7] hover:opacity-90"
                            >
                                <span className="text-[18px] leading-none">✕</span>
                            </button>
                        </div>

                        <nav className="px-6 pt-6" aria-label="Mobile global navigation">
                            <ul
                                id="mobile-globalnav-list"
                                className="space-y-4 text-[28px] font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-white"
                            >
                                {navItems.map((item, index) => (
                                    <li
                                        key={item.href}
                                        className={[
                                            "transition-[opacity,transform]",
                                            "duration-[420ms]",
                                            "ease-[cubic-bezier(0.22,0.61,0.36,1)]",
                                            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
                                        ].join(" ")}
                                        style={{
                                            transitionDelay: mobileOpen ? `${index * 38 + 70}ms` : "0ms",
                                        }}
                                    >
                                        <Link href={item.href} onClick={() => setMobileOpen(false)} className="block">
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>

            {/* ================= DESKTOP ================= */}
            <div className="hidden md:block">
                <div
                    onMouseEnter={() => {
                        if (!canHover) return;
                        cancelClose();
                        // nếu đang closing mà hover lại, hủy closing
                        clearCloseTimer();
                        setClosing(false);
                    }}
                    onMouseLeave={() => {
                        if (!canHover) return;
                        // scheduleClose gọi hàm đóng mượt
                        scheduleClose(closeDesktopFlyoutSmooth, 120);
                    }}
                >
                    {/* NAV BAR */}
                    <div className={barClass}>
                        <nav aria-label="Apple global navigation" className={`${DESKTOP_CONTENT} h-11 ${textClass}`}>
                            <ul
                                id="globalnav-list"
                                className={[
                                    "flex h-11 items-stretch justify-between",
                                    "text-[13px] leading-[44px]",
                                    "tracking-[-0.01em]",
                                    "select-none",
                                ].join(" ")}
                            >
                                <li className="flex items-stretch">
                                    <Link
                                        href="/"
                                        aria-label="Apple"
                                        className={`flex h-11 w-11 items-center justify-center ${hoverTextClass} hover:opacity-90`}
                                        onMouseEnter={closeDesktopFlyoutSmooth}
                                        onFocus={closeDesktopFlyoutSmooth}
                                    >
                                        <span className="text-[20px] leading-none"></span>
                                    </Link>
                                </li>

                                {navItems.map((item) => {
                                    const dropdown = hasMenu(item);
                                    const expanded = dropdown ? openKey === item.menuKey : undefined;

                                    return (
                                        <li key={item.href} className="flex items-stretch">
                                            <Link
                                                href={item.href}
                                                className={[
                                                    "flex items-center justify-center",
                                                    "h-11 px-[10px]",
                                                    "transition-opacity duration-150",
                                                    hoverTextClass,
                                                    "opacity-95 hover:opacity-100",
                                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:focus-visible:ring-white/30",
                                                    "focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                                                ].join(" ")}
                                                onMouseEnter={() => {
                                                    if (!canHover) return;
                                                    if (dropdown) openDesktopFlyout(item.menuKey);
                                                    else closeDesktopFlyoutSmooth();
                                                }}
                                                onFocus={() => (dropdown ? openByFocus(item.menuKey) : closeDesktopFlyoutSmooth())}
                                                onClick={closeDesktopFlyoutSmooth}
                                                aria-haspopup={dropdown ? "menu" : undefined}
                                                aria-expanded={expanded}
                                                aria-controls={dropdown ? `globalnav-submenu-${item.menuKey}` : undefined}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}

                                <li className="flex items-stretch">
                                    <button
                                        aria-label="Tìm kiếm"
                                        className={`flex h-11 w-11 items-center justify-center ${hoverTextClass} hover:opacity-90`}
                                        onMouseEnter={closeDesktopFlyoutSmooth}
                                        onFocus={closeDesktopFlyoutSmooth}
                                        type="button"
                                    >
                                        <AppleSearchIcon />
                                    </button>
                                </li>

                                <li className="flex items-stretch">
                                    <button
                                        aria-label="Giỏ hàng"
                                        className={`flex h-11 w-11 items-center justify-center ${hoverTextClass} hover:opacity-90`}
                                        onMouseEnter={closeDesktopFlyoutSmooth}
                                        onFocus={closeDesktopFlyoutSmooth}
                                        type="button"
                                    >
                                        <AppleBagIcon />
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* ✅ OVERLAY: z-index thấp hơn flyout, hover vào là đóng */}
                    {flyoutVisible && (
                        <div
                            className="fixed left-0 right-0 bottom-0 z-[60] bg-black/10 backdrop-blur-[6px]"
                            style={{ top: "44px" }}
                            onMouseEnter={closeDesktopFlyoutSmooth}
                            onPointerEnter={closeDesktopFlyoutSmooth}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                closeDesktopFlyoutSmooth();
                            }}
                            role="presentation"
                            aria-hidden="true"
                        />
                    )}

                    {/* ✅ FLYOUT: đặt vào 1 wrapper fixed để position ổn định + z cao hơn overlay */}
                    {activeMenu && (
                        <div className="fixed left-0 right-0 z-[70]" style={{ top: "44px" }}>
                            <FlyoutMenu
                                open={flyoutVisible} // ✅ đóng/mở đều mượt
                                menu={activeMenu}
                                id={activeId}
                                onNavigate={closeDesktopFlyoutSmooth}
                            />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
