"use client";

import { motion, type Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { upsertScoreAction } from "@/features/scores/actions";
import { updateCharityPreferenceAction } from "@/features/profile/actions";
import { WinnerProofForm } from "@/features/winners/winner-proof-form";
import Link from "next/link";
import { Activity, Trophy, Heart, AlertCircle, ArrowUpRight, DollarSign } from "lucide-react";
import { useFormStatus } from "react-dom";

function formatMoney(value: unknown) {
  const numberValue = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numberValue)) return "0.00";
  return numberValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function SubmitScoreButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={disabled || pending} 
      className="md:w-auto w-full px-10 py-6 text-lg tracking-wide rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] border-0"
    >
      {pending ? "Logging..." : disabled ? "Subscription Required" : "Log Score"}
    </Button>
  );
}

function SubmitCharityButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="secondary" disabled={pending} className="w-full">
      {pending ? "Updating..." : "Update Preference"}
    </Button>
  );
}

export function DashboardClient({
  profile,
  scores,
  charities,
  subscriptionState,
  upcomingDraw,
  participants,
  winnersWithProof,
  drawsMap,
  totals,
  diagnostics
}: any) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background Ambient Glows - Edge to Edge */}
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[var(--primary)]/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[900px] h-[900px] bg-[var(--secondary)]/10 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] left-[20%] w-[600px] h-[600px] bg-[var(--tertiary)]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="flex flex-col gap-10 max-w-6xl mx-auto w-full pt-12 pb-32 px-6 relative z-10">

      {diagnostics?.length > 0 && (
        <div className="bg-[var(--error)]/10 border border-[var(--error)]/30 text-[var(--error)] rounded-2xl p-4 flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-2 font-display font-bold">
            <AlertCircle className="w-5 h-5" /> Data Diagnostics
          </div>
          <ul className="list-disc pl-6 text-sm">
            {diagnostics.map((msg: string, i: number) => <li key={i}>{msg}</li>)}
          </ul>
        </div>
      )}

      {!subscriptionState.hasAccess && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <Card className="bg-[var(--primary)]/10 border-[var(--primary)]/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-2">Membership Required</h3>
              <p className="text-[var(--on-surface-variant)] text-sm max-w-xl">Activate your subscription to unlock score entries, impact tracking, and prize draw eligibility.</p>
            </div>
            <Link href="/subscribe">
              <Button className="whitespace-nowrap bg-white text-[var(--primary)] hover:bg-white/90">Subscribe Now</Button>
            </Link>
          </Card>
        </motion.div>
      )}

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8 relative z-10">
        
        {/* HEADER SECTION */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--outline-variant)] pb-6 gap-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--on-surface-variant)]">{profile?.full_name?.split(' ')[0] ?? 'Player'}</span>
            </h1>
            <p className="text-[var(--on-surface-variant)] text-lg">Manage your scores, preferences, and direct your impact.</p>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-sm text-muted uppercase tracking-widest font-data">Subscription</span>
            <span className="inline-flex items-center gap-2 justify-end">
              <span className={`w-2 h-2 rounded-full ${subscriptionState.hasAccess ? "bg-[var(--success)] shadow-[0_0_10px_var(--success)]" : "bg-[var(--error)]"}`} />
              <span className="font-display font-bold text-lg text-white capitalize">{subscriptionState.subscription?.status ?? "Inactive"}</span>
            </span>
          </div>
        </motion.div>

        {/* CENTERPIECE: MASSIVE SCORE INPUT */}
        <motion.div variants={itemVariants}>
          <Card variant="glass" className="p-8 md:p-12 relative overflow-hidden group border-[var(--primary)]/30 shadow-[0_0_40px_rgba(37,99,235,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 pointer-events-none" />
            <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-[var(--primary)]" /> Log Recent Round
            </h2>
            <form action={upsertScoreAction} className="flex flex-col md:flex-row gap-6 items-center relative z-10">
              <div className="flex-1 w-full bg-[var(--surface-container-low)] rounded-3xl p-6 border border-white/5 flex flex-col md:flex-row gap-6 md:items-center">
                <div className="flex-1">
                  <label htmlFor="score" className="text-xs uppercase tracking-widest text-[#889abb] font-bold block mb-3">Stableford Score</label>
                  <Input 
                    id="score" 
                    name="score" 
                    type="number" 
                    min={1} 
                    max={45} 
                    required 
                    inputSize="huge" 
                    placeholder="00"
                    className="w-full md:w-48 text-center"
                  />
                </div>
                <div className="hidden md:block w-px h-24 bg-white/10" />
                <div className="flex-1">
                  <label htmlFor="scoreDate" className="text-xs uppercase tracking-widest text-[#889abb] font-bold block mb-3">Date Played</label>
                  <Input 
                    id="scoreDate" 
                    name="scoreDate" 
                    type="date" 
                    required 
                    inputSize="huge"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full"
                  />
                </div>
              </div>
              <SubmitScoreButton disabled={!subscriptionState.hasAccess} />
            </form>
            
            {/* Recent Mini-Scores */}
            <div className="mt-8 pt-6 border-t border-[var(--outline-variant)] flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-[var(--on-surface-variant)]">
              <span className="font-medium whitespace-nowrap">Latest entries:</span>
              <div className="flex flex-wrap gap-2">
                {scores.length === 0 ? <span className="italic">No scores yet</span> : scores.map((s: any) => (
                  <div key={s.id} className="px-3 py-1 rounded-md bg-[var(--surface-container-high)] text-white font-data text-xs flex gap-2">
                    <span className="text-[var(--primary)]">{s.score}</span> 
                    <span className="opacity-50">{new Date(s.score_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ASYMMETRIC SECONDARY SECTION */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* upcoming draw - left col, slightly larger */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <Card className="h-full p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Trophy className="w-32 h-32" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[var(--secondary)]" /> Upcoming Draw
              </h3>
              
              {upcomingDraw ? (
                <div className="mt-8 relative z-10">
                  <p className="font-data text-4xl text-white font-bold mb-2">{upcomingDraw.title}</p>
                  <div className="flex gap-3 mb-8">
                    <span className="px-3 py-1 rounded-full bg-[var(--surface-container-high)] text-xs text-[var(--secondary)] font-medium uppercase tracking-wider">{upcomingDraw.status}</span>
                    <span className="px-3 py-1 rounded-full bg-[var(--surface-container-high)] text-xs text-muted font-medium uppercase tracking-wider">{upcomingDraw.logic_mode}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 border-t border-[var(--outline-variant)] pt-6">
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">5-Match</p>
                      <p className="font-data text-xl text-white font-bold">₹{formatMoney(upcomingDraw.five_match_pool)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">4-Match</p>
                      <p className="font-data text-xl text-white font-bold">₹{formatMoney(upcomingDraw.four_match_pool)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">3-Match</p>
                      <p className="font-data text-xl text-white font-bold">₹{formatMoney(upcomingDraw.three_match_pool)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-8 text-[var(--on-surface-variant)] relative z-10 italic">No upcoming draw scheduled at the moment.</p>
              )}
            </Card>
          </motion.div>

          {/* Charity Preference - right col */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <Card variant="primary" className="h-full p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[var(--primary)]" /> Impact Direction
                </h3>
                <p className="text-[var(--on-surface-variant)] text-sm mb-6">Choose where your charity pool contributions are directed.</p>
              </div>

              <form action={updateCharityPreferenceAction} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-muted uppercase tracking-widest mb-2 block">Select Partner</label>
                  <select
                    id="charityId"
                    name="charityId"
                    defaultValue={profile?.charity_id ?? ""}
                    className="w-full bg-[var(--surface-container-high)] rounded-xl border border-[var(--outline-variant)] p-3 text-white appearance-none outline-none focus:border-[var(--primary)] transition-colors"
                    required
                  >
                    <option value="" disabled>Select a charity</option>
                    {charities.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted uppercase tracking-widest mb-2 block">Contribution Split</label>
                   <div className="flex gap-4 items-center">
                    <Input
                      id="contributionPercentage"
                      name="contributionPercentage"
                      type="number"
                      min={10} max={100}
                      defaultValue={profile?.charity_contribution_percentage ?? 10}
                      required mono
                      className="w-24 text-center"
                    />
                    <span className="text-sm text-muted">% to charity</span>
                   </div>
                </div>
                <SubmitCharityButton />
              </form>
            </Card>
          </motion.div>
        </div>

        {/* METRICS & HISTORY GRID */}
        <div className="grid gap-8 md:grid-cols-2 mt-4">
          <motion.div variants={itemVariants}>
            <Card className="h-full p-8 border-l-4 border-l-[var(--secondary)]">
              <h3 className="font-display text-xl font-bold text-white mb-6">Overall Participation</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase text-muted tracking-widest mb-1">Total Entries</p>
                  <p className="font-data text-4xl text-white font-bold">{totals.drawsEntered}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm border-b border-[var(--outline-variant)] pb-1">
                    <span className="text-[var(--on-surface-variant)]">5-Match</span>
                    <span className="font-data text-white font-bold">{totals.fiveMatches}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-[var(--outline-variant)] pb-1">
                    <span className="text-[var(--on-surface-variant)]">4-Match</span>
                    <span className="font-data text-white font-bold">{totals.fourMatches}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-[var(--outline-variant)] pb-1">
                    <span className="text-[var(--on-surface-variant)]">3-Match</span>
                    <span className="font-data text-white font-bold">{totals.threeMatches}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full p-8 border-l-4 border-l-[var(--tertiary)]">
              <h3 className="font-display text-xl font-bold text-white mb-6">Winnings & Payouts</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase text-muted tracking-widest mb-1">Total Won</p>
                  <p className="font-data text-4xl text-[var(--tertiary)] font-bold">₹{formatMoney(totals.totalWon)}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm border-b border-[var(--outline-variant)] pb-1">
                    <span className="text-[var(--success)]">Paid</span>
                    <span className="font-data text-white font-bold">₹{formatMoney(totals.totalPaid)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-[var(--outline-variant)] pb-1">
                    <span className="text-[var(--warning)]">Pending</span>
                    <span className="font-data text-white font-bold">₹{formatMoney(totals.totalPending)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* DETAILED LEDGERS */}
        <div className="grid lg:grid-cols-2 gap-8 mt-4">
          <motion.div variants={itemVariants}>
             <h3 className="font-display text-xl font-bold text-white mb-4 ml-2">Participation History</h3>
             <div className="space-y-3">
              {participants.length === 0 ? (
                <Card variant="data" className="p-6 text-center italic text-muted">No participation records yet.</Card>
              ) : participants.map((row: any) => {
                const draw = drawsMap[row.draw_id];
                return (
                  <Card variant="data" key={row.id} className="p-4 flex justify-between items-center hover:bg-[var(--surface-container-high)]">
                    <div>
                      <p className="font-bold text-white">{draw?.title ?? "Draw"}</p>
                      <p className="text-xs text-muted mb-1">{draw?.draw_month ? new Date(draw.draw_month).toDateString() : "-"} · Matches: {row.match_count}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">Tier: {row.prize_tier.replace("_", " ")}</p>
                      <p className="font-data text-sm font-bold text-[var(--secondary)]">₹{formatMoney(row.prize_amount)} projection</p>
                    </div>
                  </Card>
                )
              })}
             </div>
          </motion.div>

          <motion.div variants={itemVariants}>
             <h3 className="font-display text-xl font-bold text-white mb-4 ml-2">Winnings Actions</h3>
             <div className="space-y-3">
              {winnersWithProof.length === 0 ? (
                <Card variant="data" className="p-6 text-center italic text-muted">No winner records yet.</Card>
              ) : winnersWithProof.map((w: any) => {
                const draw = drawsMap[w.draw_id];
                return (
                  <Card variant="data" key={w.id} className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold text-white flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-[var(--success)]" /> {draw?.title ?? "Draw"} Payout
                        </p>
                        <p className="text-xs text-muted mt-1 uppercase tracking-wider">Tier: {w.prize_tier.replace("_", " ")}</p>
                      </div>
                      <p className="font-data text-2xl font-bold text-[var(--tertiary)]">₹{formatMoney(w.prize_amount)}</p>
                    </div>
                    
                    <div className="bg-[var(--surface-container-lowest)] rounded-lg p-3 text-xs mb-4 flex justify-between">
                      <span className="text-[var(--on-surface-variant)]">Verification: <b className="text-white">{w.verification_status.toUpperCase()}</b></span>
                      <span className="text-[var(--on-surface-variant)]">Payment: <b className="text-white">{w.payment_status.toUpperCase()}</b></span>
                    </div>

                    {w.proofLink ? (
                      <a href={w.proofLink} target="_blank" rel="noreferrer" className="text-xs text-[var(--primary)] font-bold hover:underline flex items-center gap-1">
                        View Uploaded Proof <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ) : (
                       w.verification_status === "pending" && <WinnerProofForm winnerId={w.id} />
                    )}
                  </Card>
                );
              })}
             </div>
          </motion.div>
        </div>

      </motion.div>
      </div>
    </div>
  );
}
