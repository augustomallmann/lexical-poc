import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import * as React from "react";
import { useRef, useState } from "react";
import AutoEmbedPlugin from "./plugins/AutoEmbedPlugin";
import ComponentPickerPlugin from "./plugins/ComponentPickerPlugin";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";
import FigmaPlugin from "./plugins/FigmaPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";
import MarkdownShortcutPlugin from "./plugins/MarkdownShortcutPlugin";
// import ToolbarPlugin from './plugins/ToolbarPlugin';
import ContentEditable from "./ui/ContentEditable";
import Placeholder from "./ui/Placeholder";

export default function Editor(): JSX.Element {
  const text = "Enter some rich text...";
  const placeholder = <Placeholder>{text}</Placeholder>;
  const scrollRef = useRef(null);
  const [
    floatingAnchorElem,
    setFloatingAnchorElem
  ] = useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <>
      {/* <ToolbarPlugin /> */}
      <div className={"editor-container plain-text"} ref={scrollRef}>
        <ComponentPickerPlugin />
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable />
              </div>
            </div>
          }
          placeholder={placeholder}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <AutoEmbedPlugin />
        <MarkdownShortcutPlugin />
        <ListPlugin />
        <LinkPlugin />
        <FigmaPlugin />
        {floatingAnchorElem && (
          <>
            <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
            <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
            <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
          </>
        )}
      </div>
    </>
  );
}
