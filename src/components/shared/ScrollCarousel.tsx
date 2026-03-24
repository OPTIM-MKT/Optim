import { motion } from "framer-motion";
import {
  FaUtensils,
  FaCoffee,
  FaShoppingBag,
  FaCapsules,
  FaCut,
  FaSpa,
  FaLaptop,
} from "react-icons/fa";
import ScrollReveal from "./ScrollReveal";

interface ScrollCarouselProps {
  eyebrow: string;
  title: string;
  items: string[];
  headline: string;
  tagline: string;
}

const icons = [FaUtensils, FaCoffee, FaShoppingBag, FaCapsules, FaCut, FaSpa, FaLaptop];

export default function ScrollCarousel({ eyebrow, title, items, headline, tagline }: ScrollCarouselProps) {

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-400/8 dark:bg-indigo-600/8 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-6">
            {tagline}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[0.95]">
            {title}
          </h2>
        </ScrollReveal>

        {/* Marquee-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item: string, i: number) => {
            const Icon = icons[i % icons.length];
            return (
              <ScrollReveal key={item} delay={i * 0.08}>
                <motion.div
                  className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur-sm"
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgb(124, 58, 237)",
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                    <Icon className="text-indigo-600 dark:text-indigo-400 text-lg" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    {item}
                  </span>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.6}>
          <p className="mt-14 text-center text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
            {headline}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
