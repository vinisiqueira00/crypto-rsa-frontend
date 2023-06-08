'use client'

import { SealCheck, Warning } from '@phosphor-icons/react'
import * as Toast from '@radix-ui/react-toast'

import { ProgressRequest } from '@/types/enumerations/feedbacks'

export default function FeedbackPopup(props: FeedbackPopupProps) {
  return (
    <Toast.Provider duration={5000}>
      <Toast.Root
        className={`flex items-center justify-center gap-4 w-full p-4 rounded-2xl ${
          props.status === ProgressRequest.ERROR
            ? 'bg-safety-orange'
            : 'bg-dark-pastel-green'
        }`}
      >
        <div className="flex items-center justify-center">
          {props.status === ProgressRequest.ERROR ? (
            <Warning
              className="text-antiflash-white"
              weight="bold"
              size="2rem"
            />
          ) : (
            <SealCheck
              className="text-antiflash-white"
              weight="bold"
              size="2rem"
            />
          )}
        </div>
        <div className="flex flex-col items-start justify-start gap-1">
          <Toast.Title className="text-base leading-none font-black text-antiflash-white">
            {props.title}
          </Toast.Title>
          <Toast.Description className="text-base leading-tight font-medium text-antiflash-white">
            {props.description}
          </Toast.Description>
        </div>
      </Toast.Root>

      <Toast.Viewport className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-screen p-4 z-10" />
    </Toast.Provider>
  )
}
