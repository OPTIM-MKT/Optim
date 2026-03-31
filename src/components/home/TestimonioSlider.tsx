import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  description: string;
}

interface TestimonioSliderProps {
  items: TestimonialItem[];
  ariaLabel?: string;
}

const TestimonioSlider = ({ items, ariaLabel }: TestimonioSliderProps) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4" aria-label={ariaLabel}>
      <Swiper
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={700}
        observer={true}
        observeParents={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        className="swiper-optim w-full rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:h-[600px] items-center">
              {/* Left Side: Quote and Company Info */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1 relative overflow-hidden h-full">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <blockquote className="text-2xl md:text-3xl font-medium italic mb-8 text-ink dark:text-white leading-relaxed">
                    "{item.description}"
                  </blockquote>

                  <div>
                    <p className="text-sm tracking-wide uppercase font-semibold text-secondary mb-1">
                      Representando a
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {item.company}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Avatar, Name, Role */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center order-1 lg:order-2 relative h-full bg-gray-50/50 dark:bg-gray-900/40">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 mb-8 bg-gray-200 dark:bg-gray-700">
                    <img
                      src={item.image}
                      alt={`Avatar de ${item.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-ink dark:text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-lg text-secondary font-medium">
                    {item.role}
                  </p>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Controls */}
      <div className="flex items-center justify-between mt-8">
        <div className="custom-pagination flex gap-2" />

        <div className="flex gap-4">
          <Button
            variant="simple"
            className="custom-prev cursor-pointer w-12 h-12"
            aria-label="Testimonio anterior"
            icon={<FiArrowLeft size={20} />}
          />
          <Button
            variant="primary"
            className="custom-next cursor-pointer w-12 h-12 shadow-lg hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: "var(--color-strategic)", color: "var(--color-canvas)" }}
            aria-label="Siguiente testimonio"
            icon={<FiArrowRight size={20} />}
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonioSlider;