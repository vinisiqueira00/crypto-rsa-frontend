"use client";

interface DecryptProps {
  file: FileList;
  privateKey: string;
}

export default async function decrypt(
  props: DecryptProps
): Promise<DecryptData> {
  try {
    const formData = new FormData();
    formData.append("file", props.file[0]);
    formData.append("privateKey", props.privateKey);

    const response = await fetch(
      "https://crypto-rsa-backend.vercel.app/decryption",
      {
        method: "POST",
        body: formData,
      }
    );

    const file = await response.blob();
    const contentFile = await file.text();

    return {
      file,
      contentFile,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
