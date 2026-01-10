// app/store/page.tsx
import StoreRibbon from "@/components/ribbon/StoreRibbon";
import { StoreHome } from "@/pages-ui/store";

export default function StorePage() {
    return (
        <>
            <StoreRibbon />
            {/* <div className="store-container"> */}
            <StoreHome />
            {/* </div> */}
        </>
    );
}
