export const metadata = {
  title: 'Templates | PocketLink',
  description:
    'Explore our wide range of beautiful templates for your PocketLink page',
};

export default function TemplatesLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black">
      {children}
    </div>
  );
}
