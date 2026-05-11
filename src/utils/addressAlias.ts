import { type Address, getAddress, type Hex, hexToBigInt, isAddress, pad, toHex } from 'viem'

export const L1_TO_L2_ALIAS_OFFSET = '0x1111000000000000000000000000000000001111' as const satisfies Hex

const addressModulo = hexToBigInt('0x10000000000000000000000000000000000000000')

function assertAddress(address: string): asserts address is Address {
  if (!isAddress(address)) {
    throw new Error(`not a valid address: ${address}`)
  }
}

function bigintToAddress(value: bigint) {
  return getAddress(pad(toHex(value % addressModulo), { size: 20 }))
}

/**
 * Applies the L1 => L2 aliasing scheme to an address.
 */
export function applyL1ToL2Alias(address: string): string {
  assertAddress(address)

  return bigintToAddress(
    hexToBigInt(address) + hexToBigInt(L1_TO_L2_ALIAS_OFFSET),
  )
}

/**
 * Reverses the L1 => L2 aliasing scheme from an address.
 */
export function undoL1ToL2Alias(address: string): string {
  assertAddress(address)

  return bigintToAddress(
    hexToBigInt(address) - hexToBigInt(L1_TO_L2_ALIAS_OFFSET) + addressModulo,
  )
}
