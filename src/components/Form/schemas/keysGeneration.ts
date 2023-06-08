import { z } from 'zod'

export const keysGenerationFormSchema = z.object({
  keyName: z
    .string()
    .nonempty('O nome da chave é obrigatório!')
    .max(15, 'O nome da chave tem que ter, no máximo, 15 caracteres!'),
})
