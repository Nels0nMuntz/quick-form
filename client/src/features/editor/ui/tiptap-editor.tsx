"use client";

import { throttle } from "@/shared/lib";
import { Content, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { forwardRef, useCallback, useRef, useState } from "react";
import { UseTiptapEditorOptions } from "../lib/hooks/useTipTapEditor";
import TiptapProvider from "./tiptap-provider";
import { Toolbar } from "./toolbar";

export type TiptapEditorRef = {
  getInstance: () => Editor | null;
};

interface Props {
  ssr?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  initialContent?: Content;
  placeholder?: {
    paragraph?: string;
    imageCaption?: string;
  };
  output?: "html" | "json";
  hideToolbar?: boolean;
  hideStatusBar?: boolean;
  hideBubbleMenu?: boolean;
  containerClass?: string;
  menuBarClass?: string;
  contentClass?: string;
  contentMinHeight?: string | number;
  contentMaxHeight?: string | number;
  onContentChange?: (value: Content) => void;
}

export const TiptapEditor = forwardRef<TiptapEditorRef, Props>(
  function TiptapEditor(props, ref) {
    const {
      ssr = false,
      output = "html",
      readonly = false,
      disabled = false,
      initialContent,
      placeholder,
      hideToolbar = true,
      hideStatusBar = false,
      hideBubbleMenu = true,
      contentMinHeight = 200,
      contentMaxHeight,
      onContentChange,
    } = props;

    const [focused, setFocused] = useState(false);

    const isEditable = !readonly && !disabled;

    const throttledUpdate = useCallback(
      throttle((value: Content) => onContentChange?.(value), 1500),
      [],
    );

    const handleUpdate = useCallback(
      (editor: Editor) => {
        const content =
          output === "html"
            ? editor.isEmpty
              ? ""
              : editor.getHTML()
            : editor.getJSON();
        throttledUpdate(content);
      },
      [throttledUpdate, output],
    );
    const editorOptions: UseTiptapEditorOptions = {
      ref,
      placeholder,
      extensions: [StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "text-lg"
          }
        },
        heading: {
          HTMLAttributes: {
            class: "text-3xl font-semibold"
          },
          levels: [1]
        }
      }), Underline, Link],
      content: initialContent,
      editable: isEditable,
      immediatelyRender: !ssr,
      shouldRerenderOnTransaction: false,
      autofocus: false,
      onUpdate: ({ editor }) => handleUpdate(editor),
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    };

    return (
      <>
        <TiptapProvider
          editorOptions={editorOptions}
          slotAfter={<Toolbar visible={true} />}
        />
      </>
    );
  },
);
