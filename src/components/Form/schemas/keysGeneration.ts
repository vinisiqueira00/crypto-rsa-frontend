import { z } from "zod";

export const keysGenerationFormSchema = z.object({
  keyName: z
    .string()
    .nonempty("O nome da chave é obrigatório!")
    .max(15, "O nome da chave tem que ter, no máximo, 15 caracteres!")
    .refine((value) => {
      const rsaKeysLocal: string = localStorage.getItem("rsa_keys") ?? "[]";
      const rsaKeysLocalParsed = JSON.parse(rsaKeysLocal);
      const exists = rsaKeysLocalParsed.filter(
        (key: GenerateKeysData) => key.keyName === value
      );

      return !(exists.length > 0);
    }, "Já existe uma chave com esse nome!"),
});
