export declare global {
  export interface FeedbackPopupProps {
    title: string
    description: string
    status: ProgressRequest | undefined
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
  }
}
