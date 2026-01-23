// "use client";

// import { motion } from "framer-motion";
// import type { Transition } from "framer-motion";
// import { fadeIn, type Direction } from "@/variants";
// import type { ReactNode } from "react";
// import { useEffect, useState } from "react";
// import { useMotionSettings } from "@/hooks/useMotionSettings";

// type MotionFadeProps = {
//   children: ReactNode;
//   direction?: Direction;
//   delay?: number;
//   className?: string;
//   durationHidden?: number;
//   durationShow?: number;
//   easeHidden?: Transition["ease"];
//   easeShow?: Transition["ease"];
// };

// export function MotionFade({
//   children,
//   direction = "up",
//   delay = 0,
//   className = "",
//   durationHidden,
//   durationShow,
//   easeHidden,
//   easeShow,
// }: MotionFadeProps) {
//   const { shouldReduceMotion } = useMotionSettings();

//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return <div className={className}>{children}</div>;
//   }

//   if (shouldReduceMotion) {
//     return (
//       <motion.div className={className} initial={false} animate={false}>
//         {children}
//       </motion.div>
//     );
//   }

//   const variants = fadeIn(direction, {
//     delay,
//     durationHidden,
//     durationShow,
//     easeHidden,
//     easeShow,
//   });

//   return (
//     <motion.div
//       initial="hidden"
//       animate="show"
//       exit="hidden"
//       variants={variants}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }
