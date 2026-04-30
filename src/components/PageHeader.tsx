type Props = {
  index: string;
  title: string;
  description?: string;
  count?: string;
};

export function PageHeader({ index, title, description, count }: Props) {
  return (
    <header className="mb-12">
      <div className="flex items-baseline justify-between mb-6">
        <span className="label">{index}</span>
        {count && <span className="label">{count}</span>}
      </div>
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}
