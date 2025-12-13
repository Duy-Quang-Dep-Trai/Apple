import StoreRibbon from "@/components/ribbon/StoreRibbon";
import Main from "@/components/layout/Main";
import Hero from "@/sections/store/Hero/Hero";

export default function Page() {
  return (
    <>
      <StoreRibbon />

      <Main>
        <Hero />
        {/* ProductNav */}
        {/* Shelf */}
        {/* Promo */}
      </Main>
    </>
  );
}
