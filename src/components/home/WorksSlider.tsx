import { useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";
import { productsSlider } from "@/constants/ProductsSlider";

import "swiper/css";
import "swiper/css/effect-creative";

// ─── Types ────────────────────────────────────────────────────────────────────
interface WorksSliderProps {
  /** Max-width of the slider wrapper. Defaults to "1280px" */
  maxWidth?: string;
  /** Section eyebrow label */
  eyebrow?: string;
  /** Section heading */
  heading?: string;
  title?: string;
  headText: string;
}

// ─── Unique items (only the 4 base products, not the duplicated array) ─────────
const SLIDES = productsSlider.slice(0, 4);

// ─── Component ────────────────────────────────────────────────────────────────
const WorksSlider = ({
  maxWidth = "1280px",
  headText,
  title,
}: WorksSliderProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    swiperRef.current?.slideToLoop(index);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  return (
    <section
      className="works-slider-section snap-section flex items-center overflow-hidden"
      aria-label={headText}
    >
      <div
        className="section-shell works-slider-shell"
        style={{ maxWidth, margin: "0 auto" }}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="works-slider-header"
        >
          <p className="editorial-label eyebrow-rule">{headText}</p>
          <h2 className="works-slider-heading">{title}</h2>
        </motion.div>

        {/* ── Slider layout: [side indicators] + [swiper] ────────────────── */}
        <div className="works-slider-layout">
          {/* Side indicators */}
          <div
            className="works-slider-indicators"
            role="tablist"
            aria-label="Diapositivas de trabajos"
          >
            {SLIDES.map((slide, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={slide.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Ir a ${slide.name}`}
                  onClick={() => goTo(i)}
                  className="works-indicator-btn"
                >
                  {/* Track line */}
                  <span className="works-indicator-track">
                    {isActive && (
                      <motion.span
                        layoutId="indicator-fill"
                        className="works-indicator-fill"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </span>

                  {/* Label */}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isActive ? "active" : "idle"}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 4 }}
                      transition={{ duration: 0.2 }}
                      className={`works-indicator-label ${isActive ? "works-indicator-label--active" : ""}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>

                  {/* Dot glow */}
                  {isActive && (
                    <motion.span
                      layoutId="indicator-dot"
                      className="works-indicator-dot"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 28,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Swiper */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="works-slider-swiper-wrapper"
          >
            <Swiper
              modules={[Autoplay, EffectCreative]}
              effect="creative"
              creativeEffect={{
                prev: {
                  shadow: true,
                  translate: [0, 0, -400],
                  opacity: 0,
                },
                next: {
                  translate: ["100%", 0, 0],
                  opacity: 0,
                },
              }}
              loop={true}
              speed={800}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              className="works-swiper"
            >
              {SLIDES.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="works-slide">
                    {/* Image */}
                    <div className="works-slide-image-wrapper">
                      <img
                        src={slide.image.src}
                        alt={slide.name}
                        width={slide.image.width}
                        height={slide.image.height}
                        loading="lazy"
                        decoding="async"
                        className="works-slide-image"
                      />
                      {/* Gradient overlay */}
                      <div
                        className="works-slide-gradient"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Caption */}
                    <div className="works-slide-caption">
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <span className="works-slide-number">
                          {String(slide.id).padStart(2, "0")}
                        </span>
                        <h3 className="works-slide-title">{slide.name}</h3>
                      </motion.div>
                    </div>

                    {/* Strategic glow accent */}
                    <div className="works-slide-glow" aria-hidden="true" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Progress bar */}
            <div className="works-progress-bar" aria-hidden="true">
              <motion.div
                className="works-progress-fill"
                key={activeIndex}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4.5, ease: "linear" }}
                style={{ transformOrigin: "left center" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorksSlider;
