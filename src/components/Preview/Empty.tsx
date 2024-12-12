"use client";

import { SealWarning } from "@phosphor-icons/react";

export default function EmptyPreview(props: EmptyPreviewProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 w-full max-w-xs text-charcoal">
      <SealWarning weight="bold" size="2rem" />
      <p className="text-base leading-tight font-bold text-center">
        {props.message}
      </p>
    </div>
  );
}
