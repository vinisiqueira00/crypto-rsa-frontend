"use client";

import { DownloadSimple } from "@phosphor-icons/react";

export default function DownloadButton(props: DownloadButtonProps) {
  return (
    <button
      type="button"
      disabled={!props.isActive}
      className={`p-2 rounded-full ${
        props.isActive ? "text-cool-gray hover:bg-space-cadet" : "text-charcoal"
      }`}
      onClick={() => props.fileLink && props.fileLink.click()}
    >
      <DownloadSimple weight="bold" size="1.5rem" />
    </button>
  );
}
