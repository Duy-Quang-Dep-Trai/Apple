import type { MenuData } from "../../FlyoutMenu";

export const tvHomeMenu: MenuData = [
  {
    title: "Khám Phá TV & Nhà",
    elevated: true,
    items: [
      { id: "tv-home", label: "Khám Phá TV & Nhà", href: "/tv-home" },
      { id: "apple-tv-4k", label: "Apple TV 4K", href: "/tv-home/apple-tv-4k" },
    ],
  },
  {
    title: "Mua TV & Nhà",
    items: [
      { id: "buy-apple-tv-4k", label: "Mua Apple TV 4K", href: "/tv-home/buy/apple-tv-4k", strong: true },
      { id: "shop-tv-home-accessories", label: "Mua Phụ Kiện TV & Nhà", href: "/tv-home/accessories", strong: true },
    ],
  },
  {
    title: "Tìm Hiểu Thêm Về TV & Nhà",
    items: [
      { id: "support-apple-tv", label: "Hỗ Trợ Apple TV", href: "/support/apple-tv" },
      { id: "applecare-tv", label: "AppleCare cho Apple TV", href: "/applecare?filter=tv" },
      { id: "apple-tv-app", label: "Ứng Dụng Apple TV", href: "/tv-home/apple-tv-app" },
      { id: "apple-tv", label: "Apple TV", href: "/tv-home/apple-tv" },
      { id: "apple-music", label: "Apple Music", href: "/music" },
      { id: "siri", label: "Siri", href: "/siri" },
      { id: "airplay", label: "AirPlay", href: "/airplay" },
    ],
  },
] as const;
