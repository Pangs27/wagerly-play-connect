import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RewardItem {
  name: string;
  cost: number;
}

interface RewardsHoverTickerProps {
  items?: string[];
  speedMs?: number;
  dotColor?: string;
  onSelect?: (item: string) => void;
}

const defaultItems = [
  "Coins",
  "Skins",
  "Boosts",
  "Badges",
  "Power-Ups",
  "Mystery Box",
  "VIP Pass",
];

const mockCosts: Record<string, number> = {
  Coins: 0,
  Skins: 500,
  Boosts: 250,
  Badges: 100,
  "Power-Ups": 300,
  "Mystery Box": 1000,
  "VIP Pass": 2500,
};

const RewardItem = ({
  item,
  cost,
  onSelect,
  index,
}: {
  item: string;
  cost: number;
  onSelect?: (item: string) => void;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            ref={itemRef}
            className="relative inline-block cursor-pointer select-none"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={() => onSelect?.(item)}
            onFocus={() => setIsHovered(true)}
            onBlur={handleMouseLeave}
            tabIndex={0}
            role="button"
            aria-label={`Redeem ${item} for ${cost} coins`}
            animate={{
              opacity: isHovered ? 1 : 0.4,
              scale: isHovered ? 1.06 : 1,
              y: isHovered ? -4 : 0,
            }}
            style={{
              rotateX: isHovered ? rotateX : 0,
              rotateY: isHovered ? rotateY : 0,
              transformStyle: "preserve-3d",
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {isHovered && (
              <motion.div
                className="absolute inset-0 -z-10 rounded-2xl"
                style={{
                  boxShadow: "0 0 40px rgba(255, 59, 48, 0.3)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            <span className="text-5xl md:text-7xl tracking-tight font-semibold text-zinc-400 transition-colors duration-200">
              {item}
            </span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Redeem for {cost} coins</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const MarqueeRow = ({
  items,
  direction = "left",
  speedMs = 30000,
  onSelect,
}: {
  items: RewardItem[];
  direction?: "left" | "right";
  speedMs?: number;
  onSelect?: (item: string) => void;
}) => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-live="off"
    >
      <motion.div
        className="flex items-center gap-0 whitespace-nowrap"
        animate={{
          x: direction === "left" ? [0, "-33.333%"] : ["-33.333%", 0],
        }}
        transition={{
          duration: speedMs / 1000,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={`${item.name}-${index}`} className="flex items-center">
            <RewardItem
              item={item.name}
              cost={item.cost}
              onSelect={onSelect}
              index={index}
            />
            {index < duplicatedItems.length - 1 && (
              <div className="w-2 h-2 rounded-full bg-[#FF3B30] mx-6 flex-shrink-0" />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const RewardsHoverTicker = ({
  items = defaultItems,
  speedMs = 30000,
  dotColor = "#FF3B30",
  onSelect,
}: RewardsHoverTickerProps) => {
  const rewardItems: RewardItem[] = items.map((item) => ({
    name: item,
    cost: mockCosts[item] || 100,
  }));

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return (
      <section className="w-full bg-background py-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {rewardItems.map((item, index) => (
              <RewardItem
                key={item.name}
                item={item.name}
                cost={item.cost}
                onSelect={onSelect}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-background py-12 overflow-hidden">
      <div className="space-y-0">
        <MarqueeRow
          items={rewardItems}
          direction="right"
          speedMs={speedMs}
          onSelect={onSelect}
        />
        <MarqueeRow
          items={rewardItems}
          direction="left"
          speedMs={speedMs}
          onSelect={onSelect}
        />
      </div>
    </section>
  );
};

// Example usage
export default function RewardsHoverTickerExample() {
  const handleSelect = (item: string) => {
    console.log("Selected reward:", item);
  };

  return (
    <div className="min-h-screen bg-background">
      <RewardsHoverTicker
        items={defaultItems}
        speedMs={30000}
        onSelect={handleSelect}
      />
    </div>
  );
}
