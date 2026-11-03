"use client";

import { useEffect, useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("Checking your secure recovery link…");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const run = async () => {
      const supabase = createClient();
      const url = new URL(window.location.href);
      try {
        const { data, error } = await supabase.auth.getUser();
        if (url.searchParams.has("error")) {
          throw new Error(url.searchParams.get("error") || "The recovery link could not be verified.");
        }
        if (error || !data.user) {
          throw new Error("The recovery session is missing or has expired. Request a new password reset email.");
        }
        window.history.replaceState({}, document.title, "/auth/reset-password");
        setMessage("Choose a new password for your Juneberries staff account.");
        setReady(true);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "This recovery link could not be verified. Request a new one.");
      }
    };
    void run();
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 8) { setMessage("Use a password with at least 8 characters."); return; }
    if (password !== confirm) { setMessage("The passwords do not match."); return; }
    setBusy(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessage("Your password has been updated. You can now sign in securely.");
      setReady(false);
      await supabase.auth.signOut();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Password update failed. Please request a new recovery link.");
    } finally {
      setBusy(false);
    }
  };

  return <main className="flex min-h-screen items-center justify-center bg-[#f8f7fa] px-5 py-12"><section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"><div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#eee7f7] text-[#542d80]"><LockKeyhole size={22}/></div><p className="text-[10px] font-bold tracking-[.2em] text-[#693b9c]">JUNEBERRIES STAFF PORTAL</p><h1 className="mt-2 text-2xl font-bold text-slate-900">Set a new password</h1><p className="mt-2 text-sm text-slate-500">Create a new password to regain secure access to your account.</p>{ready ? <form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-xs font-semibold text-slate-700">New password<input className="field mt-2" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)}/></label><label className="block text-xs font-semibold text-slate-700">Confirm new password<input className="field mt-2" type="password" autoComplete="new-password" minLength={8} required value={confirm} onChange={e=>setConfirm(e.target.value)}/></label><button disabled={busy} className="w-full rounded-xl bg-[#542d80] py-3 text-sm font-semibold text-white disabled:opacity-60">{busy?"Updating…":"Update password"}</button></form> : null}<p role="status" className="mt-5 rounded-xl border border-purple-100 bg-purple-50 p-3 text-xs leading-5 text-[#43245f]">{message}</p>{!ready && message.includes("updated") ? <a className="mt-5 block text-center text-sm font-semibold text-[#693b9c]" href="/login">Return to sign in</a> : null}<div className="mt-7 flex items-center gap-2 text-[11px] text-slate-500"><ShieldCheck size={15}/> Your password is handled securely by Supabase.</div></section></main>;
}
