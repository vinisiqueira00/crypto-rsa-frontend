import { decryptionFormSchema } from '@/components/Form/schemas/decryption'
import { encryptionFormSchema } from '@/components/Form/schemas/encryption'
import { keysGenerationFormSchema } from '@/components/Form/schemas/keysGeneration'

export declare global {
  export type DecryptionFormData = z.infer<typeof decryptionFormSchema>
  export type EncryptionFormData = z.infer<typeof encryptionFormSchema>
  export type KeysGenerationFormData = z.infer<typeof keysGenerationFormSchema>
}
