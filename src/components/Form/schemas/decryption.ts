import { z } from 'zod'

export const decryptionFormSchema = z.object({
  file: z.custom((value) => {
    if (typeof window !== 'undefined') {
      if (!(value instanceof FileList)) {
        throw new Error('O arquivo é obrigatório!')
      }

      if (value.length === 0 || value[0].type !== 'text/plain') {
        throw new Error('O arquivo deve ser um arquivo TXT!')
      }
    }

    return true
  }),
  privateKey: z.string().nonempty('A chave privada é obrigatória!'),
})
