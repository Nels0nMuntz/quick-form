import { PropsWithChildren } from "react";
import { Paper } from "@/shared/ui";
import { EditorJSONContent } from "@/shared/model";
import { generateHTML } from "@/shared/lib";

interface Props extends PropsWithChildren {
  title: EditorJSONContent;
  subtitle: string;
}

export function SummaryPaper({ title, subtitle, children }: Props) {
  const titleHtml = generateHTML(title);
  return (
    <Paper>
      <h2 className="text-xl" dangerouslySetInnerHTML={{ __html: titleHtml }} />
      <p className="mt-1 text-base">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </Paper>
  );
}
