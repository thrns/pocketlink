'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import { SalesBotChatProvider } from '@/app/contexts/SalesBotChatContext';

export default function SalesBotLayout({ children }) {
  const { user } = useAuth();

  return (
    <SalesBotChatProvider tenantUsername={user?.username || 'default_tenant'}>
      <main className={`flex h-full w-full flex-col overflow-y-auto p-6`}>
        <section>{children}</section>
      </main>
    </SalesBotChatProvider>
  );
}
