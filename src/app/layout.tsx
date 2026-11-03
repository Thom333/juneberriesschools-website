import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Juneberries Schools | Every Child Matters. Every Potential Counts.', description: 'Juneberries Schools — quality teaching, individual attention and academic excellence.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
