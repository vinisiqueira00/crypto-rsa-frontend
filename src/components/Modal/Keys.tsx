'use client'

import { useKeysContext } from '@/context/Keys'
import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useEffect, useState } from 'react'

import { TypeKeys } from '@/types/enumerations/fields'

export default function KeysModal(props: KeysModalProps) {
  const [keys, setKeys] = useState<GenerateKeysData[]>()

  const { setSelectedKey } = useKeysContext()

  function handleSelectKey(value: string) {
    if (value === 'manual key') {
      setSelectedKey(undefined)
    } else {
      const keyName = value.replace(/^generate_/, '')
      setSelectedKey(keyName)
    }

    props.setDialogOpen(false)
  }

  useEffect(() => {
    const rsaKeysLocal: string = localStorage.getItem('rsa_keys') ?? '[]'
    const rsaKeysLocalParsed = JSON.parse(rsaKeysLocal) as GenerateKeysData[]
    setKeys(rsaKeysLocalParsed)
  }, [])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-black-translucid" />

      <Dialog.Content className="fixed top-1/2 left-1/2 w-screen-borderless max-w-xl max-h-screen-borderless transform -translate-y-1/2 -translate-x-1/2 rounded-2xl bg-space-cadet overflow-scroll">
        <div className="flex flex-col gap-6 w-full px-4 py-6">
          <Dialog.Title className="text-xl leading-none font-semibold text-cool-gray">
            Minhas chaves
          </Dialog.Title>

          <RadioGroup.Root
            defaultValue="manual_key"
            onValueChange={handleSelectKey}
          >
            <div className="flex flex-col items-start justify-start gap-3 w-full">
              <label
                htmlFor="manual_key"
                className="flex items-center gap-4 w-full p-5 rounded-2xl bg-raisin-black cursor-pointer"
              >
                <RadioGroup.Item
                  id="manual_key"
                  value="manual key"
                  className="peer w-4 h-4 rounded-full bg-charcoal aria-checked:bg-red-pantone aria-checked:shadow-radio"
                />

                <span className="flex-1 text-base leading-none font-medium text-cool-gray peer-aria-checked:text-antiflash-white peer-aria-checked:font-bold">
                  Inserir chave manual
                </span>
              </label>

              {keys?.map((key) => (
                <label
                  key={key.keyName.toLowerCase().replaceAll(' ', '_')}
                  htmlFor={key.keyName.toLowerCase().replaceAll(' ', '_')}
                  className="flex flex-col gap-3 w-full p-5 rounded-2xl bg-raisin-black cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <RadioGroup.Item
                      id={key.keyName.toLowerCase().replaceAll(' ', '_')}
                      value={`generate_${key.keyName}`}
                      className="peer w-4 h-4 rounded-full bg-charcoal aria-checked:bg-red-pantone aria-checked:shadow-radio"
                    />

                    <span className="flex-1 text-base leading-none font-medium text-cool-gray peer-aria-checked:text-antiflash-white peer-aria-checked:font-bold">
                      {key.keyName}{' '}
                      {props.typeKeys === TypeKeys.PUBLIC
                        ? '(pública)'
                        : '(privada)'}
                    </span>
                  </div>
                  <div className="relative flex-1 max-h-20 overflow-hidden">
                    <p className="flex items-stretch gap-4 w-full text-base leading-tight font-medium text-cool-gray break-all">
                      {props.typeKeys === TypeKeys.PUBLIC
                        ? key.publicKey
                        : key.privateKey}
                    </p>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-raisin-black to-transparent" />
                  </div>
                </label>
              ))}
            </div>
          </RadioGroup.Root>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
