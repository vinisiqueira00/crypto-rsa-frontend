'use client'

interface EncryptProps {
  file: FileList
  publicKey: string
}

export default async function encrypt(
  props: EncryptProps,
): Promise<EncryptData> {
  try {
    const formData = new FormData()
    formData.append('file', props.file[0])
    formData.append('publicKey', props.publicKey)

    const response = await fetch('http://localhost:3333/encryption', {
      method: 'POST',
      body: formData,
    })

    const file = await response.blob()
    const contentFile = await file.text()

    return {
      file,
      contentFile,
    }
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
