import type { ReactNode } from "react";
import { PublicHeader } from "@/components/shell/public-header";
import { AppHeader } from "@/components/shell/app-header";
import { getSessionUser } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { getLatestSubscriptionForUser } from "@/lib/subscriptions/status";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  const supabase = await createSupabaseServerClient();
  let isAdmin = false;
  let isPremium = false;

  if (user) {
    const { data } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    isAdmin = data?.role === "admin";
    
    const { hasAccess } = await getLatestSubscriptionForUser(supabase, user.id, {
      userEmail: user.email,
      syncFromProvider: false
    });
    isPremium = hasAccess;
  }

  return (
    <>
      {user ? <AppHeader isAdmin={isAdmin} isPremium={isPremium} /> : <PublicHeader />}
      <main className="flex-1 pt-28">{children}</main>
    </>
  );
}
