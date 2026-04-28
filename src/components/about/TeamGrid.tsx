import { motion } from "framer-motion";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  email?: string;
  socials?: Array<{
    label: string;
    href: string;
  }>;
};

type TeamGridProps = {
  members: TeamMember[];
  title: string;
  eyebrow: string;
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function TeamGrid({ members, title, eyebrow }: TeamGridProps) {
  return (
    <section className="section-shell pb-24">
      <div className="max-w-3xl">
        <p className="editorial-label eyebrow-rule">{eyebrow}</p>
        <h2 className="mt-6 text-4xl font-semibold text-ink md:text-6xl">
          {title}
        </h2>
      </div>

      <div className="mt-12 grid gap-5 grid-cols-2 md:grid-cols-3">
        {members.map((member, index) => {
          const isFirst = index === 0;

          return (
            <motion.article
              key={member.id}
              className={`group relative overflow-hidden rounded-4xl border border-line bg-panel transition-all duration-500 
                ${
                  isFirst
                    ? "col-span-2 md:col-span-3 justify-self-center w-full max-w-sm md:max-w-md"
                    : "col-span-1 md:col-span-1"
                }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              custom={index}
              variants={cardVariants}
            >
              <img
                src={member.image}
                alt={member.name}
                className={`w-full object-cover transition-transform duration-500 
                  ${isFirst ? "h-60 md:h-[400px] group-hover:scale-[1.03]" : "h-40 md:h-80"}`}
                loading="lazy"
              />

              <div className="md:p-6 px-4 py-4">
                <p
                  className={`${isFirst ? "md:text-3xl text-xl" : "md:text-2xl text-sm"} font-semibold text-ink`}
                >
                  {member.name}
                </p>
                <p className="mt-2 text-xs md:text-sm uppercase tracking-[0.2em] text-muted">
                  {member.role}
                </p>
              </div>

              {/* Overlay: Solo se activa el efecto si es el primer elemento */}
              <div
                className={`absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(13,13,13,0.92)_30%)] p-6 transition-all duration-500 
                ${
                  isFirst
                    ? "translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                    : "hidden"
                }`}
              >
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-sm font-semibold uppercase tracking-[0.18em] text-white/86"
                  >
                    {member.email}
                  </a>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.socials?.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
