import type { MenuData } from "../../FlyoutMenu";

export const storeMenu: MenuData = [
  {
    title: "Mua Hàng",
    elevated: true,
    items: [
      { id: "gift", label: "Mua Sắm Quà Tặng", href: "/vn/store" },
      { id: "mac", label: "Mac", href: "/vn/shop/buy-mac" },
      { id: "ipad", label: "iPad", href: "/vn/shop/buy-ipad" },
      { id: "iphone", label: "iPhone", href: "/vn/shop/buy-iphone" },
      { id: "watch", label: "Apple Watch", href: "/vn/shop/buy-watch" },
      {
        id: "airpods",
        label: "AirPods",
        href: "/vn/shop/goto/airpods/accessories",
      },
      {
        id: "accessories",
        label: "Phụ Kiện",
        href: "/vn/shop/accessories/all",
      },
    ],
  },
  {
    title: "Liên Kết Nhanh",
    items: [
      {
        id: "order-status",
        label: "Tình Trạng Đơn Hàng",
        href: "/vn/shop/order/list",
        strong: true,
      },
      {
        id: "trade-in",
        label: "Apple Trade In",
        href: "/vn/shop/trade-in",
        strong: true,
      },
      {
        id: "financing",
        label: "Tài Chính",
        href: "/vn/shop/goto/ww/financing",
        strong: true,
      },
    ],
  },
  {
    title: "Mua Tại Cửa Hàng Đặc Biệt",
    items: [
      {
        id: "education",
        label: "Giáo Dục",
        href: "/vn/shop/browse/home/education_routing",
        strong: true,
      },
      {
        id: "business",
        label: "Doanh Nghiệp",
        href: "/vn/retail/business/",
        strong: true,
      },
    ],
  },
] as const;
