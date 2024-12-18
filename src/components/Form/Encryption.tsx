"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { TypeKeys } from "@/types/enumerations/fields";
import { ProgressRequest } from "@/types/enumerations/feedbacks";

import { encryptionFormSchema } from "@/components/Form/schemas/encryption";

import encrypt from "@/api/encrypt";

import { useFileContext } from "@/context/File";
import { useKeysContext } from "@/context/Keys";

import KeysModal from "../Modal/Keys";
import KeyField from "@/components/Field/Key";
import FileField from "@/components/Field/File";
import SendButton from "@/components/Button/Send";
import FeedbackPopup from "@/components/Feedback/Toast";
import TextareaField from "@/components/Field/Textarea";

export default function EncryptionForm() {
  const [progressRequest, setProgressRequest] = useState<ProgressRequest>();
  const [feedbackTitle, setFeedbackTitle] = useState<string>("");
  const [feedbackDescription, setFeedbackDescription] = useState<string>("");
  const [feedbackOpened, setFeedbackOpened] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { selectedKey } = useKeysContext();
  const { setDownloadFileLink, setPreviewFileContent } = useFileContext();

  const encryptionForm = useForm<EncryptionFormData>({
    resolver: zodResolver(encryptionFormSchema),
    mode: "onChange",
  });

  function generateFileEncoded(encryptData: EncryptData) {
    const url = URL.createObjectURL(encryptData.file);
    const link = document.createElement("a");
    link.download = "encoded.txt";
    link.href = url;

    setPreviewFileContent(encryptData.contentFile);
    setDownloadFileLink(link);
  }

  async function encryption(data: EncryptionFormData) {
    try {
      if (!data.file || !data.publicKey) return;

      setProgressRequest(ProgressRequest.LOADING);

      const response = await encrypt({
        file: data.file,
        publicKey: data.publicKey,
      });

      generateFileEncoded(response);

      setProgressRequest(ProgressRequest.SUCCESS);
    } catch (err) {
      console.error(err);

      setProgressRequest(ProgressRequest.ERROR);

      setFeedbackTitle("Erro ao realizar a criptografia!");
      setFeedbackDescription(
        "Confira o tipo do arquivo enviado, sua chave pública e tente novamente :)"
      );
      setFeedbackOpened(true);
    }
  }

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <FormProvider {...encryptionForm}>
        <div>
          <form
            className="flex flex-col items-start justify-start w-full gap-8"
            onSubmit={encryptionForm.handleSubmit(encryption)}
          >
            <div className="relative flex flex-col items-start w-full gap-4 overflow-hidden">
              <FileField name="file" label="Arquivo a ser criptografado" />

              {selectedKey ? (
                <KeyField
                  name="publicKey"
                  label="Chave pública RSA"
                  typeKeys={TypeKeys.PUBLIC}
                />
              ) : (
                <TextareaField name="publicKey" label="Chave pública RSA" />
              )}

              <Dialog.Trigger
                type="button"
                className="text-base leading-none font-medium text-cool-gray underline text-left"
              >
                Selecionar minha chave
              </Dialog.Trigger>
            </div>

            <SendButton
              label="Criptografar"
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
            typeKeys={TypeKeys.PUBLIC}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
          />
        </div>
      </FormProvider>
    </Dialog.Root>
  );
}
