'use client'

import { FileText } from '@phosphor-icons/react'
import { useFormContext } from 'react-hook-form'

export default function FileField(props: FileFieldProps) {
  const { register, formState, watch } = useFormContext()

  return (
    <div className="flex flex-col items-end justify-start gap-2 w-full">
      <label
        htmlFor={props.name}
        className="flex items-start justify-start w-full min-h-[4rem] px-5 gap-4 rounded-2xl bg-charcoal cursor-pointer"
      >
        <div className="flex items-center justify-center h-16">
          <FileText className="text-cool-gray" weight="bold" size="1.5rem" />
        </div>
        <div className="relative flex flex-col items-start justify-center gap-1 w-full min-h-[4rem] py-3">
          <input
            id={props.name}
            type="file"
            className="peer absolute opacity-0 pointer-events-none w-full"
            accept=".txt"
            required
            {...register(props.name)}
          />

          <span className="absolute top-6 left-0 text-base leading-none font-medium text-cool-gray select-none origin-top-left transition-label peer-valid:top-3 peer-valid:text-xs">
            {props.label}
          </span>

          {watch()?.file?.[0]?.name && (
            <span className="pt-4 text-base leading-6 font-semibold text-antiflash-white outline-none">
              {watch().file[0].name}
            </span>
          )}
        </div>
      </label>

      {formState.errors[props.name] && (
        <span className="text-xs leading-none font-medium text-red-pantone">
          {formState.errors[props.name]?.message?.toString()}
        </span>
      )}
    </div>
  )
}
