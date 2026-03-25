import type { ReactNode } from "react";
import { AppHeader } from "@/components/shell/app-header";
import { AdminNav } from "@/components/shell/admin-nav";
import { requireAdmin, getSessionUser } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLatestSubscriptionForUser } from "@/lib/subscriptions/status";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();
  const user = await getSessionUser();
  const supabase = await createSupabaseServerClient();
  
  if (!user) return null;

  const { hasAccess } = await getLatestSubscriptionForUser(supabase, user.id, {
    userEmail: user.email,
    syncFromProvider: false
  });

  return (
    <>
      <AppHeader isAdmin isPremium={hasAccess} />
      <main className="flex-1 pt-28">
        <div className="mx-auto w-[min(1200px,95%)] py-8">
          <AdminNav />
          <div className="mt-4">{children}</div>
        </div>
      </main>
    </>
  );
}