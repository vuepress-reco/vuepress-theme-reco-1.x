import { getCurrentInstance, inject } from 'vue'

export function useInstance () {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')

  const instance = vm?.proxy || {}
  return instance
}

export const showModuleSymbol = Symbol('showModuleSymbol')
export function useShowModule () {
  const recoShowModule = inject(showModuleSymbol)
  return { recoShowModule }
}
