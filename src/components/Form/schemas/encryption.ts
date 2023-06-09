'use client'

import { z } from 'zod'

export const encryptionFormSchema = z.object({
  file: z
    .custom<FileList>((value) => value instanceof FileList)
    .refine((value) => value.length > 0, 'O arquivo é obrigatório!')
    .refine(
      (value) => value[0]?.type === 'text/plain',
      'O arquivo deve ser um arquivo TXT!',
    ),
  publicKey: z.string().nonempty('A chave pública é obrigatória!'),
})
