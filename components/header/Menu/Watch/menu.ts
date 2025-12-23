import type { MenuData } from "../../FlyoutMenu";

export const watchMenu: MenuData = [
  {
    title: "Khám Phá Watch",
    elevated: true,
    items: [
      { id: "watch-all", label: "Khám Phá Tất Cả Apple Watch", href: "/watch" },
      { id: "watch-series-11", label: "Apple Watch Series 11", href: "/watch/series-11" },
      { id: "watch-se-3", label: "Apple Watch SE 3", href: "/watch/se-3" },
      { id: "watch-ultra-3", label: "Apple Watch Ultra 3", href: "/watch/ultra-3" },
      { id: "watch-nike", label: "Apple Watch Nike", href: "/watch/nike" },

      // 2 dòng nhỏ
      { id: "watch-compare", label: "So Sánh Watch", href: "/watch/compare" },
      { id: "watch-why", label: "Tại Sao Nên Dùng Apple Watch", href: "/watch/why-watch" },
    ],
  },
  {
    title: "Mua Watch",
    items: [
      { id: "buy-watch", label: "Mua Apple Watch", href: "/watch/buy", strong: true },
      { id: "watch-bands", label: "Dây Đeo Apple Watch", href: "/watch/bands", strong: true },
      { id: "watch-accessories", label: "Phụ Kiện Apple Watch", href: "/watch/accessories", strong: true },
      { id: "trade-in", label: "Trade In", href: "/trade-in", strong: true },
      { id: "financing", label: "Tài Chính", href: "/financing", strong: true },
    ],
  },
  {
    title: "Tìm Hiểu Thêm Về Watch",
    items: [
      { id: "watch-support", label: "Hỗ Trợ Watch", href: "/support/watch" },
      { id: "watch-applecare", label: "AppleCare", href: "/applecare?filter=watch" },
      { id: "watchos", label: "watchOS", href: "/watchos" },
      { id: "watch-apps", label: "Các Ứng Dụng Của Apple", href: "/apps" },
      { id: "fitness-plus", label: "Fitness+", href: "/fitness-plus" },
    ],
  },
] as const;
