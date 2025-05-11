"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code,
  Lightbulb,
  Microscope,
  PenTool,
  Rocket,
  Users,
  Cpu,
  CheckCircle,
  MoreHorizontal,
  Aperture,
  Smartphone,
} from "lucide-react";
import type { Category } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "cambium-processes": Rocket,
  "git-sessions": Code,
  "personal-projects-&-others": BookOpen,
  "personal-projects-others": BookOpen,
  "dev-sessions": Microscope,
  "mobile-applications": Smartphone,
  "management-and-customer-services": Users,
  "devops-&-aws": PenTool,
  "devops-aws": PenTool,
  react: Code,
  "node-js": Code,
  meetups: Users,
  ai: Cpu,
  qa: CheckCircle,
  other: MoreHorizontal,
  "dot-net": Code,
  ".net": Code,
  flutter: Aperture,
  angular: Aperture,
};

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const displayCategories = categories.slice(0, 16);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayCategories.map((category) => {
        const IconComponent = iconMap[category.slug.toLowerCase()] || Lightbulb;
        const isHovered = hoveredId === category.id;

        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="block h-full"
          >
            <motion.div
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "h-full flex flex-col rounded-2xl overflow-hidden cursor-pointer",
                "transition-transform"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              style={{
                background: isHovered
                  ? "linear-gradient(135deg, #FFEBD8 0%, #0A0043 100%)"
                  : "linear-gradient(135deg, #0A0043 0%, #FFEBD8 100%)",
              }}
            >
              <div className="p-6 flex flex-col items-center text-center flex-1">
                <div
                  className="p-4 rounded-full mb-4"
                  style={{ background: isHovered ? "rgba(255,235,216,0.3)" : "rgba(10,0,67,0.3)" }}
                >
                  <IconComponent
                    className={cn(
                      "h-8 w-8",
                      isHovered ? "text-[#0A0043]" : "text-[#FFEBD8]"
                    )}
                  />
                </div>
                <h3
                  className={cn(
                    "text-lg font-bold mb-2",
                    isHovered ? "text-[#0A0043]" : "text-[#FFEBD8]"
                  )}
                >
                  {category.name}
                </h3>
                <p
                  className={cn(
                    "text-sm",
                    isHovered ? "text-[#0A0043]/80" : "text-[#FFEBD8]/80"
                  )}
                >
                  {category.count} {category.count === 1 ? "video" : "videos"}
                </p>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
