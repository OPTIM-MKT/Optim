import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import {
  FaLightbulb,
  FaCameraRetro,
  FaBullhorn,
  FaPalette,
  FaLaptopCode,
  FaNetworkWired,
} from "react-icons/fa";
import SmoothScroll from "./SmothScroll";

export type ServiceItem = {
  title: string;
  summary: string;
  how: string[];
};

interface ScrollCarouselProps {
  items: ServiceItem[];
  ariaLabel?: string;
  contactHref?: string;
  contactLabel?: string;
}

const getIconForService = (title: string, index: number) => {
  const t = title.toLowerCase();
  if (t.includes("estrategia")) return FaLightbulb;
  if (t.includes("contenido")) return FaCameraRetro;
  if (t.includes("publicidad") || t.includes("ads")) return FaBullhorn;
  if (t.includes("branding")) return FaPalette;
  if (t.includes("sitio") || t.includes("web") || t.includes("landing")) return FaLaptopCode;
  if (t.includes("crm")) return FaNetworkWired;
  
  const fallbackIcons = [FaLightbulb, FaCameraRetro, FaBullhorn, FaPalette, FaLaptopCode, FaNetworkWired];
  return fallbackIcons[index % fallbackIcons.length];
};

const IMAGE_URL = "https://images.unsplash.com/photo-1653435682730-7a2f1ccbcbd2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function ScrollCarousel({ items, ariaLabel = "Servicios", contactHref = "/contact", contactLabel = "Agendar diagnóstico" }: ScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const numItems = items?.length || 0;
  
  // Transform scroll progress to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(100 / numItems) * (numItems - 1)}%`]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (numItems <= 1) return;
    const index = Math.round(latest * (numItems - 1));
    setActiveIndex(index);
  });

  if (!items || numItems === 0) return null;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      aria-label={ariaLabel}
      // The height is roughly 100vh for the initial view + 100vh for each subsequent item
      style={{ height: `${numItems * 100}vh` }}
    >
      <SmoothScroll />

      {/* Sticky container that pins to the screen during scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-canvas">
        
        {/* Pagination Dots Top Center */}
        <div className="absolute top-[10vh] left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
           {items.map((_, i) => (
             <motion.div
               key={i}
               initial={false}
               animate={{ 
                 width: activeIndex === i ? 28 : 6,
                 backgroundColor: activeIndex === i ? 'rgb(124, 58, 237)' : 'rgba(156, 163, 175, 0.4)'
               }}
               className="h-1.5 rounded-full transition-all duration-300"
             />
           ))}
        </div>

        {/* Horizontal Track Slider */}
        <motion.div 
          style={{ x, width: `${numItems * 100}%` }} 
          className="flex h-full items-center"
        >
          {items.map((service, index) => {
            const Icon = getIconForService(service.title, index);
            
            return (
              <div 
                key={`sc-${index}`} 
                style={{ width: `${100 / numItems}%` }}
                className="h-full flex items-center justify-center px-6 md:px-12 lg:px-20"
              >
                <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-24 items-center h-auto py-10">
                  
                  {/* Left: Image / Media Block */}
                  <div className="relative aspect-video lg:aspect-square lg:max-h-[60vh] w-full bg-neutral-100 rounded-4xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center justify-center p-6 border border-neutral-100 dark:border-neutral-800">
                     <img 
                       src={IMAGE_URL} 
                       alt={service.title} 
                       className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[2s] hover:scale-105"
                       loading="lazy"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Right: Text Block */}
                  <div className="flex flex-col pt-4 lg:pt-0">
                    <div className="w-14 h-14 hidden md:flex bg-strategic rounded-2xl items-center justify-center shadow-lg mb-8">
                       <Icon className="text-2xl text-white" />
                    </div>
                    
                    <h2 className="text-3xl lg:text-5xl font-semibold text-ink tracking-tight leading-[1.05] text-balance">
                      {service.title}
                    </h2>
                    
                    <p className="mt-6 text-lg text-muted font-medium leading-relaxed">
                      {service.summary}
                    </p>

                    <ul className="mt-6 space-y-2 text-muted text-base">
                      {service.how.map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                           <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-strategic shrink-0 opacity-80" />
                           <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={contactHref}
                      className="mt-10 inline-flex w-fit rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-canvas transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      {contactLabel}
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </motion.div>
        
      </div>
    </div>
  );
}
