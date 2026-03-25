import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AddCharityForm } from "@/features/admin/charities/add-charity-form";
import { CharityRowActions } from "@/features/admin/charities/charity-row-actions";
import { cn } from "@/lib/utils/cn";

export default async function AdminCharitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { q } = await searchParams;

  let query = supabase
    .from("charities")
    .select("id, name, slug, description, tags, featured, is_published, is_active, updated_at")
    .order("featured", { ascending: false })
    .order("updated_at", { ascending: false })
    .limit(80);

  if (q?.trim()) {
    query = query.or(`name.ilike.%${q.trim()}%,description.ilike.%${q.trim()}%`);
  }

  const { data: charities, error } = await query;

  return (
    <section className="grid gap-6">
      <Card variant="glass">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white">Charities</h1>
        <p className="mt-2 text-sm text-[var(--on-surface-variant)] opacity-70">Manage publish/active/featured state and rich profile metadata.</p>

        <form className="mt-6 flex flex-wrap gap-3 items-center p-4 rounded-2xl bg-white/5 border border-white/5">
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search by charity name or description"
            className="flex-1 min-w-[300px] h-[46px] rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-[var(--secondary)] transition-all"
          />
          <button type="submit" className="h-[46px] rounded-xl bg-[var(--primary)] hover:bg-[var(--primary)]/90 px-8 text-sm font-bold text-white transition-all shadow-lg shadow-[var(--primary)]/20 active:scale-95">
            Search
          </button>
        </form>
      </Card>

      <Card variant="glass">
        <h2 className="font-display text-xl font-bold tracking-tight text-white">Add Charity</h2>
        <div className="mt-6">
          <AddCharityForm />
        </div>
      </Card>

      <Card variant="glass">
        {error ? <p className="text-sm text-[var(--error)]">{error.message}</p> : null}

        <div className="space-y-3">
          {(charities ?? []).map((charity) => (
            <div key={charity.id} className="surface-mid rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors">
              <p className="font-bold text-white tracking-tight">{charity.name}</p>
              <p className="font-data mt-1 text-xs text-[var(--on-surface-variant)] opacity-60">/{charity.slug}</p>
              <p className="mt-2 text-xs text-[var(--on-surface-variant)] flex items-center gap-3">
                <span className="text-white/40">{(charity.tags ?? []).length > 0 ? (charity.tags ?? []).slice(0, 3).join(", ") : "No tags"}</span>
                <span className="w-1 h-1 rounded-full bg-white/10" />
                <span className={cn(charity.featured ? "text-[var(--primary)]" : "text-white/20")}>{charity.featured ? "Featured" : "Standard"}</span>
                <span className="w-1 h-1 rounded-full bg-white/10" />
                <span className={cn(charity.is_published ? "text-[var(--secondary)]" : "text-[var(--error)]/60")}>{charity.is_published ? "Published" : "Draft"}</span>
                <span className="w-1 h-1 rounded-full bg-white/10" />
                <span className={cn(charity.is_active ? "text-[var(--tertiary)]" : "text-white/20")}>{charity.is_active ? "Active" : "Inactive"}</span>
              </p>
              <div className="mt-3">
                <CharityRowActions charity={charity} />
              </div>
            </div>
          ))}

          {(charities ?? []).length === 0 ? <p className="text-sm text-muted">No charities found.</p> : null}
        </div>
      </Card>
    </section>
  );
}