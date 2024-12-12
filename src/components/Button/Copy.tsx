"use client";

import { CopySimple } from "@phosphor-icons/react";

export default function CopyButton(props: CopyButtonProps) {
  return (
    <button
      type="button"
      disabled={!props.isActive}
      className={`p-2 rounded-full ${
        props.isActive ? "text-cool-gray hover:bg-space-cadet" : "text-charcoal"
      }`}
      onClick={() =>
        props.copyToClipboardText &&
        navigator.clipboard.writeText(props.copyToClipboardText)
      }
    >
      <CopySimple weight="bold" size="1.5rem" />
    </button>
  );
}
