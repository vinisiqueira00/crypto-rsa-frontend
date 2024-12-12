export declare global {
  export interface CopyButtonProps {
    isActive: boolean;
    copyToClipboardText: string;
  }

  export interface DownloadButtonProps {
    isActive: boolean;
    fileLink: HTMLAnchorElement | undefined;
  }

  export interface RemoveButtonProps {
    isActive: boolean;
    id: string;
    setKeys: Dispatch<SetStateAction<GenerateKeysData[] | undefined>>;
  }

  export interface SendButtonProps {
    label: string;
    loading: boolean;
  }
}
