import type { MenuData } from "../../FlyoutMenu";

export const supportMenu: MenuData = [
  {
    title: "Khám Phá Hỗ Trợ",
    elevated: true,
    items: [
      { id: "support-iphone", label: "iPhone", href: "/support/iphone" },
      { id: "support-mac", label: "Mac", href: "/support/mac" },
      { id: "support-ipad", label: "iPad", href: "/support/ipad" },
      { id: "support-watch", label: "Watch", href: "/support/watch" },
      { id: "support-airpods", label: "AirPods", href: "/support/airpods" },
      { id: "support-music", label: "Music", href: "/support/music" },
      { id: "support-tv", label: "TV", href: "/support/tv" },

      // dòng nhỏ cuối giống Apple (không elevated)
      { id: "support-explore", label: "Khám Phá Hỗ Trợ", href: "/support", elevated: false },
    ],
  },
  {
    title: "Trợ Giúp",
    items: [
      { id: "community", label: "Cộng Đồng", href: "/support/community" },
      { id: "check-coverage", label: "Kiểm Tra Bảo Hành", href: "/support/check-coverage" },
      { id: "repair", label: "Sửa Chữa", href: "/support/repair" },
    ],
  },
  {
    title: "Chủ Đề Hữu Ích",
    items: [
      { id: "buy-applecare", label: "Mua AppleCare", href: "/applecare" },
      { id: "apple-account", label: "Tài Khoản và Mật Khẩu Apple", href: "/support/apple-account" },
      { id: "billing", label: "Thanh Toán & Gói Đăng Ký", href: "/support/billing" },
      { id: "accessibility", label: "Trợ Năng", href: "/support/accessibility" },
    ],
  },
] as const;
