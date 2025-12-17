"use client";

import type { CSSProperties } from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

export type MenuItem = {
  id: string; // ✅ dùng để key unique
  label: string;
  href: string;
  strong?: boolean;
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
}: {
  open: boolean;
  menu: MenuData;
  id?: string;
}) {
  // ✅ giữ nguyên columns “pixel” của bạn
  const columns = useMemo(
    () =>
      [
        { left: 0, width: 360 },
        { left: 295, width: 220 },
        { left: 455, width: 260 },
      ] as const,
    []
  );

  // ✅ padding chuẩn Apple bạn đang dùng
  const PADDING_TOP = 40;
  const PADDING_BOTTOM = 84;
  const PADDING_X = 22;

  // ✅ đo chiều cao thật (max height của các cột absolute) để nền kéo đúng
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const colRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [measuredHeight, setMeasuredHeight] = useState<number>(0);

  const measure = () => {
    // cột là absolute => phải đo từng cột
    const heights = colRefs.current.map((el) => (el ? el.scrollHeight : 0));
    const maxCol = Math.max(0, ...heights);

    // height tổng = paddingTop + content + paddingBottom
    const total = PADDING_TOP + maxCol + PADDING_BOTTOM;
    setMeasuredHeight(total);
  };

  // đo ngay khi mở / menu đổi
  useLayoutEffect(() => {
    if (open) measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, menu]);

  // đo lại khi resize
  useEffect(() => {
    if (!open) return;

    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ResizeObserver: theo dõi wrap (font load, content render, v.v.)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      if (open) measure();
    });

    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // index để stagger chữ (giống Apple dùng item-number)
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
        transitionDuration: open ? "320ms" : "220ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      {/* wrap để ResizeObserver bám, bên trong là content thật */}
      <div ref={wrapRef}>
        <div
          className="mx-auto"
          style={{
            width: 1024,
            maxWidth: "100%",
            paddingTop: PADDING_TOP,
            paddingBottom: PADDING_BOTTOM,
            paddingLeft: PADDING_X,
            paddingRight: PADDING_X,
          }}
        >
          {/* container relative để “đặt cột” */}
          <div className="relative">
            {menu.map((group, gi) => {
              const col = columns[gi] ?? columns[0];
              const headerIndex = idx++;

              return (
                <div
                  key={group.title}
                  ref={(el) => {
                    colRefs.current[gi] = el;
                  }}
                  className="absolute top-0"
                  style={{ left: col.left, width: col.width }}
                >
                  <h2
                    className={[
                      "globalnav-submenu-header",
                      "globalnav-flyout-item",
                      "text-[12px] font-medium text-[#6e6e73] dark:text-[#86868b]",
                    ].join(" ")}
                    style={
                      { ["--item-index" as any]: headerIndex } as CSSProperties
                    }
                  >
                    {group.title}
                  </h2>

                  <ul className="mt-[14px] space-y-[10px]">
                    {group.items.map((it) => {
                      const itemIndex = idx++;

                      return (
                        <li
                          key={`${group.title}__${it.id}`} // ✅ FIX: key unique, không còn trùng href
                          style={
                            { ["--item-index" as any]: itemIndex } as CSSProperties
                          }
                        >
                          <a
                            href={it.href}
                            className={[
                              "globalnav-submenu-link globalnav-flyout-item block",
                              group.elevated
                                ? "text-[24px] leading-[1.12] tracking-[-0.02em] font-semibold text-[#1d1d1f] dark:text-white"
                                : it.strong
                                  ? "text-[12px] leading-[1.45] font-semibold text-[#1d1d1f] dark:text-white"
                                  : "text-[12px] leading-[1.45] font-medium text-[#6e6e73] dark:text-[#86868b]",
                            ].join(" ")}
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

      {/* ✅ giữ đúng “mượt Apple”: stagger chữ rơi dần */}
      <style jsx global>{`
        .globalnav-flyout-item {
          opacity: 0;
          transform: translateY(-6px);
          transition-property: opacity, transform;
          transition-duration: 520ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: calc(var(--item-index, 0) * 22ms);
          will-change: opacity, transform;
        }

        .globalnav-flyout.globalnav-submenu[aria-hidden="false"]
          .globalnav-flyout-item {
          opacity: 1;
          transform: translateY(0px);
        }
      `}</style>
    </div>
  );
}
