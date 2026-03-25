import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { AddCharityForm } from "@/features/admin/charities/add-charity-form";
import { CreateDrawForm } from "@/features/admin/draws/create-draw-form";
import { DrawRowActions } from "@/features/admin/draws/draw-row-actions";
import { WINNER_PROOF_BUCKET } from "@/features/winners/constants";

import { formatINR } from "@/lib/utils/currency";

export default async function AdminPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();

  const [
    { count: userCount },
    { count: charityCount },
    { count: drawCount },
    { count: activeSubscriberCount },
    { count: pendingWinnerCount },
    { data: draws },
    { data: pendingWinners },
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("charities").select("id", { count: "exact", head: true }),
    supabase.from("draws").select("id", { count: "exact", head: true }),
    supabase.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("winners").select("id", { count: "exact", head: true }).eq("verification_status", "pending"),
    supabase
      .from("draws")
      .select(
        "id, draw_month, title, status, logic_mode, weighted_seed, winner_pool, five_match_pool, four_match_pool, three_match_pool, five_match_rollover_out, eligible_count",
      )
      .order("draw_month", { ascending: false })
      .limit(6),
    supabase
      .from("winners")
      .select("id, draw_id, user_id, prize_tier, prize_amount, verification_status, payment_status, proof_url, created_at")
      .eq("verification_status", "pending")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const pendingWinnerUserIds = Array.from(new Set((pendingWinners ?? []).map((winner) => winner.user_id)));
  const { data: pendingWinnerProfiles } = pendingWinnerUserIds.length
    ? await supabase.from("profiles").select("id, full_name, email").in("id", pendingWinnerUserIds)
    : { data: [] as Array<{ id: string; full_name: string | null; email: string }> };

  const profileById = new Map((pendingWinnerProfiles ?? []).map((profile) => [profile.id, profile]));
  const admin = createSupabaseAdminClient();

  const pendingWinnerLinks = await Promise.all(
    (pendingWinners ?? []).map(async (winner) => {
      let proofLink: string | null = null;

      if (winner.proof_url) {
        if (winner.proof_url.startsWith("http://") || winner.proof_url.startsWith("https://")) {
          proofLink = winner.proof_url;
        } else {
          const { data } = await admin.storage.from(WINNER_PROOF_BUCKET).createSignedUrl(winner.proof_url, 60 * 15);
          proofLink = data?.signedUrl ?? null;
        }
      }

      return {
        ...winner,
        proofLink,
      };
    }),
  );

  return (
    <section className="grid gap-6 md:grid-cols-4">
      <Card variant="data">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--on-surface-variant)] opacity-60">Total Users</p>
        <p className="font-display mt-2 text-3xl font-black text-white">{userCount ?? 0}</p>
      </Card>
      <Card variant="data">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--on-surface-variant)] opacity-60">Active Subscribers</p>
        <p className="font-display mt-2 text-3xl font-black text-[var(--secondary)]">{activeSubscriberCount ?? 0}</p>
      </Card>
      <Card variant="data">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--on-surface-variant)] opacity-60">Charities</p>
        <p className="font-display mt-2 text-3xl font-black text-white">{charityCount ?? 0}</p>
      </Card>
      <Card variant="data">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--on-surface-variant)] opacity-60">Pending Verifications</p>
        <p className="font-display mt-2 text-3xl font-black text-[var(--tertiary)]">{pendingWinnerCount ?? 0}</p>
      </Card>

      <Card variant="glass" className="md:col-span-2">
        <h2 className="font-display text-2xl font-bold tracking-tight text-white">Create Draw</h2>
        <p className="mt-2 text-sm text-[var(--on-surface-variant)] opacity-70">PRD tier split and rollover are auto-computed by draw engine v2.</p>
        <div className="mt-6">
          <CreateDrawForm />
        </div>
      </Card>

      <Card variant="glass" className="md:col-span-2">
        <h2 className="font-display text-2xl font-bold tracking-tight text-white">Add Charity</h2>
        <p className="mt-2 text-sm text-[var(--on-surface-variant)] opacity-70">Create a new charity and publish it to the public directory.</p>
        <div className="mt-6">
          <AddCharityForm />
        </div>
      </Card>

      <Card variant="glass" className="md:col-span-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white">Recent Draws</h2>
          <Link href="/admin/draws">
            <Button variant="secondary" className="h-8 px-3 text-[10px] font-bold uppercase tracking-wider">
              Open Module
            </Button>
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {(draws ?? []).length === 0 ? (
            <p className="text-sm text-muted">No draws created yet.</p>
          ) : (
            draws?.map((draw) => (
              <div key={draw.id} className="surface-mid rounded-2xl p-3">
                <p className="font-semibold text-on-surface">{draw.title}</p>
                <p className="font-data mt-1 text-xs text-muted">
                  {new Date(draw.draw_month).toDateString()} · {draw.status.toUpperCase()} · {draw.logic_mode.toUpperCase()}
                </p>
                <p className="mt-2 text-xs text-[var(--on-surface-variant)]">
                  Winner <span className="text-white font-bold">{formatINR(draw.winner_pool)}</span> · 5-M <span className="text-white">{formatINR(draw.five_match_pool)}</span> · 4-M <span className="text-white">{formatINR(draw.four_match_pool)}</span> · 3-M <span className="text-white">{formatINR(draw.three_match_pool)}</span>
                </p>
                <p className="mt-1 text-xs text-[var(--on-surface-variant)]">
                  Eligible <span className="text-white font-medium">{draw.eligible_count}</span> · Rollover Out <span className="text-[var(--tertiary)] font-bold">{formatINR(draw.five_match_rollover_out)}</span>
                  {draw.weighted_seed ? ` · Seed ${draw.weighted_seed}` : ""}
                </p>
                <div className="mt-3">
                  <DrawRowActions
                    drawId={draw.id}
                    status={draw.status}
                    logicMode={draw.logic_mode}
                    weightedSeed={draw.weighted_seed}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Card variant="glass" className="md:col-span-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white">Winner Queue</h2>
          <Link href="/admin/winners">
            <Button variant="secondary" className="h-8 px-3 text-[10px] font-bold uppercase tracking-wider">
              Open Module
            </Button>
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {pendingWinnerLinks.length === 0 ? (
            <p className="text-sm text-muted">No pending winner verification records.</p>
          ) : (
            pendingWinnerLinks.map((winner) => {
              const profile = profileById.get(winner.user_id);
              return (
                <div key={winner.id} className="surface-mid rounded-2xl p-3">
                  <p className="font-semibold text-on-surface">{profile?.full_name || profile?.email || winner.user_id}</p>
                  <p className="mt-1 text-xs text-[var(--on-surface-variant)]">
                    {winner.prize_tier.replace("_", " ").toUpperCase()} · Prize <span className="text-white font-bold">{formatINR(winner.prize_amount)}</span>
                  </p>
                  <p className="mt-1 text-xs text-[var(--on-surface-variant)] opacity-60">
                    {winner.verification_status.toUpperCase()} · Payment {winner.payment_status.toUpperCase()} · {new Date(winner.created_at).toDateString()}
                  </p>
                  {winner.proofLink ? (
                    <a href={winner.proofLink} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-[var(--primary)]">
                      Open uploaded PDF
                    </a>
                  ) : (
                    <p className="mt-2 text-xs text-muted">No proof uploaded yet.</p>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="mt-4">
          <Link href="/admin/analytics">
            <Button>Go to Analytics</Button>
          </Link>
        </div>
      </Card>

      <Card variant="glass" className="md:col-span-4 py-6">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--on-surface-variant)] opacity-60">Admin Quick Access</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/admin/users"><Button variant="secondary" className="h-8 px-4 text-[10px] font-bold uppercase tracking-wider">Users</Button></Link>
          <Link href="/admin/subscriptions"><Button variant="secondary" className="h-8 px-4 text-[10px] font-bold uppercase tracking-wider">Subscriptions</Button></Link>
          <Link href="/admin/scores"><Button variant="secondary" className="h-8 px-4 text-[10px] font-bold uppercase tracking-wider">Scores</Button></Link>
          <Link href="/admin/draws"><Button variant="secondary" className="h-8 px-4 text-[10px] font-bold uppercase tracking-wider">Draws</Button></Link>
          <Link href="/admin/charities"><Button variant="secondary" className="h-8 px-4 text-[10px] font-bold uppercase tracking-wider">Charities</Button></Link>
          <Link href="/admin/winners"><Button variant="secondary" className="h-8 px-4 text-[10px] font-bold uppercase tracking-wider">Winners</Button></Link>
          <Link href="/admin/analytics"><Button variant="secondary" className="h-8 px-4 text-[10px] font-bold uppercase tracking-wider">Analytics</Button></Link>
        </div>
      </Card>

      <Card variant="data" className="md:col-span-4">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--on-surface-variant)] opacity-60">Total draws tracked</p>
        <p className="font-display mt-2 text-3xl font-black text-white">{drawCount ?? 0}</p>
      </Card>
    </section>
  );
}