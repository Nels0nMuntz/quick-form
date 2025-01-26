import { JSONContent } from "@tiptap/react";

export const buildJsonContent = ({
  text,
  type,
  level = 1,
}: {
  type: "heading" | "paragraph";
  text: string;
  level?: number;
}) => {
  return JSON.parse(
    `{"type":"doc","content":[{"type":"${type}"${type === "heading" ? `,"attrs":{"level":${level}}` : ""},"content":[{"type":"text","text":"${text}"}]}]}`,
  ) as JSONContent;
};
