export declare global {
  export interface BackButtonProps {}

  export interface KeyButtonProps {}

  export interface CopyButtonProps {
    isActive: boolean
    copyToClipboardText: string
  }

  export interface DownloadButtonProps {
    isActive: boolean
    fileLink: HTMLAnchorElement | undefined
  }

  export interface SendButtonProps {
    label: string
    loading: boolean
  }
}
