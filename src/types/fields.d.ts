export declare global {
  export interface FileFieldProps {
    name: string
    label: string
  }

  export interface KeyFieldProps {
    name: string
    label: string
    typeKeys: TypeKeys
  }

  export interface TextareaFieldProps {
    name: string
    label: string
  }

  export interface TextFieldProps {
    name: string
    label: string
    limitLength: number
  }
}
