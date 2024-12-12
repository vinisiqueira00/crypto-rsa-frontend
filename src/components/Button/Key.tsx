"use client";

import Link from "next/link";
import { Key } from "@phosphor-icons/react";

export default function KeyButton() {
  return (
    <Link
      href="/generate-keys"
      className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-raisin-black text-cool-gray hover:shadow-hover"
    >
      <Key weight="bold" size="1.5rem" />
      <span className="text-base leading-none font-semibold max-sm:hidden">
        Gerar chaves
      </span>
    </Link>
  );
}
