import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ScoreRowActions } from "@/features/admin/scores/score-row-actions";

export default async function AdminScoresPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { q } = await searchParams;

  const { data: scores, error } = await supabase
    .from("golf_scores")
    .select("id, user_id, score, score_date, created_at")
    .order("score_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(120);

  const userIds = Array.from(new Set((scores ?? []).map((score) => score.user_id)));
  const { data: profiles } = userIds.length
    ? await supabase.from("profiles").select("id, email, full_name").in("id", userIds)
    : { data: [] as Array<{ id: string; email: string; full_name: string | null }> };

  const profileById = new Map((profiles ?? []).map((profile) => [profile.id, profile]));
  const queryText = q?.trim().toLowerCase();

  const filtered = (scores ?? []).filter((score) => {
    if (!queryText) {
      return true;
    }

    const profile = profileById.get(score.user_id);
    const haystack = `${profile?.email ?? ""} ${profile?.full_name ?? ""}`.toLowerCase();
    return haystack.includes(queryText);
  });

  return (
    <section className="grid gap-6">
      <Card variant="glass">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white">Scores</h1>
        <p className="mt-2 text-sm text-[var(--on-surface-variant)] opacity-70">Review and correct user score history with 1-45 guardrails.</p>

        <form className="mt-6 flex flex-wrap gap-3 items-center p-4 rounded-2xl bg-white/5 border border-white/5">
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search by user email or name"
            className="flex-1 min-w-[300px] h-[46px] rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-[var(--secondary)] transition-all"
          />
          <button type="submit" className="h-[46px] rounded-xl bg-[var(--primary)] hover:bg-[var(--primary)]/90 px-8 text-sm font-bold text-white transition-all shadow-lg shadow-[var(--primary)]/20 active:scale-95">
            Search
          </button>
        </form>
      </Card>

      <Card variant="glass">
        {error ? <p className="text-sm text-[var(--error)]">{error.message}</p> : null}
        <div className="space-y-3">
          {filtered.map((score) => {
            const profile = profileById.get(score.user_id);

            return (
              <div key={score.id} className="surface-mid rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                <p className="font-bold text-white tracking-tight">{profile?.email ?? score.user_id}</p>
                <p className="mt-1 text-xs text-[var(--on-surface-variant)] opacity-60">
                  Stored {new Date(score.created_at).toDateString()} · Score Date {new Date(score.score_date).toDateString()}
                </p>
                <div className="mt-4">
                  <ScoreRowActions scoreId={score.id} score={score.score} scoreDate={score.score_date} />
                </div>
              </div>
            );
          })}

          {filtered.length === 0 ? <p className="text-sm text-muted">No score records found.</p> : null}
        </div>
      </Card>
    </section>
  );
}