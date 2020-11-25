import Vue, { VNode } from 'vue'
import Component from 'vue-class-component'

const ICON_REGEXP = /^(\w+)\-/

const RecoIconProps = Vue.extend({
  props: {
    icon: {
      type: String,
      default: ''
    }
  }
})

@Component
class RecoIcon extends RecoIconProps {
  getClass (icon: string) {
    if (ICON_REGEXP.test(icon)) {
      return icon.replace(ICON_REGEXP, (...args) => {
        return args[1] === 'reco' ? `iconfont ${args[0]}` : `${args[1]} ${args[0]}`
      })
    }
    return ''
  }
  render (h: any): VNode {
    return h('i', { class: this.getClass(this.icon) }, this.$slots.default)
  }
}

export default RecoIcon
