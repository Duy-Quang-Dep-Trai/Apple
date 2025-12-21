// components/header/Menu/Mac/menu.ts
import type { MenuData } from "../../FlyoutMenu";

export const macMenu: MenuData = [
  {
    title: "Khám Phá Mac",
    elevated: true,
    items: [
  { id: "explore-all", label: "Khám Phá Tất Cả Mac", href: "/vn/mac/" },
  { id: "macbook-air", label: "MacBook Air", href: "/vn/macbook-air/" },
  { id: "macbook-pro", label: "MacBook Pro", href: "/vn/macbook-pro/" },
  { id: "imac", label: "iMac", href: "/vn/imac/" },
  { id: "mac-mini", label: "Mac mini", href: "/vn/mac-mini/" },
  { id: "mac-studio", label: "Mac Studio", href: "/vn/mac-studio/" },
  { id: "mac-pro", label: "Mac Pro", href: "/vn/mac-pro/" },
  { id: "displays", label: "Màn Hình", href: "/vn/displays/" },

  // ✅ 2 dòng này “nhỏ” như Apple
  { id: "compare", label: "So Sánh Mac", href: "/vn/mac/compare/", elevated: false },
  { id: "switch", label: "Chuyển Từ PC Sang Mac", href: "/vn/mac/mac-does-that/", elevated: false },
],

  },
  {
    title: "Mua Mac",
    items: [
      {
        id: "buy-mac",
        label: "Mua Mac",
        href: "/vn/shop/buy-mac",
        strong: true,
      },
      {
        id: "mac-accessories",
        label: "Phụ Kiện Mac",
        href: "/vn/shop/mac/accessories",
        strong: true,
      },
      {
        id: "trade-in",
        label: "Apple Trade In",
        href: "/vn/shop/trade-in",
        strong: true,
      },
      {
        id: "financing",
        label: "Tài Chính",
        href: "/vn/shop/goto/ww/financing",
        strong: true,
      },
    ],
  },
  {
    title: "Tìm Hiểu Thêm Về Mac",
    items: [
      {
        id: "support",
        label: "Hỗ Trợ Mac",
        href: "https://support.apple.com/vi-vn/mac?cid=gn-ols-mac-psp-prodfly",
      },
      { id: "applecare", label: "AppleCare", href: "/vn/applecare/?filter=mac" },
      { id: "macos", label: "macOS Tahoe", href: "/vn/os/macos/" },
      {
        id: "intelligence",
        label: "Apple Intelligence",
        href: "/vn/apple-intelligence/",
      },
      { id: "apps", label: "Các Ứng Dụng Của Apple", href: "/vn/apps/" },
      {
        id: "continuity",
        label: "Tuyệt vời hơn với iPhone",
        href: "/vn/macos/continuity/",
      },
      { id: "icloud", label: "iCloud+", href: "/vn/icloud/" },
      { id: "business", label: "Mac Cho Doanh Nghiệp", href: "/vn/business/mac/" },
      { id: "education", label: "Giáo Dục", href: "/vn/education/" },
    ],
  },
] as const;
