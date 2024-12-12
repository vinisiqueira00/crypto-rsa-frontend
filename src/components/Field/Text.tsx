"use client";

import { useFormContext } from "react-hook-form";

export default function TextField(props: TextFieldProps) {
  const { register, formState, watch } = useFormContext();

  return (
    <div className="flex flex-col items-end justify-start gap-2 w-full">
      <label
        htmlFor={props.name}
        className="flex items-start justify-start w-full min-h-[4rem] px-5 gap-4 rounded-2xl bg-charcoal cursor-pointer"
      >
        <div className="relative flex flex-col items-start justify-center gap-1 w-full min-h-[4rem] py-3">
          <input
            id={props.name}
            className="peer w-full h-6 mt-4 border-0 bg-transparent text-base leading-6 font-semibold text-antiflash-white resize-none outline-none scroll-p-0 overflow-hidden"
            required
            {...register(props.name)}
          />

          <span className="absolute top-6 left-0 text-base leading-none font-medium text-cool-gray select-none origin-top-left transition-label peer-focus:top-3 peer-valid:top-3 peer-focus:text-xs peer-valid:text-xs">
            {props.label}
          </span>
        </div>
        <div className="flex items-center justify-center h-16">
          {watch(props.name) && (
            <span className="text-cool-gray">
              {watch(props.name).length}/{props.limitLength}
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
  );
}
