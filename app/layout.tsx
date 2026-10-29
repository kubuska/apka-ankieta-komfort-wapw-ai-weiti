import type {Metadata} from 'next';import './globals.css';
export const metadata:Metadata={title:'Komfort podczas zajęć — WAPW · AI',description:'Badanie komfortu termicznego, jakości powietrza i skupienia podczas zajęć. Wydział Architektury, specjalność AI.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pl"><body>{children}</body></html>;}
