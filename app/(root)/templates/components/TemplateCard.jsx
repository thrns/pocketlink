export default function TemplateCard({ template, onSelectTemplate }) {
  return (
    <>
      <div className="aspect-video cursor-pointer overflow-hidden rounded-lg border border-4 border-bento-blue transition duration-300">
        <img
          src={template?.template_image}
          alt={template.template_name}
          className="flex h-full w-full object-cover object-center"
        />
      </div>
      <div className="py-2 text-left dark:bg-gray-800">
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100">
          {template.template_name}
        </h3>
      </div>
    </>
  );
}
