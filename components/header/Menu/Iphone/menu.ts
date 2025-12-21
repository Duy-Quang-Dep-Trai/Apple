// components/header/Menu/iPhone/menu.ts
import type { MenuData } from "../../FlyoutMenu";

export const iphoneMenu: MenuData = [
  {
    title: "Khám Phá iPhone",
    elevated: true,
    items: [
      { id: "iphone-explore-all", label: "Khám Phá Tất Cả iPhone", href: "https://www.apple.com/vn/iphone/" },
      { id: "iphone-17-pro", label: "iPhone 17 Pro", href: "https://www.apple.com/vn/iphone-17-pro/" },
      { id: "iphone-air", label: "iPhone Air", href: "https://www.apple.com/vn/iphone-air/" },
      { id: "iphone-17", label: "iPhone 17", href: "https://www.apple.com/vn/iphone-17/" },
      { id: "iphone-16", label: "iPhone 16", href: "https://www.apple.com/vn/shop/goto/buy_iphone/iphone_16" },
      { id: "iphone-16e", label: "iPhone 16e", href: "https://www.apple.com/vn/iphone-16e/" },

      // 2 dòng “nhỏ” cuối (Apple style)
      { id: "iphone-compare", label: "So Sánh iPhone", href: "https://www.apple.com/vn/iphone/compare/" },
      { id: "iphone-switch-android", label: "Chuyển Từ Android", href: "https://www.apple.com/vn/iphone/switch/" },
    ],
  },
  {
    title: "Mua iPhone",
    items: [
      { id: "shop-buy-iphone", label: "Mua iPhone", href: "https://www.apple.com/vn/shop/buy-iphone", strong: true },
      { id: "shop-iphone-accessories", label: "Phụ Kiện iPhone", href: "https://www.apple.com/vn/shop/iphone/accessories", strong: true },
      { id: "shop-trade-in", label: "Apple Trade In", href: "https://www.apple.com/vn/shop/trade-in", strong: true },
      { id: "shop-financing", label: "Tài Chính", href: "https://www.apple.com/vn/shop/goto/ww/financing", strong: true },
    ],
  },
  {
    title: "Tìm Hiểu Thêm Về iPhone",
    items: [
      { id: "iphone-support", label: "Hỗ Trợ iPhone", href: "https://support.apple.com/vi-vn/iphone?cid=gn-ols-iphone-psp-prodfly" },
      { id: "iphone-applecare", label: "AppleCare", href: "https://www.apple.com/vn/applecare/?filter=iphone" },
      { id: "ios", label: "iOS 26", href: "https://www.apple.com/vn/os/ios/" },
      { id: "apple-intelligence", label: "Apple Intelligence", href: "https://www.apple.com/vn/apple-intelligence/" },
      { id: "apps", label: "Các Ứng Dụng Của Apple", href: "https://www.apple.com/vn/apps/" },
      { id: "iphone-privacy", label: "Quyền Riêng Tư Trên iPhone", href: "https://www.apple.com/vn/privacy/" },
      { id: "continuity", label: "Tuyệt vời hơn với Mac", href: "https://www.apple.com/vn/macos/continuity/" },
      { id: "icloud", label: "iCloud+", href: "https://www.apple.com/vn/icloud/" },
      { id: "apple-pay", label: "Ví, Pay", href: "https://www.apple.com/vn/apple-pay/" },
      { id: "siri", label: "Siri", href: "https://www.apple.com/vn/siri/" },
    ],
  },
] as const;
