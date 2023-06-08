'use client'

import { CircleNotch, Key } from '@phosphor-icons/react'

export default function SendButton(props: SendButtonProps) {
  return (
    <button
      type="submit"
      className="flex items-center justify-center gap-2 px-12 py-5 rounded-2xl bg-red-pantone text-base leading-none font-semibold text-antiflash-white hover:shadow-hover"
    >
      {props.loading ? (
        <CircleNotch
          className="text-antiflash-white animate-spin"
          weight="bold"
          size="1.5rem"
        />
      ) : (
        <Key className="text-antiflash-white" weight="bold" size="1.5rem" />
      )}
      {props.label}
    </button>
  )
}
