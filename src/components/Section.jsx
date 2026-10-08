import { motion } from 'framer-motion'

export function Section({ id, eyebrow, title, children, className='' }) {
  return <section id={id} className={`section-pad relative overflow-hidden ${className}`}>
    <div className="mx-auto w-[min(1160px,92%)]">
      {eyebrow && <motion.p initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-3 text-xs font-bold uppercase tracking-[.28em] text-violet-300">{eyebrow}</motion.p>}
      {title && <motion.h2 initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.05}} className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</motion.h2>}
      <div className="mt-10">{children}</div>
    </div>
  </section>
}
