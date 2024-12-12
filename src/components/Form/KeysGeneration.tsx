"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { ProgressRequest } from "@/types/enumerations/feedbacks";

import { keysGenerationFormSchema } from "@/components/Form/schemas/keysGeneration";

import generateKeys from "@/api/generateKeys";

import { useKeysContext } from "@/context/Keys";

import TextField from "@/components/Field/Text";
import SendButton from "@/components/Button/Send";
import FeedbackPopup from "@/components/Feedback/Toast";

export default function KeysGenerationForm() {
  const [progressRequest, setProgressRequest] = useState<ProgressRequest>();
  const [feedbackTitle, setFeedbackTitle] = useState<string>("");
  const [feedbackDescription, setFeedbackDescription] = useState<string>("");
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);

  const { setPublicKey, setPrivateKey } = useKeysContext();

  const keysGenerationForm = useForm<KeysGenerationFormData>({
    resolver: zodResolver(keysGenerationFormSchema),
    mode: "onChange",
  });

  function saveOnLocalStorage(generateKeyData: GenerateKeysData) {
    const rsaKeysLocal: string = localStorage.getItem("rsa_keys") ?? "[]";
    const rsaKeysLocalParsed = JSON.parse(rsaKeysLocal);
    rsaKeysLocalParsed.push(generateKeyData);
    localStorage.setItem("rsa_keys", JSON.stringify(rsaKeysLocalParsed));
  }

  async function keysGeneration(data: KeysGenerationFormData) {
    try {
      if (!data.keyName) return;

      setProgressRequest(ProgressRequest.LOADING);
      setFeedbackOpened(false);

      const response = await generateKeys({
        keyName: data.keyName,
      });

      setPublicKey(response.publicKey);
      setPrivateKey(response.privateKey);

      saveOnLocalStorage(response);

      setProgressRequest(ProgressRequest.SUCCESS);

      setFeedbackTitle("Chaves geradas com sucesso!");
      setFeedbackDescription(
        "As chaves geradas foram armazenadas por tempo determinado. Salve-as para que possa utilizá-las futuramente :)"
      );
      setFeedbackOpened(true);
    } catch (err) {
      console.error(err);

      setProgressRequest(ProgressRequest.ERROR);

      setFeedbackTitle("Erro ao gerar as chaves RSA!");
      setFeedbackDescription(
        "Confira se o nome tem menos que 15 caracteres e tente novamente :)"
      );
      setFeedbackOpened(true);
    }
  }

  return (
    <FormProvider {...keysGenerationForm}>
      <div>
        <form
          className="flex flex-col items-start justify-start w-full gap-4"
          onSubmit={keysGenerationForm.handleSubmit(keysGeneration)}
        >
          <TextField name="keyName" label="Nome da chave" limitLength={15} />

          <SendButton
            label="Gerar chaves RSA"
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
      </div>
    </FormProvider>
  );
}
