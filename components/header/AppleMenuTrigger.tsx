// "use client";

// import { useEffect, useRef } from "react";

// /**
//  * Apple-like menu trigger (hamburger ↔ close) using SVG polyline animations.
//  * Only controls the icon animation + accessibility label.
//  *
//  * Usage:
//  *  <AppleMenuTrigger isOpen={mobileOpen} onToggle={() => setMobileOpen(v => !v)} />
//  */
// export default function AppleMenuTrigger({
//     isOpen,
//     onToggle,
// }: {
//     isOpen: boolean;
//     onToggle: () => void;
// }) {
//     const openTopRef = useRef<SVGAnimateElement | null>(null);
//     const openBottomRef = useRef<SVGAnimateElement | null>(null);
//     const closeTopRef = useRef<SVGAnimateElement | null>(null);
//     const closeBottomRef = useRef<SVGAnimateElement | null>(null);

//     // When state changes, play the corresponding SVG animations
//     useEffect(() => {
//         if (isOpen) {
//             openTopRef.current?.beginElement();
//             openBottomRef.current?.beginElement();
//         } else {
//             closeTopRef.current?.beginElement();
//             closeBottomRef.current?.beginElement();
//         }
//     }, [isOpen]);

//     return (
//         <button
//             type="button"
//             aria-label={isOpen ? "Đóng menu" : "Menu"}
//             onClick={onToggle}
//             className="flex h-8 w-8 items-center justify-center hover:opacity-80"
//         >
//             <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
//                 <polyline
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     points="2 12, 16 12"
//                 >
//                     {/* Open */}
//                     <animate
//                         ref={(el) => {
//                             openBottomRef.current = el as SVGAnimateElement | null;
//                         }}
//                         attributeName="points"
//                         keyTimes="0;0.5;1"
//                         dur="0.24s"
//                         begin="indefinite"
//                         fill="freeze"
//                         calcMode="spline"
//                         keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
//                         values="2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5"
//                     />
//                     {/* Close */}
//                     <animate
//                         ref={(el) => {
//                             closeBottomRef.current = el as SVGAnimateElement | null;
//                         }}
//                         attributeName="points"
//                         keyTimes="0;0.5;1"
//                         dur="0.24s"
//                         begin="indefinite"
//                         fill="freeze"
//                         calcMode="spline"
//                         keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
//                         values="3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12"
//                     />
//                 </polyline>

//                 <polyline
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     points="2 5, 16 5"
//                 >
//                     {/* Open */}
//                     <animate
//                         ref={(el) => {
//                             openTopRef.current = el as SVGAnimateElement | null;
//                         }}
//                         attributeName="points"
//                         keyTimes="0;0.5;1"
//                         dur="0.24s"
//                         begin="indefinite"
//                         fill="freeze"
//                         calcMode="spline"
//                         keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
//                         values="2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15"
//                     />
//                     {/* Close */}
//                     <animate
//                         ref={(el) => {
//                             closeTopRef.current = el as SVGAnimateElement | null;
//                         }}
//                         attributeName="points"
//                         keyTimes="0;0.5;1"
//                         dur="0.24s"
//                         begin="indefinite"
//                         fill="freeze"
//                         calcMode="spline"
//                         keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
//                         values="3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5"
//                     />
//                 </polyline>
//             </svg>
//         </button>
//     );
// }
