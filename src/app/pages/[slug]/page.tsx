import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type DesignSection = { id:string; html:string; background:string; color:string; padding:number; margin:number; border:string; radius:number; width:string; align:string; fontSize:number; columns:number; shadow:string };
type DesignDocument = { version:number; description?:string; sections:DesignSection[] };

function cleanHtml(input:string) {
  return input
    .replace(/<\s*(script|style|iframe|object|embed|form|input|button|textarea|video|audio)[^>]*>[\s\S]*?<\/\s*\1\s*>/gi,"")
    .replace(/<\s*(script|style|iframe|object|embed|form|input|button|textarea|video|audio)[^>]*\/?>/gi,"")
    .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,"")
    .replace(/\s+(href|src)\s*=\s*("|')\s*javascript:[\s\S]*?\2/gi,"")
    .replace(/srcdoc\s*=\s*("[^"]*"|'[^']*')/gi,"");
}

function validColor(value:string,fallback:string){return /^(#[0-9a-fA-F]{3,8}|rgba?\([0-9.,%\s]+\))$/.test(value)?value:fallback;}
function validNumber(value:number,min:number,max:number,fallback:number){return Number.isFinite(value)?Math.min(max,Math.max(min,value)):fallback;}
function renderSection(section:DesignSection,index:number){
  const background=validColor(section.background,"#ffffff");
  const color=validColor(section.color,"#30213b");
  const padding=validNumber(section.padding,0,120,32);
  const margin=validNumber(section.margin,0,100,0);
  const radius=validNumber(section.radius,0,60,18);
  const fontSize=validNumber(section.fontSize,12,32,16);
  const width=/^(100%|[0-9]{3,4}px)$/.test(section.width)?section.width:"1200px";
  const align=["left","center","right"].includes(section.align)?section.align:"left";
  const columns=[1,2,3].includes(section.columns)?section.columns:1;
  const border=["none","1px solid #eeeaf2","1px solid #d6c4e4","2px solid #563477","1px dashed #b9a4c9"].includes(section.border)?section.border:"1px solid #eeeaf2";
  const shadow=["none","0 8px 24px rgba(41,22,64,.08)","0 16px 40px rgba(41,22,64,.14)"].includes(section.shadow)?section.shadow:"none";
  const html=cleanHtml(typeof section.html==="string"?section.html:"");
  return <section key={section.id||index} style={{background,color,padding:padding+"px "+Math.min(padding,48)+"px",margin:margin+"px auto",border,borderRadius:radius+"px",maxWidth:width,textAlign:align as "left"|"center"|"right",fontSize:fontSize+"px",boxShadow:shadow}}>
    <div style={{maxWidth:"100%",margin:"0 auto",display:columns>1?"grid":"block",gridTemplateColumns:columns>1?"repeat("+columns+",minmax(0,1fr))":undefined,gap:24}}>
      <div dangerouslySetInnerHTML={{__html:html}}/>
    </div>
  </section>;
}

export default async function PublishedPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const supabase=await createClient();
  const {data,error}=await supabase.from("site_content").select("slug,title,body,status").eq("slug",slug).eq("status","published").maybeSingle();
  if(error||!data)notFound();
  let design:DesignDocument|null=null;
  try{const parsed=JSON.parse(data.body);if(parsed?.version===1&&Array.isArray(parsed.sections))design=parsed as DesignDocument;}catch{}
  return <main className="min-h-screen bg-[#fbfaf7] px-4 py-8 text-[#30213b] sm:px-6">
    <header className="mx-auto mb-8 flex max-w-[1320px] items-center justify-between border-b border-[#eee9e1] pb-5">
      <a href="/" className="font-serif text-lg font-bold tracking-wide text-[#2c1940]">JUNEBERRIES <span className="text-xs tracking-[.2em]">SCHOOLS</span></a>
      <a href="/#admissions" className="rounded-full bg-[#563477] px-5 py-3 text-xs font-bold text-white">Enquire now</a>
    </header>
    <article className="mx-auto max-w-[1320px]">
      <h1 className="sr-only">{data.title}</h1>
      {design?design.sections.map((section,index)=>renderSection(section,index)):<section className="mx-auto max-w-4xl rounded-2xl border border-[#eeeaf2] bg-white p-8 shadow-sm"><h1 className="font-serif text-4xl font-bold">{data.title}</h1><div className="mt-6 whitespace-pre-wrap text-base leading-8" dangerouslySetInnerHTML={{__html:cleanHtml(data.body)}}/></section>}
    </article>
    <footer className="mx-auto mt-16 max-w-[1320px] border-t border-[#eee9e1] pt-6 text-center text-xs text-[#807584]">© {new Date().getFullYear()} Juneberries Schools · Every Child Matters. Every Potential Counts.</footer>
  </main>;
}
