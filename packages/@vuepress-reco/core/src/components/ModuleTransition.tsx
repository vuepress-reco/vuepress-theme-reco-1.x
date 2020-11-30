import Vue from 'vue';
import Component from 'vue-class-component';

const ModuleTransitionProps = Vue.extend({
  props: {
    delay: {
      type: String,
      default: '0'
    },
    duration: {
      type: String,
      default: '.25'
    },
    transform: {
      type: Array,
      default () {
        return ['translateY(-20px)', 'translateY(0)']
      }
    }
  }
})

@Component
class ModuleTransition extends ModuleTransitionProps {
  setStyle (items) {
    items.style.transition = `transform ${this.duration}s ease-in-out ${this.delay}s, opacity ${this.duration}s ease-in-out ${this.delay}s`
    items.style.transform = this.transform[0]
    items.style.opacity = 0
  }

  unsetStyle (items) {
    items.style.transform = this.transform[1]
    items.style.opacity = 1
  }

  render () {
    return (
      <transition
        {
          ...{
            attrs: { name: 'module' },
            on: {
              enter: this.setStyle,
              appear: this.setStyle,
              'before-leave': this.setStyle,
              'after-appear': this.unsetStyle,
              'after-enter': this.unsetStyle
            }
          }
        }
      >{this.$slots.default}</transition>
    )
  }
}

export default ModuleTransition
