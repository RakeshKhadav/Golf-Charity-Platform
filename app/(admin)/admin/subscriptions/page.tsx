import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SubscriptionRowActions } from "@/features/admin/subscriptions/subscription-row-actions";

export default async function AdminSubscriptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { q, status } = await searchParams;

  let query = supabase
    .from("subscriptions")
    .select("id, user_id, plan_type, status, current_period_end, stripe_subscription_id, updated_at")
    .order("updated_at", { ascending: false })
    .limit(100);

  if (status === "active" || status === "cancelled" || status === "expired" || status === "past_due") {
    query = query.eq("status", status);
  }

  const { data: subscriptions, error } = await query;

  const userIds = Array.from(new Set((subscriptions ?? []).map((subscription) => subscription.user_id)));
  const { data: profiles } = userIds.length
    ? await supabase.from("profiles").select("id, email, full_name").in("id", userIds)
    : { data: [] as Array<{ id: string; email: string; full_name: string | null }> };

  const profileById = new Map((profiles ?? []).map((profile) => [profile.id, profile]));
  const queryText = q?.trim().toLowerCase();

  const filtered = (subscriptions ?? []).filter((subscription) => {
    if (!queryText) {
      return true;
    }

    const profile = profileById.get(subscription.user_id);
    const haystack = `${profile?.email ?? ""} ${profile?.full_name ?? ""}`.toLowerCase();
    return haystack.includes(queryText);
  });

  return (
    <section className="grid gap-6">
      <Card variant="glass">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white">Subscriptions</h1>
        <p className="mt-2 text-sm text-[var(--on-surface-variant)] opacity-70">Filter lifecycle state, adjust statuses, and refresh from Provider.</p>

        <form className="mt-6 flex flex-wrap gap-3 items-center p-4 rounded-2xl bg-white/5 border border-white/5">
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search by email or name"
            className="flex-1 min-w-[240px] h-[46px] rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-[var(--secondary)] transition-all"
          />
          <select
            name="status"
            defaultValue={status ?? ""}
            className="min-w-[140px] h-[46px] rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white outline-none focus:ring-2 focus:ring-[var(--secondary)] transition-all appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#0B0F1A]">All statuses</option>
            <option value="active" className="bg-[#0B0F1A]">Active</option>
            <option value="cancelled" className="bg-[#0B0F1A]">Cancelled</option>
            <option value="past_due" className="bg-[#0B0F1A]">Past Due</option>
            <option value="expired" className="bg-[#0B0F1A]">Expired</option>
          </select>
          <button type="submit" className="h-[46px] rounded-xl bg-[var(--primary)] hover:bg-[var(--primary)]/90 px-8 text-sm font-bold text-white transition-all shadow-lg shadow-[var(--primary)]/20 active:scale-95">
            Apply
          </button>
        </form>
      </Card>

      <Card variant="glass">
        {error ? <p className="text-sm text-[var(--error)]">{error.message}</p> : null}
        <div className="space-y-3">
          {filtered.map((subscription) => {
            const profile = profileById.get(subscription.user_id);
            const email = profile?.email ?? "Unknown";

            return (
              <div key={subscription.id} className="surface-mid rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                <p className="font-bold text-white tracking-tight">{email}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[var(--on-surface-variant)] uppercase font-bold tracking-widest opacity-60">
                  <span className="text-[var(--primary)]">{subscription.plan_type}</span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span className={subscription.status === "active" ? "text-[var(--secondary)]" : "text-[var(--error)]/60"}>
                    {subscription.status}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span className="opacity-40">Period End: {subscription.current_period_end ? new Date(subscription.current_period_end).toDateString() : "N/A"}</span>
                </div>
                <p className="mt-2 text-[10px] text-[var(--on-surface-variant)] font-data opacity-40">
                  REF: {subscription.stripe_subscription_id ?? "not-synced"}
                </p>
                <div className="mt-3">
                  <SubscriptionRowActions
                    subscriptionId={subscription.id}
                    userId={subscription.user_id}
                    userEmail={email}
                    status={subscription.status}
                  />
                </div>
              </div>
            );
          })}

          {filtered.length === 0 ? <p className="text-sm text-muted">No subscriptions match this filter.</p> : null}
        </div>
      </Card>
    </section>
  );
}