'use client'

import { useEffect, useState } from 'react'

import { useKeysContext } from '@/context/Keys'

import CopyButton from '@/components/Button/Copy'
import DownloadButton from '@/components/Button/Download'
import EmptyPreview from '@/components/Preview/Empty'

export default function KeysPreview(props: KeysPreviewProps) {
  const { publicKey, privateKey } = useKeysContext()

  const [filePublicKey, setFilePublicKey] = useState<HTMLAnchorElement>()
  const [filePrivateKey, setFilePrivateKey] = useState<HTMLAnchorElement>()

  function generateFile(fileData: string, fileName: string): HTMLAnchorElement {
    const blob = new Blob([fileData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `${fileName}.txt`
    link.href = url

    return link
  }

  useEffect(() => {
    const file = generateFile(publicKey ?? '', 'RSA public key')
    setFilePublicKey(file)
  }, [publicKey])

  useEffect(() => {
    const file = generateFile(privateKey ?? '', 'RSA private key')
    setFilePrivateKey(file)
  }, [privateKey])

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <p className="text-xl leading-normal font-semibold text-cool-gray">
        Chaves geradas
      </p>

      <div className="flex flex-col items-center gap-4 w-full pt-3 pb-5 pl-5 pr-3 rounded-2xl bg-raisin-black">
        <div className="flex items-center justify-between w-full">
          <span className="flex-1 text-base leading-none font-semibold text-cool-gray">
            Chave pública
          </span>

          <CopyButton
            isActive={!!publicKey}
            copyToClipboardText={publicKey ?? ''}
          />
          <DownloadButton isActive={!!publicKey} fileLink={filePublicKey} />
        </div>

        <div className="pr-2">
          {publicKey ? (
            <div className="relative flex-1 max-h-32 overflow-hidden">
              <p className="flex items-stretch gap-4 w-full text-base leading-tight font-bold text-antiflash-white break-all">
                {publicKey}
              </p>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-raisin-black to-transparent" />
            </div>
          ) : (
            <EmptyPreview message="Envie o formulário para gerar a chave pública" />
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 w-full pt-3 pb-5 pl-5 pr-3 rounded-2xl bg-raisin-black">
        <div className="flex items-center justify-between w-full">
          <span className="flex-1 text-base leading-none font-semibold text-cool-gray">
            Chave privada
          </span>

          <CopyButton
            isActive={!!privateKey}
            copyToClipboardText={privateKey ?? ''}
          />
          <DownloadButton isActive={!!privateKey} fileLink={filePrivateKey} />
        </div>

        <div className="pr-2">
          {privateKey ? (
            <div className="relative flex-1 max-h-32 overflow-hidden">
              <p className="flex items-stretch gap-4 w-full text-base leading-tight font-bold text-antiflash-white break-all">
                {privateKey}
              </p>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-raisin-black to-transparent" />
            </div>
          ) : (
            <EmptyPreview message="Envie o formulário para gerar a chave privada" />
          )}
        </div>
      </div>
    </div>
  )
}
