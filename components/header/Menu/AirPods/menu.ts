import type { MenuData } from "../../FlyoutMenu";

export const airpodsMenu: MenuData = [
  {
    title: "Khám Phá AirPods",
    elevated: true,
    items: [
      { id: "airpods-all", label: "Khám Phá Tất Cả AirPods", href: "/airpods" },
      { id: "airpods-4", label: "AirPods 4", href: "/airpods/airpods-4" },
      { id: "airpods-pro", label: "AirPods Pro", href: "/airpods/airpods-pro" },
      { id: "airpods-max", label: "AirPods Max", href: "/airpods/airpods-max" },

      // ✅ DÒNG NHỎ – override elevated
      {
        id: "airpods-compare",
        label: "So Sánh AirPods",
        href: "/airpods/compare",
        elevated: false,
      },
    ],
  },
  {
    title: "Mua AirPods",
    items: [
      { id: "buy-airpods", label: "Mua AirPods", href: "/airpods/buy", strong: true },
      { id: "airpods-accessories", label: "Phụ Kiện AirPods", href: "/airpods/accessories", strong: true },
    ],
  },
  {
    title: "Tìm Hiểu Thêm Về AirPods",
    items: [
      { id: "airpods-support", label: "Hỗ Trợ AirPods", href: "/support/airpods" },
      { id: "applecare-headphones", label: "AppleCare", href: "/applecare?filter=headphones" },
      { id: "hearing-health", label: "Sức Khỏe Thính Giác", href: "/airpods/hearing-health" },
      { id: "apple-music", label: "Apple Music", href: "/music" },
      { id: "fitness-plus", label: "Apple Fitness+", href: "/fitness-plus" },
    ],
  },
] as const;
