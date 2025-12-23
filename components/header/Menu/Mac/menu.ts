import type { MenuData } from "../../FlyoutMenu";

export const macMenu: MenuData = [
  {
    title: "Khám Phá Mac",
    elevated: true,
    items: [
      { id: "mac-all", label: "Khám Phá Tất Cả Mac", href: "/mac" },
      { id: "macbook-air", label: "MacBook Air", href: "/mac/macbook-air" },
      { id: "macbook-pro", label: "MacBook Pro", href: "/mac/macbook-pro" },
      { id: "imac", label: "iMac", href: "/mac/imac" },
      { id: "mac-mini", label: "Mac mini", href: "/mac/mac-mini" },
      { id: "mac-studio", label: "Mac Studio", href: "/mac/mac-studio" },
      { id: "mac-pro", label: "Mac Pro", href: "/mac/mac-pro" },
      { id: "displays", label: "Màn Hình", href: "/mac/displays" },

      // 2 dòng “nhỏ” cuối (Apple style)
      // 2 dòng “nhỏ” cuối (Apple style) -> override
      { id: "compare", label: "So Sánh Mac", href: "/mac/compare", elevated: false },
      { id: "switch", label: "Chuyển Từ PC Sang Mac", href: "/mac/switch", elevated: false },

    ],
  },
  {
    title: "Mua Mac",
    items: [
      { id: "buy-mac", label: "Mua Mac", href: "/mac/buy", strong: true },
      { id: "mac-accessories", label: "Phụ Kiện Mac", href: "/mac/accessories", strong: true },
      { id: "trade-in", label: "Trade In", href: "/trade-in", strong: true },
      { id: "financing", label: "Tài Chính", href: "/financing", strong: true },
    ],
  },
  {
    title: "Tìm Hiểu Thêm Về Mac",
    items: [
      { id: "support", label: "Hỗ Trợ Mac", href: "/support/mac" },
      { id: "applecare", label: "AppleCare", href: "/applecare?filter=mac" },
      { id: "macos", label: "macOS", href: "/macos" },
      { id: "intelligence", label: "Apple Intelligence", href: "/apple-intelligence" },
      { id: "apps", label: "Các Ứng Dụng Của Apple", href: "/apps" },
      { id: "continuity", label: "Tuyệt vời hơn với iPhone", href: "/continuity" },
      { id: "icloud", label: "iCloud+", href: "/icloud" },
      { id: "business", label: "Mac Cho Doanh Nghiệp", href: "/business/mac" },
      { id: "education", label: "Giáo Dục", href: "/education" },
    ],
  },
] as const;
