// import { createSignal } from "solid-js";
import { Editor as Core } from "@tiptap/core";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Document from "@tiptap/extension-document";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import { ListKit } from "@tiptap/extension-list";
import Mathematics from "@tiptap/extension-mathematics";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { TableKit } from "@tiptap/extension-table";
import Text from "@tiptap/extension-text";
import {
  BackgroundColor,
  Color,
  FontFamily,
  TextStyle,
} from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import YouTube from "@tiptap/extension-youtube";
import {
  CharacterCount,
  Dropcursor,
  Placeholder,
  Selection,
  TrailingNode,
  UndoRedo,
} from "@tiptap/extensions";

// "@tiptap/extension-bubble-menu"
// "@tiptap/extension-drag-handle"
// "@tiptap/extension-file-handler"
// code-block-shiki

function Editor() {
  const $element = <div class="w-prose min-h-8"></div>;
  if (!globalThis.window) return $element;

  const editor = new Core({
    extensions: [
      Document,
      Paragraph,
      Text,
      // marks
      Color,
      BackgroundColor,
      TextStyle,
      FontFamily,
      Superscript,
      Subscript,
      Mathematics,
      Bold,
      Italic,
      Strike,
      Underline,
      Link,
      Code,
      // nodes
      Image,
      Heading,
      Blockquote,
      HardBreak,
      HorizontalRule,
      ListKit,
      TableKit.configure({
        table: { resizable: true },
      }),
      YouTube,
      // functionality
      CharacterCount,
      Selection,
      Dropcursor,
      TrailingNode,
      UndoRedo,
      Placeholder.configure({
        placeholder: "Write something...",
      }),
      Typography.configure({
        openDoubleQuote: false,
        closeDoubleQuote: false,
        openSingleQuote: false,
        closeSingleQuote: false,
      }),
    ],
    element: $element,
  });

  return $element;
}

export { Editor };
