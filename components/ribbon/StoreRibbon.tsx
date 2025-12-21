"use client";

import { usePathname } from "next/navigation";

export default function StoreRibbon() {
    // để animation chạy lại khi đổi route (giống Apple)
    const pathname = usePathname();

    return (
        <div key={pathname} className="dd-holiday-202511-header">
            <div className="dd-container">
                <div className="dd-colors">
                    <div className="dd-color dd-blue" />
                    <div className="dd-color dd-orange" />
                    <div className="dd-color dd-yellow-orange" />
                    <div className="dd-color dd-blue-yellow" />
                </div>
            </div>
        </div>
    );
}
