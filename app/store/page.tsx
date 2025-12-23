import StoreRibbon from "@/components/ribbon/StoreRibbon";
import Main from "@/components/layout/Main";
import Hero from "@/pages-ui/store/Hero";

export default function StorePage() {
    return (
        <>
            <StoreRibbon />
            <Main>
                <Hero />
            </Main>
        </>
    );
}
