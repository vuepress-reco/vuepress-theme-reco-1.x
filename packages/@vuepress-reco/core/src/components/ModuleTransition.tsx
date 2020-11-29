import Vue from 'vue';
import Component from 'vue-class-component';

import '../../stylus/ModuleTransition.styl'

const ModuleTransitionProps = Vue.extend({
  props: {
    delay: {
      type: String,
      default: '0'
    },
    duration: {
      type: String,
      default: '.25'
    }
  }
})

@Component
class ModuleTransition extends ModuleTransitionProps {
  setStyle (items) {
    items.style.transition = `all ${this.duration}s ease-in-out ${this.delay}s`
    items.style.transform = 'translateY(-20px)'
    items.style.opacity = 0
  }

  unsetStyle (items) {
    items.style.transform = 'translateY(0)'
    items.style.opacity = 1
  }

  render () {
    return (
      <transition
        {
          ...{
            attrs: {
              name: 'module'
            },
            on: {
              enter: this.setStyle,
              'after-enter': this.unsetStyle,
              'before-leave': this.setStyle
            }
          }
        }
      >{this.$slots.default}</transition>
    )
  }
}

export default ModuleTransition
