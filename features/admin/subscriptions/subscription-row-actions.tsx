"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import {
  refreshSubscriptionFromProviderAction,
  updateSubscriptionStatusAction,
} from "@/features/admin/subscriptions/actions";
import type { SubscriptionStatus } from "@/lib/supabase/types";

const initialState = {
  error: "",
  success: "",
};

export function SubscriptionRowActions({
  subscriptionId,
  userId,
  userEmail,
  status,
}: {
  subscriptionId: string;
  userId: string;
  userEmail: string;
  status: SubscriptionStatus;
}) {
  const [refreshState, refreshFormAction, refreshPending] = useActionState(refreshSubscriptionFromProviderAction, initialState);

  const statusColors: Record<string, string> = {
    active: "text-[var(--secondary)]",
    cancelled: "text-[var(--error)]/70",
    past_due: "text-[var(--tertiary)]",
    expired: "text-[var(--on-surface-variant)] opacity-50",
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4 h-[42px] px-4 rounded-xl bg-white/5 border border-white/10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Status</span>
        <span className={cn("text-xs font-bold uppercase tracking-wider", statusColors[status] || "text-white")}>
          {status}
        </span>
      </div>

      <form action={refreshFormAction}>
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="userEmail" value={userEmail} />
        <Button type="submit" disabled={refreshPending} className="h-[38px] text-xs">
          {refreshPending ? "Refreshing..." : "Refresh from Lemon Squeezy"}
        </Button>
      </form>

      {refreshState.error ? <p className="text-xs text-[var(--error)]">{refreshState.error}</p> : null}
      {refreshState.success ? <p className="text-xs text-[var(--success)]">{refreshState.success}</p> : null}
    </div>
  );
}