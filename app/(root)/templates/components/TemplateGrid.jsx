import Link from 'next/link';
import TemplateCard from './TemplateCard';

export default function TemplateGrid({ templates }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3">
      {templates?.map((template) => (
        <Link key={template?.id} href={`/templates/${template?.id}`}>
          <TemplateCard template={template} />
        </Link>
      ))}
    </div>
  );
}
