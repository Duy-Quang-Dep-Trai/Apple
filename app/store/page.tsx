import StoreRibbon from "@/components/ribbon/StoreRibbon";
import Main from "@/components/layout/Main";
import { StoreHome } from "@/pages-ui/store";

export default function StorePage() {
    return (
        <>
            <StoreRibbon />
            <Main>
                <StoreHome />
            </Main>
        </>
    );
}
