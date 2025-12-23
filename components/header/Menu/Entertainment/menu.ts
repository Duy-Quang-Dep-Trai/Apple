import type { MenuData } from "../../FlyoutMenu";

export const entertainmentMenu: MenuData = [
  {
    title: "Khám Phá Giải Trí",
    elevated: true,
    items: [
      { id: "services", label: "Khám Phá Giải Trí", href: "/entertainment" },
      { id: "apple-one", label: "Apple One", href: "/entertainment/apple-one" },
      { id: "apple-tv", label: "Apple TV", href: "/entertainment/apple-tv" },
      { id: "apple-music", label: "Apple Music", href: "/music" },
      { id: "apple-arcade", label: "Apple Arcade", href: "/entertainment/apple-arcade" },
      { id: "fitness-plus", label: "Apple Fitness+", href: "/fitness-plus" },
      { id: "podcasts", label: "Apple Podcasts", href: "/entertainment/podcasts" },
      { id: "books", label: "Apple Books", href: "/entertainment/books" },
      { id: "app-store", label: "App Store", href: "/app-store" },
    ],
  },
  {
    title: "Hỗ Trợ",
    items: [
      { id: "support-tv", label: "Hỗ Trợ Apple TV", href: "/support/apple-tv" },
      { id: "support-music", label: "Hỗ Trợ Apple Music", href: "/support/apple-music" },
    ],
  },
] as const;
