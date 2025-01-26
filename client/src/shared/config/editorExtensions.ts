import { Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "prosemirror-state";
import BaseHeading from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";

type Levels = 1 | 2 | 3;

const classes: Record<Levels, string> = {
  1: "text-3xl font-semibold",
  2: "text-2xl font-semibold",
  3: "text-xl font-semibold",
};

export const Heading = BaseHeading.configure({ levels: [1, 2, 3] }).extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level: Levels = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `${classes[level]}`,
      }),
      0,
    ];
  },
});

export const NoNewLine = Extension.create({
  name: "no_new_line",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("eventHandler"),
        props: {
          handleKeyDown: (view, event) => {
            if (event.key === "Enter" || (event.key === "v" && event.metaKey)) {
              return true;
            }
          },
        },
      }),
    ];
  },
});
