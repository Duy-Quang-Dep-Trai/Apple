import type { MenuData } from "../../FlyoutMenu";

export const accessoriesMenu: MenuData = [
  {
    title: "Mua Phụ Kiện",
    elevated: true,
    items: [
      { id: "acc-all", label: "Mua Tất Cả Phụ Kiện", href: "/accessories" },
      { id: "acc-mac", label: "Mac", href: "/accessories/mac" },
      { id: "acc-ipad", label: "iPad", href: "/accessories/ipad" },
      { id: "acc-iphone", label: "iPhone", href: "/accessories/iphone" },
      { id: "acc-watch", label: "Apple Watch", href: "/accessories/watch" },
      { id: "acc-airpods", label: "AirPods", href: "/accessories/airpods" },
      { id: "acc-tvhome", label: "TV & Nhà", href: "/accessories/tv-home" },
    ],
  },
  {
    title: "Khám Phá Phụ Kiện",
    items: [
      { id: "made-by-apple", label: "Sản Xuất Bởi Apple", href: "/accessories/made-by-apple" },
      { id: "beats", label: "Beats", href: "/accessories/beats" },
      { id: "airtag", label: "AirTag", href: "/airtag" },
    ],
  },
] as const;
