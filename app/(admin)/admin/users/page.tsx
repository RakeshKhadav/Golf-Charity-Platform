import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UserRowActions } from "@/features/admin/users/user-row-actions";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { q } = await searchParams;
  const queryText = q?.trim();

  let query = supabase
    .from("profiles")
    .select("id, full_name, email, role, created_at")
    .order("created_at", { ascending: false })
    .limit(60);

  if (queryText) {
    query = query.or(`full_name.ilike.%${queryText}%,email.ilike.%${queryText}%`);
  }

  const { data: users, error } = await query;

  return (
    <section className="grid gap-6">
      <Card variant="glass">
        <h1 className="font-display text-2xl font-bold tracking-tight text-white">Users</h1>
        <p className="mt-2 text-sm text-[var(--on-surface-variant)] opacity-70">Search and update profile basics and role assignments.</p>

        <form className="mt-6 flex flex-wrap gap-3 items-center p-4 rounded-2xl bg-white/5 border border-white/5">
          <input
            name="q"
            defaultValue={queryText ?? ""}
            placeholder="Search name or email"
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
          {(users ?? []).map((user) => (
            <div key={user.id} className="surface-mid rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors">
              <p className="font-bold text-white tracking-tight">{user.email}</p>
              <p className="mt-1 text-xs text-[var(--on-surface-variant)] opacity-60">Joined {new Date(user.created_at).toDateString()}</p>
              <div className="mt-4">
                <UserRowActions userId={user.id} fullName={user.full_name} role={user.role} />
              </div>
            </div>
          ))}

          {(users ?? []).length === 0 ? <p className="text-sm text-muted">No users found.</p> : null}
        </div>
      </Card>
    </section>
  );
}