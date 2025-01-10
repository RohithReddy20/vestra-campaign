import { type ReactNode } from 'react';

interface PredictionsLayoutProps {
  children: ReactNode;
}

export default function PredictionsLayout({ children }: PredictionsLayoutProps) {
  return <div>{children}</div>;
}
