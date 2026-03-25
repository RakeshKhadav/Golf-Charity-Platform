import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatINR } from "@/lib/utils/currency";

export default async function AdminAnalyticsPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const [
    { count: totalUsers },
    { count: activeSubscribers },
    { count: totalDraws },
    { count: publishedDraws },
    { count: pendingVerification },
    { count: pendingPayouts },
    { data: draws },
    { data: winners },
    { data: charities },
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("draws").select("id", { count: "exact", head: true }),
    supabase.from("draws").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("winners").select("id", { count: "exact", head: true }).eq("verification_status", "pending"),
    supabase.from("winners").select("id", { count: "exact", head: true }).eq("payment_status", "pending"),
    supabase
      .from("draws")
      .select("winner_pool, charity_pool, five_match_rollover_out, status")
      .order("draw_month", { ascending: false })
      .limit(120),
    supabase.from("winners").select("prize_amount, payment_status").limit(3000),
    supabase.from("charities").select("total_raised").limit(200),
  ]);

  const totalWinnerPools = (draws ?? []).reduce((acc, draw) => acc + Number(draw.winner_pool ?? 0), 0);
  const totalCharityPools = (draws ?? []).reduce((acc, draw) => acc + Number(draw.charity_pool ?? 0), 0);
  const totalRolloverOut = (draws ?? []).reduce((acc, draw) => acc + Number(draw.five_match_rollover_out ?? 0), 0);

  const totalPrizes = (winners ?? []).reduce((acc, winner) => acc + Number(winner.prize_amount ?? 0), 0);
  const totalPaidPrizes = (winners ?? [])
    .filter((winner) => winner.payment_status === "paid")
    .reduce((acc, winner) => acc + Number(winner.prize_amount ?? 0), 0);

  const totalRaisedTracked = (charities ?? []).reduce((acc, charity) => acc + Number(charity.total_raised ?? 0), 0);

  return (
    <section className="grid gap-6 md:grid-cols-3">
      <Card variant="data">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--on-surface-variant)] opacity-60">Total users</p>
        <p className="font-display mt-3 text-4xl font-black text-white">{totalUsers ?? 0}</p>
      </Card>
      <Card variant="data">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--on-surface-variant)] opacity-60">Active subscribers</p>
        <p className="font-display mt-3 text-4xl font-black text-[var(--secondary)]">{activeSubscribers ?? 0}</p>
      </Card>
      <Card variant="data">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--on-surface-variant)] opacity-60">Published draws</p>
        <p className="font-display mt-3 text-4xl font-black text-white">{publishedDraws ?? 0}</p>
      </Card>

      <Card variant="glass">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--on-surface-variant)]">Total draws</p>
        <p className="font-display mt-3 text-3xl font-bold text-white/90">{totalDraws ?? 0}</p>
      </Card>
      <Card variant="glass">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--on-surface-variant)]">Pending verification</p>
        <p className="font-display mt-3 text-3xl font-bold text-[var(--tertiary)]">{pendingVerification ?? 0}</p>
      </Card>
      <Card variant="glass">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--on-surface-variant)]">Pending payouts</p>
        <p className="font-display mt-3 text-3xl font-bold text-[var(--primary)]">{pendingPayouts ?? 0}</p>
      </Card>

      <Card variant="data">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--on-surface-variant)] opacity-60">Winner pools tracked</p>
        <p className="font-display mt-3 text-3xl font-bold text-white">{formatINR(totalWinnerPools)}</p>
      </Card>
      <Card variant="data">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--on-surface-variant)] opacity-60">Charity pools tracked</p>
        <p className="font-display mt-3 text-3xl font-bold text-[var(--secondary)]">{formatINR(totalCharityPools)}</p>
      </Card>
      <Card variant="data">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--on-surface-variant)] opacity-60">5-match rollover total</p>
        <p className="font-display mt-3 text-3xl font-bold text-[var(--tertiary)]">{formatINR(totalRolloverOut)}</p>
      </Card>

      <Card variant="glass">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--on-surface-variant)]">Total prizes</p>
        <p className="font-display mt-3 text-3xl font-bold text-white/90">{formatINR(totalPrizes)}</p>
      </Card>
      <Card variant="glass">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--on-surface-variant)]">Paid prizes</p>
        <p className="font-display mt-3 text-3xl font-bold text-[var(--secondary)]/80">{formatINR(totalPaidPrizes)}</p>
      </Card>
      <Card variant="glass">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--on-surface-variant)]">Charity raised tracked</p>
        <p className="font-display mt-3 text-3xl font-bold text-white/90">{formatINR(totalRaisedTracked)}</p>
      </Card>
    </section>
  );
}