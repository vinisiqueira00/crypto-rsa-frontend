"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface KeysContextProps {
  publicKey: string | undefined;
  privateKey: string | undefined;
  selectedKey: string | undefined;
  setPublicKey: Dispatch<SetStateAction<string | undefined>>;
  setPrivateKey: Dispatch<SetStateAction<string | undefined>>;
  setSelectedKey: Dispatch<SetStateAction<string | undefined>>;
}

interface KeysProviderProps {
  children: React.ReactNode;
}

const KeysContext = createContext<KeysContextProps>({} as KeysContextProps);

export function KeysProvider({ children }: KeysProviderProps) {
  const [publicKey, setPublicKey] = useState<string>();
  const [privateKey, setPrivateKey] = useState<string>();
  const [selectedKey, setSelectedKey] = useState<string>();

  const values = useMemo(() => {
    return {
      publicKey,
      setPublicKey,
      privateKey,
      setPrivateKey,
      selectedKey,
      setSelectedKey,
    };
  }, [publicKey, privateKey, selectedKey]);

  return <KeysContext.Provider value={values}>{children}</KeysContext.Provider>;
}

export function useKeysContext() {
  return useContext(KeysContext);
}
