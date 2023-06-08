import { z } from 'zod'

export const encryptionFormSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((fileList) => fileList.length > 0, 'O arquivo é obrigatório!')
    .refine(
      (fileList) => fileList?.[0]?.type === 'text/plain',
      'O arquivo deve ser um arquivo TXT!',
    ),
  publicKey: z.string().nonempty('A chave pública é obrigatória!'),
})
