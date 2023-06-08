export declare global {
  export interface DecryptData {
    file: Blob
    contentFile: string
  }

  export interface EncryptData {
    file: Blob
    contentFile: string
  }

  export interface GenerateKeysData {
    keyName: string
    publicKey: string
    privateKey: string
  }
}
