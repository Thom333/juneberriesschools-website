import type { Metadata } from 'next';
import { DM_Sans, Lato, Lora } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const lora = Lora({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-staff', display: 'swap' });

export const metadata: Metadata = { title: 'Juneberries Schools | Every Child Matters. Every Potential Counts.', description: 'Juneberries Schools — quality teaching, individual attention and academic excellence.' };

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body className={`${dmSans.variable} ${lora.variable} ${lato.variable}`}>{children}</body></html>;
}
