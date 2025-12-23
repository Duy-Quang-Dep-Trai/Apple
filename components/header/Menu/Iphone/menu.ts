import type { MenuData } from "../../FlyoutMenu";

export const iphoneMenu: MenuData = [
  {
    title: "Khám Phá iPhone",
    elevated: true,
    items: [
      { id: "iphone-all", label: "Khám Phá Tất Cả iPhone", href: "/iphone" },
      { id: "iphone-17-pro", label: "iPhone 17 Pro", href: "/iphone/iphone-17-pro" },
      { id: "iphone-air", label: "iPhone Air", href: "/iphone/iphone-air" },
      { id: "iphone-17", label: "iPhone 17", href: "/iphone/iphone-17" },
      { id: "iphone-16", label: "iPhone 16", href: "/iphone/iphone-16" },
      { id: "iphone-16e", label: "iPhone 16e", href: "/iphone/iphone-16e" },

      // 2 dòng “nhỏ”
      { id: "iphone-compare", label: "So Sánh iPhone", href: "/iphone/compare" },
      { id: "iphone-switch-android", label: "Chuyển Từ Android", href: "/iphone/switch" },
    ],
  },
  {
    title: "Mua iPhone",
    items: [
      { id: "buy-iphone", label: "Mua iPhone", href: "/iphone/buy", strong: true },
      { id: "iphone-accessories", label: "Phụ Kiện iPhone", href: "/iphone/accessories", strong: true },
      { id: "trade-in", label: "Trade In", href: "/trade-in", strong: true },
      { id: "financing", label: "Tài Chính", href: "/financing", strong: true },
    ],
  },
  {
    title: "Tìm Hiểu Thêm Về iPhone",
    items: [
      { id: "iphone-support", label: "Hỗ Trợ iPhone", href: "/support/iphone" },
      { id: "iphone-applecare", label: "AppleCare", href: "/applecare?filter=iphone" },
      { id: "ios", label: "iOS", href: "/ios" },
      { id: "apple-intelligence", label: "Apple Intelligence", href: "/apple-intelligence" },
      { id: "apps", label: "Các Ứng Dụng Của Apple", href: "/apps" },
      { id: "iphone-privacy", label: "Quyền Riêng Tư Trên iPhone", href: "/privacy/iphone" },
      { id: "continuity", label: "Tuyệt vời hơn với Mac", href: "/continuity" },
      { id: "icloud", label: "iCloud+", href: "/icloud" },
      { id: "apple-pay", label: "Ví, Pay", href: "/wallet" },
      { id: "siri", label: "Siri", href: "/siri" },
    ],
  },
] as const;
