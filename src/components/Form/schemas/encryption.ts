import { z } from 'zod'

export const encryptionFormSchema = z.object({
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
  publicKey: z.string().nonempty('A chave pública é obrigatória!'),
})
