import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "lexical";
import { cn } from "@/lib/utils";
import "./lexical-renderer.css";

interface LexicalRendererProps {
  content: SerializedEditorState;
  className?: string;
}

export function LexicalRenderer({ content, className }: LexicalRendererProps) {
  return (
    <div className={cn("lexical-content", className)}>
      <RichText data={content} />
    </div>
  );
}
