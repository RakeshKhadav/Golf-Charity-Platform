"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { updateUserProfileAction } from "@/features/admin/users/actions";
import type { ProfileRole } from "@/lib/supabase/types";

const initialState = {
  error: "",
  success: "",
};

export function UserRowActions({
  userId,
  fullName,
  role,
}: {
  userId: string;
  fullName: string | null;
  role: ProfileRole;
}) {
  const [state, formAction, pending] = useActionState(updateUserProfileAction, initialState);

  return (
    <form action={formAction} className="grid gap-2 md:grid-cols-[2fr_1fr_auto] md:items-end">
      <input type="hidden" name="userId" value={userId} />
      <div className="flex-1 h-[42px] flex items-center px-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
        <span className="text-xs text-white/50 truncate">
          {fullName || "No name set"}
        </span>
      </div>
      <select
        name="role"
        defaultValue={role}
        className="h-[42px] rounded-xl bg-white/5 border border-white/10 px-3 text-xs text-white outline-none focus:ring-2 focus:ring-[var(--secondary)] transition-all cursor-pointer"
      >
        <option value="subscriber" className="bg-[#0B0F1A]" disabled={role === "admin"}>Subscriber</option>
        <option value="admin" className="bg-[#0B0F1A]">Admin</option>
      </select>
      <Button type="submit" variant="secondary" disabled={pending} className="h-[42px] text-xs">
        {pending ? "Saving..." : "Save"}
      </Button>

      {state.error ? <p className="md:col-span-3 text-xs text-[var(--error)]">{state.error}</p> : null}
      {state.success ? <p className="md:col-span-3 text-xs text-[var(--success)]">{state.success}</p> : null}
    </form>
  );
}