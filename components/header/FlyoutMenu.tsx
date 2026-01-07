"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

export type MenuItem = {
  id: string;
  label: string;
  href: string;
  strong?: boolean;
  // item có thể override elevated dù group elevated
  elevated?: boolean;
};

export type MenuGroup = {
  title: string;
  elevated?: boolean;
  items: readonly MenuItem[];
};

export type MenuData = readonly MenuGroup[];

export default function FlyoutMenu({
  open,
  menu,
  id,
  onNavigate,
}: {
  open: boolean;
  menu: MenuData;
  id?: string;
  onNavigate?: () => void;
}) {
  // Apple-like constants
  const MAX_WIDTH = 1024;
  const PADDING_TOP = 40;
  const PADDING_BOTTOM = 84;
  const PADDING_X = 22;

  // Bạn có thể tinh chỉnh 3 giá trị này để ra “đúng khoảng cách Apple”
  // (đây là cấu hình rất gần với ảnh bạn gửi)
  const GRID = useMemo(
    () => ({
      col1: 260,
      col2: 220,
      col3: 260,
      gap: 68,
    }),
    []
  );

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [measuredHeight, setMeasuredHeight] = useState<number>(0);

  const measure = () => {
    const el = wrapRef.current;
    if (!el) return;
    // đo chiều cao nội dung thật để animate height
    setMeasuredHeight(el.scrollHeight);
  };

  useLayoutEffect(() => {
    if (open) measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, menu]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Stagger index giống Apple
  let idx = 0;

  return (
    <div
      id={id}
      className={[
        "globalnav-flyout globalnav-submenu",
        "absolute left-0 right-0 z-50",
        "bg-[#f5f5f7]/95 dark:bg-[#1d1d1f]/95 backdrop-blur-xl",
        "shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)]",
        "overflow-hidden",
      ].join(" ")}
      aria-hidden={!open}
      style={{
        height: open ? measuredHeight : 0,
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0px)" : "translateY(-6px)",
        transitionProperty: "height, opacity, transform",
        transitionDuration: open ? "520ms" : "520ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        ref={wrapRef}
        className="mx-auto"
        style={{
          width: MAX_WIDTH,
          maxWidth: "100%",
          paddingTop: PADDING_TOP,
          paddingBottom: PADDING_BOTTOM,
          paddingLeft: PADDING_X,
          paddingRight: PADDING_X,
        }}
      >
        {/* GRID layout thay vì absolute */}
        <div
          className="grid items-start"
          style={{
            gridTemplateColumns:
              menu.length >= 3
                ? `${GRID.col1}px ${GRID.col2}px ${GRID.col3}px`
                : menu.length === 2
                  ? `${GRID.col1}px ${GRID.col2 + GRID.col3}px`
                  : "1fr",
            columnGap: GRID.gap,
          }}
        >
          {menu.map((group) => {
            const headerIndex = idx++;

            return (
              <div key={group.title} className="min-w-0">
                <h2
                  className={[
                    "text-[12px] font-medium text-[#6e6e73] dark:text-[#86868b]",
                    "transition-[opacity,transform] duration-[520ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                  ].join(" ")}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0px)" : "translateY(-6px)",
                    transitionDelay: `${headerIndex * 22}ms`,
                  }}
                >
                  {group.title}
                </h2>

                <ul className="mt-[14px] space-y-[10px]">
                  {group.items.map((it) => {
                    const itemIndex = idx++;
                    const isElevatedItem = it.elevated ?? group.elevated ?? false;

                    const typo = isElevatedItem
                      ? "text-[24px] leading-[1.12] tracking-[-0.02em] font-semibold text-[#1d1d1f] dark:text-white"
                      : it.strong
                        ? "text-[12px] leading-[1.45] font-semibold text-[#1d1d1f] dark:text-white"
                        : "text-[12px] leading-[1.45] font-medium text-[#6e6e73] dark:text-[#86868b]";

                    return (
                      <li key={it.id}>
                        <a
                          href={it.href}
                          onClick={onNavigate}   // 👈 CHỖ QUAN TRỌNG
                          className={[
                            "block min-w-0",
                            "transition-[opacity,transform] duration-[520ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                            typo,
                          ].join(" ")}
                          style={{
                            opacity: open ? 1 : 0,
                            transform: open ? "translateY(0px)" : "translateY(-6px)",
                            transitionDelay: `${itemIndex * 22}ms`,
                            wordBreak: "break-word",
                          }}
                        >
                          {it.label}
                        </a>

                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
