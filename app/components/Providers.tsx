"use client";

import { ThemeProvider } from '@/app/context/ThemeContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Providers({ children }: { children: React.ReactNode }) {
  console.log('🚀 Providers component rendering');
  
  return (
    <ThemeProvider>
      <Sidebar />
      <div className="lg:pl-[280px]">
        <TopBar />
        <main>
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}