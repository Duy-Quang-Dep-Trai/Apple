import Hero from "./Hero";
import LatestProductsShelf from "@/pages-ui/store/LatestProductsShelf";
import ProductNavShelf from "./ProductNavShelf";
import StoreStory from "./StoreStory"
import CreativeShelf from "./CreativeShelf";
// import StoreRibbon from "@/components/ribbon/StoreRibbon";
export default function Home() {
    return (
        <>
            {/* <StoreRibbon /> */}
            <Hero />
            <ProductNavShelf />
            <LatestProductsShelf />
            <StoreStory />
            <CreativeShelf />
        </>
    );
}
