<template>
  <transition
    name="dropdown"
    @enter="setHeight"
    @after-enter="unsetHeight"
    @before-leave="setHeight"
  >
    <slot/>
  </transition>
</template>

<script>
import { defineComponent } from 'vue-demi'
export default defineComponent({
  name: 'DropdownTransition',

  setup (props, ctx) {
    const setHeight = (items) => {
      items.style.height = items.scrollHeight + 'px'
    }

    const unsetHeight = (items) => {
      items.style.height = ''
    }

    return { setHeight, unsetHeight }
  }
})
</script>

<style lang="stylus">
.dropdown-enter, .dropdown-leave-to
  height 0 !important

</style>
