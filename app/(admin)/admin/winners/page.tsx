import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { WinnerRowActions } from "@/features/admin/winners/winner-row-actions";
import { WINNER_PROOF_BUCKET } from "@/features/winners/constants";

import { formatINR } from "@/lib/utils/currency";

export default async function AdminWinnersPage({
  searchParams,
}: {
  searchParams: Promise<{ verification?: string; payment?: string }>;
}) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { verification, payment } = await searchParams;

  let query = supabase
    .from("winners")
    .select(
      "id, draw_id, user_id, prize_tier, prize_amount, verification_status, verification_notes, payment_status, payment_reference, payment_paid_at, proof_url, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(120);

  if (verification === "pending" || verification === "approved" || verification === "rejected") {
    query = query.eq("verification_status", verification);
  }

  if (payment === "pending" || payment === "paid") {
    query = query.eq("payment_status", payment);
  }

  const { data: winners, error } = await query;

  const drawIds = Array.from(new Set((winners ?? []).map((winner) => winner.draw_id)));
  const userIds = Array.from(new Set((winners ?? []).map((winner) => winner.user_id)));

  const [{ data: draws }, { data: profiles }] = await Promise.all([
    drawIds.length
      ? supabase.from("draws").select("id, title, draw_month").in("id", drawIds)
      : Promise.resolve({ data: [] as Array<{ id: string; title: string; draw_month: string }> }),
    userIds.length
      ? supabase.from("profiles").select("id, full_name, email").in("id", userIds)
      : Promise.resolve({ data: [] as Array<{ id: string; full_name: string | null; email: string }> }),
  ]);

  const drawById = new Map((draws ?? []).map((draw) => [draw.id, draw]));
  const profileById = new Map((profiles ?? []).map((profile) => [profile.id, profile]));
  const admin = createSupabaseAdminClient();

  const rows = await Promise.all(
    (winners ?? []).map(async (winner) => {
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
    <section className="grid gap-6">
      <Card variant="glass">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white">Winners</h1>
        <p className="mt-2 text-sm text-[var(--on-surface-variant)] opacity-70">Review verification queue and complete payout operations.</p>

        <form className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end p-4 rounded-2xl bg-white/5 border border-white/5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--on-surface-variant)] ml-1">Verification</label>
            <select
              name="verification"
              defaultValue={verification ?? ""}
              className="w-full h-[46px] rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white outline-none focus:ring-2 focus:ring-[var(--secondary)] transition-all"
            >
              <option value="">All states</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--on-surface-variant)] ml-1">Payment</label>
            <select
              name="payment"
              defaultValue={payment ?? ""}
              className="w-full h-[46px] rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white outline-none focus:ring-2 focus:ring-[var(--secondary)] transition-all"
            >
              <option value="">All states</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <button type="submit" className="h-[46px] rounded-xl bg-[var(--primary)] hover:bg-[var(--primary)]/90 px-8 text-sm font-bold text-white transition-all shadow-lg shadow-[var(--primary)]/20 active:scale-95">
            Apply
          </button>
        </form>
      </Card>

      <Card variant="glass">
        {error ? <p className="text-sm text-[var(--error)]">{error.message}</p> : null}

        <div className="space-y-3">
          {rows.map((winner) => {
            const draw = drawById.get(winner.draw_id);
            const profile = profileById.get(winner.user_id);

            return (
              <div key={winner.id} className="surface-mid rounded-2xl p-3">
                <p className="font-semibold text-on-surface">{profile?.full_name || profile?.email || winner.user_id}</p>
                <p className="mt-1 text-xs text-[var(--on-surface-variant)]">
                  {draw?.title ?? winner.draw_id} · {winner.prize_tier.replace("_", " ").toUpperCase()} · Prize <span className="text-white font-bold">{formatINR(winner.prize_amount)}</span>
                </p>
                <p className="mt-1 text-xs text-muted">
                  Verification {winner.verification_status.toUpperCase()} · Payment {winner.payment_status.toUpperCase()}
                </p>
                {winner.payment_reference ? (
                  <p className="mt-1 text-xs text-muted font-data">Payment ref: {winner.payment_reference}</p>
                ) : null}
                {winner.proofLink ? (
                  <a href={winner.proofLink} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-[var(--primary)]">
                    Open uploaded PDF
                  </a>
                ) : (
                  <p className="mt-2 text-xs text-muted">No uploaded proof yet.</p>
                )}

                <div className="mt-3">
                  <WinnerRowActions winner={winner} />
                </div>
              </div>
            );
          })}

          {rows.length === 0 ? <p className="text-sm text-muted">No winner records found.</p> : null}
        </div>
      </Card>
    </section>
  );
}