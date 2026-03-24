import { motion } from "framer-motion";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage?: string;
  metrics?: Array<{
    label: string;
    value: string;
  }>;
};

export type BannerSlide = {
  id: string;
  name: string;
  industry: string;
  description?: string;
  image?: string;
};

type HeroCarouselProps = {
  variant: "hero";
  items: HeroSlide[];
  ariaLabel?: string;
};

type BannerCarouselProps = {
  variant: "banner";
  items: BannerSlide[];
  ariaLabel?: string;
};

export type SwiperCarouselProps = HeroCarouselProps | BannerCarouselProps;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function HeroCarousel({
  items,
  ariaLabel = "Hero carousel",
}: HeroCarouselProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="snap-section h-screen w-full" aria-label={ariaLabel}>
      <Swiper
        className="h-full w-full"
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop={items.length > 1}
        speed={900}
        autoplay={
          items.length > 1
            ? {
                delay: 5600,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        pagination={{ clickable: true }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="h-full">
            <article className="grid-frame relative flex h-screen overflow-hidden">
              {item.backgroundImage ? (
                <img
                  src={item.backgroundImage}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
              ) : null}
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(13,13,13,0.74),rgba(13,13,13,0.24)_45%,rgba(13,13,13,0.62))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(187,79,53,0.16),transparent_34%)]" />
              <div className="section-shell relative flex h-full items-end pb-16 pt-28 md:items-center md:pb-10">
                <div className="grid w-full gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] md:items-end">
                  <motion.div
                    className="max-w-4xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                  >
                    <p className="editorial-label eyebrow-rule mb-5">
                      {item.eyebrow}
                    </p>
                    <h2 className="max-w-4xl text-5xl font-semibold leading-none text-canvas md:text-7xl lg:text-[6.5rem]">
                      {item.title}
                    </h2>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-canvas/82 md:text-lg">
                      {item.description}
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                      <a
                        href={item.ctaHref}
                        className="rounded-full bg-canvas px-6 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        {item.ctaLabel}
                      </a>
                    </div>
                  </motion.div>

                  {item.metrics && item.metrics.length > 0 ? (
                    <motion.ul
                      className="grid gap-4 rounded-4xl border border-white/12 bg-white/8 p-6 backdrop-blur-md md:p-8"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.35 }}
                      variants={fadeUp}
                    >
                      {item.metrics.map((metric) => (
                        <li
                          key={`${item.id}-${metric.label}`}
                          className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                        >
                          <span className="block text-4xl font-semibold text-canvas md:text-5xl">
                            {metric.value}
                          </span>
                          <span className="mt-2 block text-sm uppercase tracking-[0.2em] text-canvas/64">
                            {metric.label}
                          </span>
                        </li>
                      ))}
                    </motion.ul>
                  ) : null}
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function BannerCarousel({
  items,
  ariaLabel = "Company marquee",
}: BannerCarouselProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="snap-section flex min-h-screen items-center"
      aria-label={ariaLabel}
    >
      <div className="section-shell py-20">
        <Swiper
          className="w-full"
          modules={[Autoplay, FreeMode]}
          slidesPerView="auto"
          spaceBetween={18}
          loop
          freeMode={{ enabled: true, momentum: false }}
          allowTouchMove={false}
          speed={8000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="!w-auto">
              <article className="glass-panel min-w-72 rounded-full border border-line px-6 py-4 md:min-w-80 md:px-8">
                <div className="flex items-center gap-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-full border border-line object-cover"
                      loading="lazy"
                    />
                  ) : null}
                  <p className="text-lg font-semibold text-ink">{item.name}</p>
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted">
                  <span>{item.industry}</span>
                  {item.description ? (
                    <>
                      <span className="h-1 w-1 rounded-full bg-strategic" />
                      <span className="line-clamp-1 max-w-64">
                        {item.description}
                      </span>
                    </>
                  ) : null}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default function SwiperCarousel(props: SwiperCarouselProps) {
  if (props.variant === "hero") {
    return <HeroCarousel {...props} />;
  }

  return <BannerCarousel {...props} />;
}
