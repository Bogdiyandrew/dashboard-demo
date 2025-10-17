"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AnimatedKPICardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  change: number;
  trend: "up" | "down";
  prefix?: string;
  suffix?: string;
  decimals?: number;
  color?: "orange" | "purple" | "teal" | "pink";
}

export default function AnimatedKPICard({ 
  icon, 
  title, 
  value, 
  change, 
  trend, 
  prefix = "", 
  suffix = "",
  decimals = 0,
  color = "orange"
}: AnimatedKPICardProps) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const changeRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const colorClasses = {
    orange: "from-orange-500/20 to-orange-600/10 text-orange-400 border-orange-500/20",
    purple: "from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/20",
    teal: "from-teal-500/20 to-teal-600/10 text-teal-400 border-teal-500/20",
    pink: "from-pink-500/20 to-pink-600/10 text-pink-400 border-pink-500/20"
  };

  useEffect(() => {
    const valueElement = valueRef.current;
    const changeElement = changeRef.current;
    const cardElement = cardRef.current;

    if (!valueElement || !changeElement || !cardElement || hasAnimated.current) return;

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            // Set initial value to 0
            valueElement.textContent = '0';
            changeElement.textContent = '0';

            // Animate the main value
            gsap.to(valueElement, {
              duration: 2,
              ease: "power2.out",
              textContent: value,
              snap: { textContent: decimals === 0 ? 1 : 0.1 },
              onUpdate: function() {
                const currentValue = parseFloat(valueElement.textContent || '0');
                valueElement.textContent = currentValue.toLocaleString('ro-RO', {
                  minimumFractionDigits: decimals,
                  maximumFractionDigits: decimals
                });
              }
            });

            // Animate the change percentage
            gsap.to(changeElement, {
              duration: 1.5,
              delay: 0.5,
              ease: "back.out(1.7)",
              textContent: Math.abs(change),
              snap: { textContent: 0.1 },
              onUpdate: function() {
                const currentChange = parseFloat(changeElement.textContent || '0');
                changeElement.textContent = currentChange.toFixed(1);
              }
            });

            // Card entrance animation
            gsap.from(cardElement, {
              duration: 0.8,
              y: 50,
              opacity: 0,
              scale: 0.9,
              ease: "power3.out"
            });

            // Icon pop animation
            const iconWrapper = cardElement.querySelector('.icon-wrapper');
            if (iconWrapper) {
              gsap.from(iconWrapper, {
                duration: 0.6,
                delay: 0.3,
                scale: 0,
                rotation: -180,
                ease: "back.out(2)"
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(cardElement);

    return () => {
      observer.unobserve(cardElement);
    };
  }, [value, change, decimals]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-slate-900/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-800 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden group shadow-2xl cursor-pointer"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClasses[color]} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`icon-wrapper p-3 bg-gradient-to-br ${colorClasses[color]} rounded-xl border`}>
            {icon}
          </div>
          <div className={`flex items-center gap-1 text-sm font-semibold ${trend === "up" ? "text-green-400" : "text-red-400"}`}>
            {trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span ref={changeRef}>0</span>%
          </div>
        </div>
        
        <h3 className="text-gray-400 dark:text-gray-400 text-sm font-medium mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white dark:text-white">
          {prefix && <span className="text-lg text-gray-400 dark:text-gray-400 mr-1">{prefix}</span>}
          <span ref={valueRef}>0</span>
          {suffix && <span className="text-lg text-gray-400 dark:text-gray-400 ml-1">{suffix}</span>}
        </p>
      </div>
    </motion.div>
  );
}