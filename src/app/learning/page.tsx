import type { Metadata } from "next";
import PublicPage from "@/components/public-page";
export const metadata:Metadata={title:"Learning at Juneberries Schools",description:"Explore the Early Years, Primary and Secondary learning pathways at Juneberries Schools."};
export default function Page(){return <PublicPage page="learning"/>;}
