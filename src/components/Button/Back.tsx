"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react";

export default function BackButton() {
  const { back } = useRouter();

  return (
    <button
      onClick={() => back()}
      className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-raisin-black text-cool-gray hover:shadow-hover"
    >
      <ArrowLeft weight="bold" size="1.5rem" />
    </button>
  );
}
