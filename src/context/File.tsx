"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface FileContextProps {
  previewFileContent: string | undefined;
  setPreviewFileContent: Dispatch<SetStateAction<string | undefined>>;
  downloadFileLink: HTMLAnchorElement | undefined;
  setDownloadFileLink: Dispatch<SetStateAction<HTMLAnchorElement | undefined>>;
}

interface FileProviderProps {
  children: React.ReactNode;
}

const FileContext = createContext<FileContextProps>({} as FileContextProps);

export function FileProvider({ children }: FileProviderProps) {
  const [downloadFileLink, setDownloadFileLink] = useState<HTMLAnchorElement>();
  const [previewFileContent, setPreviewFileContent] = useState<string>();

  const values = useMemo(() => {
    return {
      downloadFileLink,
      setDownloadFileLink,
      previewFileContent,
      setPreviewFileContent,
    };
  }, [downloadFileLink, previewFileContent]);

  return <FileContext.Provider value={values}>{children}</FileContext.Provider>;
}

export function useFileContext() {
  return useContext(FileContext);
}
