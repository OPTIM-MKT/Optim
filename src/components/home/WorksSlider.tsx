import { useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";
import { productsSlider } from "@/constants/ProductsSlider";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

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

  // Funciones de navegación
  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
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
                  onClick={() => goTo(i)}
                  className="works-indicator-btn"
                >
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
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isActive ? "active" : "idle"}
                      className={`works-indicator-label ${isActive ? "works-indicator-label--active" : ""}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="indicator-dot"
                      className="works-indicator-dot"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Swiper Wrapper */}
          <motion.div
            className="works-slider-swiper-wrapper relative group"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Autoplay, EffectCreative]}
              effect="creative"
              creativeEffect={{
                prev: { shadow: true, translate: [0, 0, -400], opacity: 0 },
                next: { translate: ["100%", 0, 0], opacity: 0 },
              }}
              loop={true}
              speed={1500}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={handleSlideChange}
              className="works-swiper rounded-2xl"
            >
              {SLIDES.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="works-slide">
                    <div className="works-slide-image-wrapper">
                      <img
                        src={slide.image.src}
                        alt={slide.name}
                        className="works-slide-image"
                      />
                      <div className="works-slide-gradient" />
                    </div>
                    <div className="works-slide-caption">
                      <motion.div className="works-slide-caption-pill">
                        <span className="works-slide-number">
                          {String(slide.id).padStart(2, "0")}
                        </span>
                        <h3 className="works-slide-title">{slide.name}</h3>
                      </motion.div>
                    </div>
                    <div className="works-slide-glow" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows */}
            <div className="absolute top-6 right-6 md:translate-x-0 md:top-auto md:bottom-6 md:left-auto md:right-6 z-20 flex gap-8">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full border cursor-pointer border-strategic/30 backdrop-blur-md transition-all bg-strategic text-white active:scale-95"
                aria-label="Previous slide"
              >
                <FiArrowLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full border cursor-pointer border-strategic/30 backdrop-blur-md transition-all bg-strategic text-white active:scale-95"
                aria-label="Next slide"
              >
                <FiArrowRight size={20} />
              </button>
            </div>

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
