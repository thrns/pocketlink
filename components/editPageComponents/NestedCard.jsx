'use client';
import { useAuth } from '@/app/contexts/AuthContext';

export default function NestedCard({ children, ...props }) {
  // Simply return children without any premium restrictions
  return children;
}
