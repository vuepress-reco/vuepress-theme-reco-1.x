import { getCurrentInstance, ref, onMounted, onUpdated } from 'vue'

export function useInstance () {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')

  const instance = vm?.proxy || {}
  return instance
}

export function useShowModule () {
  const recoShowModule = ref(false)

  onMounted(() => {
    recoShowModule.value = true
  })

  onUpdated(() => {
    recoShowModule.value = false
    setTimeout(() => {
      recoShowModule.value = true
    }, 100)
  })

  return { recoShowModule }
}
