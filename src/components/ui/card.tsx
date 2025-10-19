// components/ui/card.tsx
import { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border p-4 bg-white shadow-sm">{children}</div>;
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`text-sm ${className}`}>{children}</div>;
}
