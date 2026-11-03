"use client";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
export default function LoginPage(){
 const [email,E]=useState(""),[password,P]=useState(""),[show,S]=useState(false),[message,M]=useState("");
 return <main className="grid min-h-screen bg-[#f8f7fa] lg:grid-cols-[1.05fr_.95fr]">
  <section className="relative hidden overflow-hidden bg-[#291640] p-12 text-white lg:flex lg:flex-col lg:justify-between">
   <div className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full border border-white/10"/><div className="absolute -bottom-44 -left-24 h-[500px] w-[500px] rounded-full border border-white/10"/>
   <div className="relative flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-[#f4c542] text-xl font-black text-[#291640]">J</div><div><b className="tracking-wide">JUNEBERRIES</b><p className="text-[10px] tracking-[.22em] text-purple-200">SCHOOLS</p></div></div>
   <div className="relative max-w-xl"><p className="mb-5 text-[10px] font-bold tracking-[.24em] text-[#f4c542]">STAFF ADMINISTRATION</p><h1 className="text-5xl font-semibold leading-[1.13] tracking-tight">A thoughtful place to lead, support and grow.</h1><p className="mt-6 max-w-md text-sm leading-7 text-purple-100/80">One secure workspace for the people who make every child’s learning journey matter.</p><div className="mt-9 flex items-center gap-3 text-xs text-purple-100"><ShieldCheck size={17} className="text-[#f4c542]"/> Protected staff access</div></div>
   <p className="relative text-[11px] text-purple-200">Every Child Matters. Every Potential Counts.</p>
  </section>
  <section className="flex items-center justify-center px-5 py-12">
   <div className="w-full max-w-[410px]"><div className="mb-10 flex items-center gap-3 lg:hidden"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f4c542] font-black text-[#291640]">J</div><b className="text-sm tracking-wide">JUNEBERRIES SCHOOLS</b></div>
    <div className="mb-8"><div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[#eee7f7] text-[#542d80]"><LockKeyhole size={22}/></div><p className="text-[10px] font-bold tracking-[.2em] text-[#693b9c]">WELCOME BACK</p><h2 className="mt-2 text-3xl font-bold tracking-tight">Sign in to your portal</h2><p className="mt-2 text-sm text-slate-500">Use your authorised Juneberries staff account.</p></div>
    <form className="space-y-5" onSubmit={e=>{e.preventDefault();M("The sign-in interface is ready. Secure Supabase Auth connection is the next step; no credentials were sent.")}}>
     <label className="block text-xs font-semibold text-slate-700">Work email<input className="field mt-2" type="email" required autoComplete="username" placeholder="you@juneberriesschools.org" value={email} onChange={e=>E(e.target.value)}/></label>
     <label className="block text-xs font-semibold text-slate-700">Password<div className="relative mt-2"><input className="field pr-12" type={show?"text":"password"} required autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e=>P(e.target.value)}/><button type="button" onClick={()=>S(!show)} className="absolute right-3 top-3 text-slate-400">{show?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
     <div className="flex items-center justify-between text-xs"><label className="flex items-center gap-2 text-slate-500"><input type="checkbox" className="accent-[#542d80]"/> Remember me</label><button type="button" onClick={()=>M("Password recovery will be enabled with the Supabase Auth connection.")} className="font-semibold text-[#693b9c]">Forgot password?</button></div>
     <button className="w-full rounded-xl bg-[#542d80] py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/10 hover:bg-[#3d205f]">Continue <ArrowRight size={16} className="ml-2 inline"/></button>
    </form>
    {message&&<p role="status" className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">{message}</p>}
    <div className="mt-8 flex items-start gap-2 rounded-xl bg-white p-4 text-[11px] leading-5 text-slate-500 shadow-sm"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#693b9c]"/> Access is invitation-only. If you need an account, contact your Juneberries Super Administrator.</div>
    <p className="mt-10 text-center text-[10px] text-slate-400">© 2026 Juneberries Schools · Secure staff portal</p>
   </div>
  </section>
 </main>
}
