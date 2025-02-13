interface Props {
  title: React.ReactNode;
  action?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
}

export function Header({ title, action, breadcrumbs }: Props) {
  return (
    <header className="flex flex-col gap-y-2">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        {title}
        {action}
      </div>
      {breadcrumbs}
    </header>
  );
}
