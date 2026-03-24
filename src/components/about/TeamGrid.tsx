import { motion } from "framer-motion";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  email: string;
  socials: Array<{
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
        <h2 className="mt-6 text-4xl font-semibold text-ink md:text-6xl">{title}</h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {members.map((member, index) => (
          <motion.article
            key={member.id}
            className="group relative overflow-hidden rounded-[2rem] border border-line bg-panel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            custom={index}
            variants={cardVariants}
          >
            <img
              src={member.image}
              alt={member.name}
              className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="p-6">
              <p className="text-2xl font-semibold text-ink">{member.name}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted">{member.role}</p>
            </div>

            <div className="absolute inset-x-0 bottom-0 translate-y-8 bg-[linear-gradient(180deg,transparent,rgba(13,13,13,0.92)_30%)] p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <a href={`mailto:${member.email}`} className="text-sm font-semibold uppercase tracking-[0.18em] text-white/86">
                {member.email}
              </a>
              <div className="mt-4 flex flex-wrap gap-2">
                {member.socials.map((social) => (
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
        ))}
      </div>
    </section>
  );
}
