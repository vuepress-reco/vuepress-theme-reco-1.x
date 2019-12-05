<template>
  <transition
    name="module"
    @enter="setStyle"
    @after-enter="unsetStyle"
    @before-leave="setStyle">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'ModuleTransition',

  props: {
    delay: {
      type: String,
      default: '0'
    }
  },

  methods: {
    setStyle (items) {
      items.style.transition = `all .25s ease-in ${this.delay}s`
      items.style.transform = 'translateY(-20px)'
      items.style.opacity = 0
    },
    unsetStyle (items) {
      items.style.transform = 'translateY(0)'
      items.style.opacity = 1
    }
  }
}
</script>

<style lang="stylus">
.module-enter, .module-leave-to {
  opacity: 0;
  transform:translateY(-20px);
}
</style>
