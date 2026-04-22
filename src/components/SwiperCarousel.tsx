import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "@/components/ui/Button";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import logo from "@/assets/images/logo.webp";

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

function AnimatedMetric({ value }: { value: string }) {
  const match = value.match(/^([\D]*)(\d+(?:[.,]\d+)?)([\D]*)$/);
  
  if (!match) return <span>{value}</span>;

  const prefix = match[1];
  const numberStr = match[2].replace(/,/g, "");
  const suffix = match[3];
  const targetNumber = parseFloat(numberStr);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (match[2].includes(".")) {
      return `${prefix}${latest.toFixed(1)}${suffix}`;
    }
    const formatted = match[2].includes(",")
      ? Math.round(latest).toLocaleString("en-US")
      : Math.round(latest);
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const initialAnimation = animate(count, targetNumber, {
      duration: 2.5,
      ease: "easeOut",
      delay: 0.5,
      onComplete: () => {
        // Continuamos aumentando el número de forma lenta y aleatoria
        intervalId = setInterval(() => {
          const current = count.get();
          
          // Calculamos un incremento proporcional al tamaño del número
          const tick = 
            targetNumber >= 1000 ? Math.floor(Math.random() * 4) + 1 : // +1 a 4
            targetNumber >= 100 ? Math.floor(Math.random() * 2) + 1 :  // +1 a 2
            targetNumber >= 10 ? Math.random() * 0.3 :                 // +0.0 a 0.3
            0.05;                                                      // +0.05

          count.set(current + tick);
        }, 3000); // Cada 3 segundos da un salto
      }
    });

    return () => {
      initialAnimation.stop();
      if (intervalId) clearInterval(intervalId);
    };
  }, [targetNumber, count]);

  return <motion.span>{rounded}</motion.span>;
}

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
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {items.map((item, index) => (
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

              {/* Logo animado SOLO en el primer slide — Branding Intro Limpio y Llamativo */}
              {index === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-start pt-10 md:pt-12 pointer-events-none">
                  <motion.div
                    className="flex flex-col items-center gap-4 p-5 md:p-6"
                    initial={{ opacity: 0, scale: 1.1, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 1.2,
                      delay: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <motion.img
                      src={logo.src}
                      alt="Optim Logo Branding"
                      className="w-40 md:w-56 brightness-0 invert"
                      animate={{
                        scale: [1, 1.05, 1],
                        filter: [
                          "drop-shadow(0 0 20px rgba(255,255,255,0.1))",
                          "drop-shadow(0 0 35px rgba(255,255,255,0.5))",
                          "drop-shadow(0 0 20px rgba(255,255,255,0.1))"
                        ],
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                    />
                    <div className="h-px w-24 bg-strategic/80" />
                    <span className="text-[0.7rem] font-bold uppercase tracking-[0.5em] text-white transition-opacity duration-700 group-hover:opacity-100">
                      Marketing Estratégico
                    </span>
                  </motion.div>
                </div>
              )}

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
                    <p className="eyebrow-rule mb-5 text-[0.7rem] text-indigo-400 font-semibold uppercase tracking-[0.26em]">
                      {item.eyebrow}
                    </p>
                    <h2 className="max-w-4xl text-4xl font-semibold leading-none text-white md:text-7xl">
                      {item.title}
                    </h2>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
                      {item.description}
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                      <Button
                        variant="black&white"
                        size="lg"
                        href={item.ctaHref}
                        icon={<FiCalendar />}
                        isImage={true}
                      >
                        {item.ctaLabel}
                      </Button>
                    </div>
                  </motion.div>

                  {item.metrics && item.metrics.length > 0 ? (
                    <motion.ul
                      className="hidden md:grid gap-4 rounded-4xl border border-white/12 bg-white/8 p-6 backdrop-blur-md md:p-8"
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
                            {index === 0 ? <AnimatedMetric value={metric.value} /> : metric.value}
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
          <Button
            variant="glass"
            aria-label="Slide anterior"
            onClick={() => swiperRef.current?.slidePrev()}
            className="pointer-events-auto"
            icon={<FiChevronLeft />}
          />
          <Button
            variant="glass"
            aria-label="Slide siguiente"
            onClick={() => swiperRef.current?.slideNext()}
            className="pointer-events-auto"
            icon={<FiChevronRight />}
          />
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
          {items.map((item) => {
            const isEn = item.id.startsWith("en/");
            const slug = item.id.replace(/^(es|en)\//, "");
            const href = isEn ? `/en/empresas/${slug}` : `/empresas/${slug}`;
            return (
              <SwiperSlide key={item.id} className="h-auto!">
                <a href={href} className="group block h-full">
                  <article className="glass-panel group flex h-full flex-col rounded-3xl border border-line p-6 transition-colors duration-300 hover:border-strategic">
                    <div className="mb-6 flex h-[220px] w-full items-center justify-center overflow-hidden rounded-2xl bg-panel">
                      <img
                        src="https://images.unsplash.com/photo-1618950399704-86fb060cd003?q=80&w=2070&auto=format&fit=crop"
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        style={{ viewTransitionName: `hero-image-${item.id}` }}
                      />
                    </div>
                    <h3
                      className="text-2xl font-semibold text-ink"
                      style={{ viewTransitionName: `title-${item.id}` }}
                    >
                      {item.name}
                    </h3>
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
            );
          })}
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
              <p className="mt-4 text-sm leading-7 text-muted">
                {service.summary}
              </p>
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
    <div
      className="section-shell mt-0 w-full px-6 md:px-10"
      aria-label={ariaLabel}
    >
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
        autoplay={{
          delay: 5200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
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
