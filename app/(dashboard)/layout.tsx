import type { ReactNode } from "react";
import { AppHeader } from "@/components/shell/app-header";
import { requireUser } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLatestSubscriptionForUser } from "@/lib/subscriptions/status";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();
  const supabase = await createSupabaseServerClient();
  const { hasAccess } = await getLatestSubscriptionForUser(supabase, user.id, { 
    userEmail: user.email, 
    syncFromProvider: true 
  });

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  const isAdmin = profile?.role === "admin";

  return (
    <>
      <AppHeader isPremium={hasAccess} isAdmin={isAdmin} />
      <main className="flex-1 pt-28">{children}</main>
    </>
  );
}
