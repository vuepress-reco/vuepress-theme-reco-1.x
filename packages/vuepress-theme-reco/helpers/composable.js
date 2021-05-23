import { getCurrentInstance } from '@vue/composition-api'

export function useInstance () {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')

  const instance = vm || {}
  return instance
}
