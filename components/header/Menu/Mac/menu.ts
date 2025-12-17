// components/header/Menu/Mac/menu.ts
import type { MenuData } from "../../FlyoutMenu";

export const macMenu: MenuData = [
  {
    title: "Khám Phá Mac",
    elevated: true,
    items: [
      { label: "Khám Phá Tất Cả Mac", href: "/vn/mac/" },
      { label: "MacBook Air", href: "/vn/macbook-air/" },
      { label: "MacBook Pro", href: "/vn/macbook-pro/" },
      { label: "iMac", href: "/vn/imac/" },
      { label: "Mac mini", href: "/vn/mac-mini/" },
      { label: "Mac Studio", href: "/vn/mac-studio/" },
      { label: "Mac Pro", href: "/vn/mac-pro/" },
      { label: "Màn Hình", href: "/vn/displays/" },
      { label: "So Sánh Mac", href: "/vn/mac/compare/" },
      { label: "Chuyển Từ PC Sang Mac", href: "/vn/mac/mac-does-that/" },

      { label: "So Sánh Mac", href: "/vn/mac/compare/", elevated: false },
      { label: "Chuyển Từ PC Sang Mac", href: "/vn/mac/mac-does-that/", elevated: false },
    ],
  },
  {
    title: "Mua Mac",
    items: [
      { label: "Mua Mac", href: "/vn/shop/buy-mac", strong: true },
      { label: "Phụ Kiện Mac", href: "/vn/shop/mac/accessories", strong: true },
      { label: "Apple Trade In", href: "/vn/shop/trade-in", strong: true },
      { label: "Tài Chính", href: "/vn/shop/goto/ww/financing", strong: true },
    ],
  },
  {
    title: "Tìm Hiểu Thêm Về Mac",
    items: [
      { label: "Hỗ Trợ Mac", href: "https://support.apple.com/vi-vn/mac?cid=gn-ols-mac-psp-prodfly" },
      { label: "AppleCare", href: "/vn/applecare/?filter=mac" },
      { label: "macOS Tahoe", href: "/vn/os/macos/" },
      { label: "Apple Intelligence", href: "/vn/apple-intelligence/" },
      { label: "Các Ứng Dụng Của Apple", href: "/vn/apps/" },
      { label: "Tuyệt vời hơn với iPhone", href: "/vn/macos/continuity/" },
      { label: "iCloud+", href: "/vn/icloud/" },
      { label: "Mac Cho Doanh Nghiệp", href: "/vn/business/mac/" },
      { label: "Giáo Dục", href: "/vn/education/" },
    ],
  },
] as const;
