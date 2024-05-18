import DashboardClientLayout from './client-layout';

export const metadata = {
  title: 'Dashboard | Pocketlink',
  description: 'Manage and edit your Pocketlink page',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function DashboardLayout({ children }) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}