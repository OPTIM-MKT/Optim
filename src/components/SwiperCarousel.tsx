import { motion } from "framer-motion";
import { useRef } from "react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

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

type ServicesCarouselProps = {
  variant: "services";
  items: string[];
  ariaLabel?: string;
};

export type ServicesPageSlide = {
  title: string;
  summary: string;
  how: string[];
};

type ServicesPageCarouselProps = {
  variant: "servicesPage";
  items: ServicesPageSlide[];
  ariaLabel?: string;
};

type CompaniesCarouselProps = {
  variant: "companies";
  items: BannerSlide[];
  ariaLabel?: string;
};

export type TestimonialSlide = {
  id: string;
  name: string;
  industry: string;
  description: string;
};

type TestimonialsCarouselProps = {
  variant: "testimonials";
  items: TestimonialSlide[];
  ariaLabel?: string;
};

export type SwiperCarouselProps =
  | HeroCarouselProps
  | BannerCarouselProps
  | ServicesCarouselProps
  | ServicesPageCarouselProps
  | TestimonialsCarouselProps
  | CompaniesCarouselProps;


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
  const swiperRef = useRef<SwiperType | null>(null);

  if (items.length === 0) {
    return null;
  }

  const canNav = items.length > 1;

  return (
    <section className="snap-section h-screen w-full" aria-label={ariaLabel}>
      <Swiper
        className="h-full w-full"
        modules={[Pagination, Autoplay, Navigation]}
        slidesPerView={1}
        loop={canNav}
        speed={900}
        autoplay={
          canNav
            ? {
                delay: 5600,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        pagination={{ clickable: true }}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
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
              {/* Dark overlay — always present so text is always white-safe */}
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(13,13,13,0.78),rgba(13,13,13,0.28)_45%,rgba(13,13,13,0.66))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(187,79,53,0.18),transparent_34%)]" />

              <div className="section-shell relative flex h-full items-end pb-16 pt-28 md:items-center md:pb-10">
                <div className="grid w-full gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] md:items-end">
                  <motion.div
                    className="max-w-4xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                  >
                    {/* Eyebrow — white-safe, not CSS-var dependent */}
                    <p
                      className="eyebrow-rule mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.26em]"
                      style={{ color: "rgba(209,112,82,1)" }}
                    >
                      {item.eyebrow}
                    </p>
                    <h2 className="max-w-4xl text-4xl font-semibold leading-none text-white md:text-7xl">
                      {item.title}
                    </h2>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
                      {item.description}
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                      <a
                        href={item.ctaHref}
                        className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0d0d0d] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/90"
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
                          <span className="block text-4xl font-semibold text-white md:text-5xl">
                            {metric.value}
                          </span>
                          <span className="mt-2 block text-sm uppercase tracking-[0.2em] text-white/60">
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

      {/* Custom navigation — only rendered when there is more than one slide */}
      {canNav ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-12 z-10 flex justify-end gap-2 px-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:justify-between md:px-6">
          <button
            aria-label="Slide anterior"
            onClick={() => swiperRef.current?.slidePrev()}
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/20 md:h-12 md:w-12"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            aria-label="Slide siguiente"
            onClick={() => swiperRef.current?.slideNext()}
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/20 md:h-12 md:w-12"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      ) : null}
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

function ServicesCarousel({
  items,
  ariaLabel = "Servicios",
}: ServicesCarouselProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-16 w-full" aria-label={ariaLabel}>
      <Swiper
        className="w-full overflow-visible pb-8"
        modules={[FreeMode, Autoplay]}
        slidesPerView={1.2}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2.5, spaceBetween: 24 },
          1024: { slidesPerView: 3.5, spaceBetween: 28 },
        }}
        freeMode={{ enabled: true, momentum: true }}
        grabCursor={true}
      >
        {items.map((service, index) => (
          <SwiperSlide key={`service-${index}`} className="h-auto!">
            <article className="surface-card flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-strategic">
              <p className="text-2xl font-semibold text-ink">{service}</p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function CompaniesCarousel({
  items,
  ariaLabel = "Empresas",
}: CompaniesCarouselProps) {
  if (items.length === 0) return null;

  return (
    <section
      className="snap-section flex min-h-[80vh] flex-col items-center justify-center py-20"
      aria-label={ariaLabel}
    >
      <div className="section-shell w-full overflow-visible">
        <Swiper
          className="w-full overflow-visible"
          modules={[FreeMode, Autoplay]}
          slidesPerView={1.2}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.2, spaceBetween: 32 },
          }}
          freeMode={{ enabled: true, momentum: true }}
          grabCursor={true}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <a href={`/empresas/${item.id}`} className="group block h-full">
                <article className="glass-panel flex h-full flex-col rounded-3xl border border-line p-6 transition-colors duration-300 group-hover:border-strategic">
                  {item.image ? (
                    <div className="mb-6 flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl bg-panel p-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="mb-6 h-48 w-full rounded-2xl bg-panel" />
                  )}
                  <h3 className="text-2xl font-semibold text-ink">{item.name}</h3>
                  <div className="mt-3 text-xs uppercase tracking-[0.2em] font-medium text-strategic">
                    {item.industry}
                  </div>
                  {item.description ? (
                    <p className="mt-4 text-sm leading-relaxed text-muted line-clamp-3">
                      {item.description}
                    </p>
                  ) : null}
                </article>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function ServicesPageCarousel({
  items,
  ariaLabel = "Servicios",
}: ServicesPageCarouselProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-12 w-full" aria-label={ariaLabel}>
      <Swiper
        className="swiper-optim w-full overflow-visible pb-16"
        modules={[FreeMode, Pagination]}
        slidesPerView={1.1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 1.5, spaceBetween: 24 },
          1024: { slidesPerView: 2.2, spaceBetween: 32 },
        }}
        pagination={{ clickable: true }}
        grabCursor={true}
      >
        {items.map((service, index) => (
          <SwiperSlide key={`sp-${index}`} className="!h-auto">
            <article className="surface-card group relative flex h-full flex-col overflow-hidden p-8 transition-transform duration-300 hover:-translate-y-1 md:p-10">
              {/* Strategic accent bar */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-[3px] bg-strategic opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              {/* Index badge */}
              <span className="mb-6 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-xs font-semibold tabular-nums text-strategic">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-2xl font-semibold leading-tight text-ink md:text-3xl">
                {service.title}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">{service.summary}</p>
              <ul className="mt-8 grow space-y-0 text-sm leading-7">
                {service.how.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 border-t border-line py-3 text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-strategic"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function TestimonialsCarousel({
  items,
  ariaLabel = "Testimonios",
}: TestimonialsCarouselProps) {
  if (items.length === 0) return null;

  return (
    <div className="section-shell mt-0 w-full px-6 md:px-10" aria-label={ariaLabel}>
      <Swiper
        className="swiper-optim w-full pb-14"
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 28 },
          1024: { slidesPerView: 3, spaceBetween: 36 },
        }}
        loop={true}
        autoplay={{ delay: 5200, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        grabCursor={true}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="!h-auto">
            <article className="surface-card group flex h-full flex-col justify-between p-7 transition-transform duration-300 hover:-translate-y-1 md:p-8">
              {/* Decorative quote */}
              <span
                aria-hidden="true"
                className="mb-4 block font-display text-5xl leading-none text-strategic opacity-40 transition-opacity duration-300 group-hover:opacity-70"
              >
                &ldquo;
              </span>
              <p className="grow text-base font-medium leading-relaxed text-ink md:text-lg">
                {item.description}
              </p>
              <footer className="mt-8 border-t border-line pt-5">
                <p className="text-sm font-semibold text-ink">{item.name}</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-muted">
                  {item.industry}
                </p>
              </footer>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default function SwiperCarousel(props: SwiperCarouselProps) {
  if (props.variant === "hero") {
    return <HeroCarousel {...props} />;
  }
  if (props.variant === "services") {
    return <ServicesCarousel {...props} />;
  }
  if (props.variant === "servicesPage") {
    return <ServicesPageCarousel {...props} />;
  }
  if (props.variant === "testimonials") {
    return <TestimonialsCarousel {...props} />;
  }
  if (props.variant === "companies") {
    return <CompaniesCarousel {...props} />;
  }

  return <BannerCarousel {...props} />;
}
