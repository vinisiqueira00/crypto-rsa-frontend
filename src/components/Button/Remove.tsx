'use client'

import { Trash } from '@phosphor-icons/react'

export default function RemoveButton(props: RemoveButtonProps) {
  function handleClick() {
    const rsaKeysLocal: string = localStorage.getItem('rsa_keys') ?? '[]'
    const rsaKeysLocalParsed = JSON.parse(rsaKeysLocal) as GenerateKeysData[]

    const rsaKeysResult = rsaKeysLocalParsed.filter(
      (key) => key.keyName !== props.id,
    )

    localStorage.setItem('rsa_keys', JSON.stringify(rsaKeysResult))

    props.setKeys(rsaKeysResult)
  }

  return (
    <button
      type="button"
      disabled={!props.isActive}
      className={`p-2 rounded-full ${
        props.isActive ? 'text-cool-gray hover:bg-space-cadet' : 'text-charcoal'
      }`}
      onClick={handleClick}
    >
      <Trash weight="bold" size="1.5rem" />
    </button>
  )
}
