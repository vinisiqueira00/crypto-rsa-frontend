'use client'

import { CircleNotch, Key } from '@phosphor-icons/react'
import { useFormContext } from 'react-hook-form'

export default function SendButton(props: SendButtonProps) {
  const {
    formState: { isValid },
  } = useFormContext()

  return (
    <button
      disabled={!isValid}
      type="submit"
      className={
        isValid
          ? 'flex items-center justify-center gap-2 px-12 py-5 rounded-2xl bg-red-pantone text-base leading-none font-semibold text-antiflash-white hover:shadow-hover'
          : 'flex items-center justify-center gap-2 px-12 py-5 rounded-2xl bg-charcoal text-base leading-none font-semibold text-cool-gray'
      }
    >
      {props.loading ? (
        <CircleNotch className="animate-spin" weight="bold" size="1.5rem" />
      ) : (
        <Key weight="bold" size="1.5rem" />
      )}
      {props.label}
    </button>
  )
}
