import type { MenuData } from "../../FlyoutMenu";

export const ipadMenu: MenuData = [
  {
    title: "Khám Phá iPad",
    elevated: true,
    items: [
      { id: "ipad-all", label: "Khám Phá Tất Cả iPad", href: "/ipad" },
      { id: "ipad-pro", label: "iPad Pro", href: "/ipad/ipad-pro" },
      { id: "ipad-air", label: "iPad Air", href: "/ipad/ipad-air" },
      { id: "ipad", label: "iPad", href: "/ipad/ipad" },
      { id: "ipad-mini", label: "iPad mini", href: "/ipad/ipad-mini" },
      { id: "apple-pencil", label: "Apple Pencil", href: "/ipad/apple-pencil" },
      { id: "ipad-keyboards", label: "Bàn Phím", href: "/ipad/keyboards" },

      // dòng “nhỏ”
      { id: "ipad-compare", label: "So Sánh iPad", href: "/ipad/compare" },
    ],
  },
  {
    title: "Mua iPad",
    items: [
      { id: "buy-ipad", label: "Mua iPad", href: "/ipad/buy", strong: true },
      { id: "ipad-accessories", label: "Phụ Kiện iPad", href: "/ipad/accessories", strong: true },
      { id: "trade-in", label: "Trade In", href: "/trade-in", strong: true },
      { id: "financing", label: "Tài Chính", href: "/financing", strong: true },
    ],
  },
  {
    title: "Tìm Hiểu Thêm Về iPad",
    items: [
      { id: "ipad-support", label: "Hỗ Trợ iPad", href: "/support/ipad" },
      { id: "applecare-ipad", label: "AppleCare", href: "/applecare?filter=ipad" },
      { id: "ipados", label: "iPadOS", href: "/ipados" },
      { id: "apple-intelligence", label: "Apple Intelligence", href: "/apple-intelligence" },
      { id: "apps", label: "Các Ứng Dụng Của Apple", href: "/apps" },
      { id: "icloud", label: "iCloud+", href: "/icloud" },
      { id: "education", label: "Giáo Dục", href: "/education" },
    ],
  },
] as const;
