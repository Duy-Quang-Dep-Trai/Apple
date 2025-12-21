// components/header/Menu/iPad/menu.ts
import type { MenuData } from "../../FlyoutMenu";

export const ipadMenu: MenuData = [
  {
    title: "Khám Phá iPad",
    elevated: true,
    items: [
      { id: "ipad-all", label: "Khám Phá Tất Cả iPad", href: "/vn/ipad/" },
      { id: "ipad-pro", label: "iPad Pro", href: "/vn/ipad-pro/" },
      { id: "ipad-air", label: "iPad Air", href: "/vn/ipad-air/" },
      { id: "ipad", label: "iPad", href: "/vn/ipad-11/" },
      { id: "ipad-mini", label: "iPad mini", href: "/vn/ipad-mini/" },
      { id: "apple-pencil", label: "Apple Pencil", href: "/vn/apple-pencil/" },
      { id: "ipad-keyboards", label: "Bàn Phím", href: "/vn/ipad-keyboards/" },

      // 👇 item thường (font nhỏ hơn, giống Apple)
      {
        id: "ipad-compare",
        label: "So Sánh iPad",
        href: "/vn/ipad/compare/",
      },
    ],
  },
  {
    title: "Mua iPad",
    items: [
      { id: "buy-ipad", label: "Mua iPad", href: "/vn/shop/buy-ipad", strong: true },
      { id: "ipad-accessories", label: "Phụ Kiện iPad", href: "/vn/shop/ipad/accessories", strong: true },
      { id: "trade-in", label: "Apple Trade In", href: "/vn/shop/trade-in", strong: true },
      { id: "financing", label: "Tài Chính", href: "/vn/shop/goto/ww/financing", strong: true },
    ],
  },
  {
    title: "Tìm Hiểu Thêm Về iPad",
    items: [
      {
        id: "ipad-support",
        label: "Hỗ Trợ iPad",
        href: "https://support.apple.com/vi-vn/ipad",
      },
      { id: "applecare-ipad", label: "AppleCare", href: "/vn/applecare/?filter=ipad" },
      { id: "ipados", label: "iPadOS 26", href: "/vn/os/ipados/" },
      { id: "apple-intelligence", label: "Apple Intelligence", href: "/vn/apple-intelligence/" },
      { id: "apps", label: "Các Ứng Dụng Của Apple", href: "/vn/apps/" },
      { id: "icloud", label: "iCloud+", href: "/vn/icloud/" },
      { id: "education", label: "Giáo Dục", href: "/vn/education/" },
    ],
  },
] as const;
