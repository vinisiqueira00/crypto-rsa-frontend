import Link from 'next/link'

import KeyButton from '@/components/Button/Key'
import EncryptionForm from '@/components/Form/Encryption'
import FilePreview from '@/components/Preview/File'

export default function Encryption() {
  return (
    <div className="flex flex-col px-6 py-12 gap-12 md:px-16 md:py-16">
      <header className="flex gap-4">
        <div className="flex flex-col items-start justify-start gap-2 flex-1">
          <h1 className="text-3xl font-logotype font-bold leading-none text-antiflash-white">
            CryptoRSA
          </h1>
          <h2 className="text-base font-body font-medium leading-none text-cool-gray">
            A RSA crypto library
          </h2>
        </div>

        <KeyButton />
      </header>

      <main className="flex flex-col gap-4 w-full md:flex-row md:items-start lg:gap-32">
        <div className="flex items-center justify-start w-full gap-3 md:flex-col md:w-60 md:gap-2">
          <Link
            href="/encryption"
            className="px-4 py-2 rounded-2xl bg-red-pantone text-base leading-normal font-medium text-antiflash-white hover:shadow-hover md:w-full md:py-4 md:px-6"
          >
            Criptografar
          </Link>
          <Link
            href="/decryption"
            className="px-4 py-2 rounded-2xl bg-raisin-black text-base leading-normal font-medium text-cool-gray hover:shadow-hover md:w-full md:py-4 md:px-6"
          >
            Descriptografar
          </Link>
        </div>

        <div className="flex flex-col gap-8 w-full md:w-auto md:flex-1 md:gap-16">
          <EncryptionForm />

          <FilePreview
            title="Arquivo criptografado"
            emptyMessage="Envie o formulário para gerar o arquivo criptografado aqui"
          />
        </div>
      </main>
    </div>
  )
}
