import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "../dashboard-client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/login");
  const { data: profile } = await supabase.from("staff_profiles").select("id,email,display_name,role,status").eq("id", user.id).maybeSingle();
  if (!profile || profile.status !== "active") {
    await supabase.auth.signOut();
    redirect("/login?error=unauthorised");
  }
  if (profile.role !== "super_administrator") redirect("/login?error=role");
  return <DashboardClient initialProfile={profile} />;
}
