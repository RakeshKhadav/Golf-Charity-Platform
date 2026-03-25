"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Heart, Trophy, Users, ArrowUpRight, Activity } from "lucide-react";

export function HomeClient({ 
  metrics, 
  featuredCharities, 
  latestDraw 
}: { 
  metrics: { label: string; value: string }[],
  featuredCharities: any[],
  latestDraw: any
}) {
  return (
    <div className="flex flex-col gap-24 pb-24 relative overflow-hidden">
      {/* Background Orbs - Expanded for full coverage */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[var(--primary)]/20 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-[var(--secondary)]/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] left-[10%] w-[1000px] h-[600px] bg-[var(--tertiary)]/10 blur-[200px] rounded-full pointer-events-none" />

      {/* HERO */}
      <section className="relative pt-12 px-6 flex flex-col items-center text-center max-w-5xl mx-auto z-10 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container-low)]/50 backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-[var(--secondary)] animate-pulse" />
            <span className="text-xs font-medium text-[var(--on-surface-variant)] tracking-wider uppercase">Impact Engine Live</span>
          </div>
          <h1 className="font-display text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tight text-white mb-8 leading-[0.9] text-balance">
            Play. Win. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)] bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">Change Lives.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--on-surface-variant)] max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Turn your stats into meaningful global impact. Join exclusive prize draws while supporting the world's most effective charities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button className="px-8 py-6 text-lg">Start Playing</Button>
            </Link>
            <Link href="/charities">
              <Button variant="secondary" className="px-8 py-6 text-lg group">
                Explore Charities
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FLOATING STATS BAR */}
      <section className="relative z-20 px-4 -mt-10 md:-mt-16 w-full max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/10"
        >
          {metrics.map((m, i) => (
            <div key={m.label} className="flex-1 text-center md:text-left flex flex-col items-center md:items-start relative">
              {i !== 0 && <div className="hidden md:block absolute left-[-2rem] top-1/2 -translate-y-1/2 w-px h-12 bg-white/10" />}
              <span className="text-[var(--on-surface-variant)] text-sm font-medium mb-2 flex items-center gap-2">
                {i === 0 && <Heart className="w-4 h-4 text-[var(--primary)]" />}
                {i === 1 && <Users className="w-4 h-4 text-[var(--secondary)]" />}
                {i === 2 && <Trophy className="w-4 h-4 text-[var(--tertiary)]" />}
                {m.label}
              </span>
              <span className="font-data text-4xl font-bold text-white">{m.value}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* SPLIT FEATURE - Increased spacing */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-32 items-center py-12">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-10">The Mechanism.</h2>
          <div className="space-y-6">
            {[ 
              { title: "Enter Your Scores", desc: "Track your progress and log your latest 5 Stableford scores.", icon: Activity, color: "var(--primary)" },
              { title: "Choose Your Charity", desc: "Select from our vetted partners to direct your monthly impact.", icon: Heart, color: "var(--secondary)" },
              { title: "Win Monthly Prizes", desc: "Enter automatic tiered draws and win exclusive rewards.", icon: Trophy, color: "var(--tertiary)" }
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--surface-container-low)]/50 border border-white/5 hover:bg-[var(--surface-container-high)] transition-colors">
                <div className="w-12 h-12 rounded-full flex shrink-0 items-center justify-center bg-[var(--surface-container-highest)] shadow-inner" style={{ color: step.color }}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-[var(--on-surface-variant)] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Card variant="primary" className="p-8 pb-10 relative group overflow-hidden border-t border-[var(--primary)]/30">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--secondary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className="px-3 py-1 rounded-full bg-[var(--secondary)]/20 text-[var(--secondary)] text-xs font-bold uppercase tracking-wider">Spotlight</span>
            </div>
            {featuredCharities?.[0] ? (
              <div className="relative z-10">
                <h3 className="font-display text-3xl font-bold text-white mb-4">{featuredCharities[0].name}</h3>
                <p className="text-[var(--on-surface-variant)] mb-8 leading-relaxed">
                  {featuredCharities[0].description?.slice(0, 140)}...
                </p>
                <div className="flex items-center justify-between mt-8 border-t border-[var(--outline-variant)] pt-6">
                  <div className="flex flex-col">
                    <span className="font-data text-2xl font-bold text-[var(--secondary)]">
                      ₹{latestDraw?.charity_pool ? (latestDraw.charity_pool * 0.4).toLocaleString(undefined, { maximumFractionDigits: 0 }) : "24,670"}
                    </span>
                    <span className="text-xs text-muted uppercase tracking-wider mt-1">Current Impact</span>
                  </div>
                  <Link href={`/charities/${featuredCharities[0].slug}`}>
                    <Button variant="secondary" className="px-5 py-2">Learn More</Button>
                  </Link>
                </div>
              </div>
            ) : (
               <div className="text-muted text-center py-12">Featured charities will appear here</div>
            )}
          </Card>
        </motion.div>
      </section>

      {/* HORIZONTAL SCROLL CHARITIES */}
      <section className="relative z-10 w-full pl-6 md:pl-20 py-12">
        <div className="flex justify-between items-end mb-8 pr-6 md:pr-20">
          <div>
            <h2 className="font-display text-3xl font-bold text-white">Our Partners</h2>
            <p className="text-[var(--on-surface-variant)] mt-2">Discover causes making a real difference.</p>
          </div>
          <Link href="/charities" className="hidden sm:flex text-[var(--primary)] items-center gap-1 font-semibold hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-8 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {featuredCharities?.slice(1).map((charity, i) => (
            <motion.div 
              key={charity.id} 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="min-w-[320px] max-w-[320px] snap-start"
            >
              <Card variant="data" className="h-[280px] flex flex-col justify-between hover:border-[var(--primary)]/50 transition-colors">
                <div>
                  <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">{charity.name}</h3>
                  <p className="text-sm text-muted line-clamp-3">{charity.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--outline-variant)]">
                  <div className="flex gap-2">
                    {charity.tags?.slice(0,1).map((tag: string) => (
                      <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <Link href={`/charities/${charity.slug}`} className="w-8 h-8 rounded-full border border-[var(--outline-variant)] flex items-center justify-center hover:bg-[var(--primary)] hover:border-transparent hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
          {(!featuredCharities || featuredCharities.length <= 1) && (
            <div className="text-muted italic pr-6 text-sm">More partners coming soon...</div>
          )}
        </div>
      </section>
      
      {/* IMPACT METRICS SPOTLIGHT */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center pt-12 pb-12">
         <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-[3rem] p-12 relative overflow-hidden bg-gradient-to-b from-[var(--surface-container-high)] to-[var(--surface-container-highest)] border border-white/5 ambient-shadow">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--tertiary)]/10 to-transparent pointer-events-none" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Ready to Play for Good?</h2>
            <p className="text-lg text-[var(--on-surface-variant)] max-w-xl mx-auto mb-10">Join hundreds of golfers already turning their hobby into a vehicle for global impact and exclusive rewards.</p>
            <Link href="/signup">
              <Button className="px-10 py-6 text-lg shadow-[0_0_30px_rgba(234,88,12,0.2)] bg-gradient-to-r from-[var(--tertiary-container)] to-[var(--tertiary)] border-0 hover:brightness-110">
                Start Your Impact
              </Button>
            </Link>
         </motion.div>
      </section>

    </div>
  );
}
