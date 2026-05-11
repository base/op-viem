import {
  applyL1ToL2Alias as optimismApplyL1ToL2Alias,
  undoL1ToL2Alias as optimismUndoL1ToL2Alias,
} from '@eth-optimism/core-utils'
import { expect, test } from 'vitest'
import { applyL1ToL2Alias, undoL1ToL2Alias } from './addressAlias.js'

test('applyL1ToL2Alias matches optimism core-utils', () => {
  const address = '0x1234567890abcdef1234567890abcdef12345678'

  expect(applyL1ToL2Alias(address)).toEqual(
    optimismApplyL1ToL2Alias(address),
  )
})

test('undoL1ToL2Alias matches optimism core-utils', () => {
  const aliased = optimismApplyL1ToL2Alias(
    '0x1234567890abcdef1234567890abcdef12345678',
  )

  expect(undoL1ToL2Alias(aliased)).toEqual(
    optimismUndoL1ToL2Alias(aliased),
  )
})

test('undoL1ToL2Alias reverses applyL1ToL2Alias', () => {
  const address = '0x9999999999999999999999999999999999999999'

  expect(undoL1ToL2Alias(applyL1ToL2Alias(address))).toEqual(address)
})

test('throws on invalid addresses', () => {
  expect(() => applyL1ToL2Alias('0x1234')).toThrowError(
    'not a valid address: 0x1234',
  )
  expect(() => undoL1ToL2Alias('0x1234')).toThrowError(
    'not a valid address: 0x1234',
  )
})
