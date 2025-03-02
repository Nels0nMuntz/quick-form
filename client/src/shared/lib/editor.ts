import { generateHTML as tiptapGenerateHTML } from "@tiptap/html";
import { EditorJSONContent } from "../model";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

export const generateHTML = (json: EditorJSONContent) => {
  return tiptapGenerateHTML(json, [
    StarterKit.configure({
      paragraph: {
        HTMLAttributes: {
          class: "quick-form-paragraph",
        },
      },
      heading: {
        HTMLAttributes: {
          class: "quick-form-heading",
        }
      }
    }),
    Underline,
    Link,
  ]);
};
