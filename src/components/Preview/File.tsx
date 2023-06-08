'use client'

import { FileText } from '@phosphor-icons/react'

import { useFileContext } from '@/context/File'

import DownloadButton from '@/components/Button/Download'
import EmptyPreview from '@/components/Preview/Empty'

export default function FilePreview(props: FilePreviewProps) {
  const { downloadFileLink, previewFileContent } = useFileContext()

  return (
    <div className="flex flex-col items-center gap-4 w-full pt-3 pb-5 pl-5 pr-3 rounded-2xl bg-raisin-black">
      <div className="flex items-center justify-between w-full">
        <span className="text-base leading-none font-semibold text-cool-gray">
          {props.title}
        </span>
        <DownloadButton
          isActive={!!downloadFileLink}
          fileLink={downloadFileLink}
        />
      </div>

      <div className="pr-2">
        {downloadFileLink ? (
          <div className="flex items-stretch gap-4 w-full">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-space-cadet">
              <FileText
                className="text-cool-gray"
                weight="bold"
                size="1.5rem"
              />
            </div>
            <div className="relative flex-1 max-h-16 overflow-hidden">
              <span className="text-base leading-tight font-bold text-antiflash-white break-all">
                {previewFileContent && previewFileContent}
              </span>

              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-raisin-black to-transparent" />
            </div>
          </div>
        ) : (
          <EmptyPreview message={props.emptyMessage} />
        )}
      </div>
    </div>
  )
}
