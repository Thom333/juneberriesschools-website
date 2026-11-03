import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Juneberries | Staff Administration', description: 'Juneberries Schools secure staff administration workspace.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
