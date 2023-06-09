'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { ProgressRequest } from '@/types/enumerations/feedbacks'
import { TypeKeys } from '@/types/enumerations/fields'

import { decryptionFormSchema } from '@/components/Form/schemas/decryption'

import decrypt from '@/api/decrypt'

import { useFileContext } from '@/context/File'
import { useKeysContext } from '@/context/Keys'

import SendButton from '@/components/Button/Send'
import FeedbackPopup from '@/components/Feedback/Toast'
import FileField from '@/components/Field/File'
import KeyField from '@/components/Field/Key'
import TextareaField from '@/components/Field/Textarea'
import KeysModal from '@/components/Modal/Keys'

export default function DecryptionForm() {
  const [progressRequest, setProgressRequest] = useState<ProgressRequest>()
  const [feedbackTitle, setFeedbackTitle] = useState<string>('')
  const [feedbackDescription, setFeedbackDescription] = useState<string>('')
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const { selectedKey } = useKeysContext()
  const { setDownloadFileLink, setPreviewFileContent } = useFileContext()

  const decryptionForm = useForm<DecryptionFormData>({
    resolver: zodResolver(decryptionFormSchema),
    mode: 'onChange',
  })

  function generateFileDecoded(decryptData: DecryptData) {
    const url = URL.createObjectURL(decryptData.file)
    const link = document.createElement('a')
    link.download = 'decoded.txt'
    link.href = url

    setPreviewFileContent(decryptData.contentFile)
    setDownloadFileLink(link)
  }

  async function decryption(data: DecryptionFormData) {
    try {
      if (!data.file || !data.privateKey) return

      setProgressRequest(ProgressRequest.LOADING)

      const response = await decrypt({
        file: data.file,
        privateKey: data.privateKey,
      })

      generateFileDecoded(response)

      setProgressRequest(ProgressRequest.SUCCESS)
    } catch (error) {
      setProgressRequest(ProgressRequest.ERROR)

      setFeedbackTitle('Erro ao realizar a descriptografia!')
      setFeedbackDescription(
        'Confira o tipo do arquivo enviado, sua chave privada e tente novamente :)',
      )
      setFeedbackOpened(true)
    }
  }

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <FormProvider {...decryptionForm}>
        <div>
          <form
            className="flex flex-col items-start justify-start w-full gap-8"
            onSubmit={decryptionForm.handleSubmit(decryption)}
          >
            <div className="flex flex-col items-start w-full gap-4">
              <FileField name="file" label="Arquivo a ser descriptografado" />

              {selectedKey ? (
                <KeyField
                  name="privateKey"
                  label="Chave privada RSA"
                  typeKeys={TypeKeys.PRIVATE}
                />
              ) : (
                <TextareaField name="privateKey" label="Chave privada RSA" />
              )}

              <Dialog.Trigger className="text-base leading-none font-medium text-cool-gray underline text-left">
                Selecionar minha chave
              </Dialog.Trigger>
            </div>

            <SendButton
              label="Descriptografar"
              loading={progressRequest === ProgressRequest.LOADING}
            />
          </form>

          <FeedbackPopup
            status={progressRequest}
            title={feedbackTitle}
            description={feedbackDescription}
            open={feedbackOpened}
            setOpen={setFeedbackOpened}
          />

          <KeysModal
            typeKeys={TypeKeys.PRIVATE}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
          />
        </div>
      </FormProvider>
    </Dialog.Root>
  )
}
