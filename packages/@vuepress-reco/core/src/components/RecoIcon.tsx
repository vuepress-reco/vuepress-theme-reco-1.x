import Vue from 'vue'
import Component from 'vue-class-component'

const ICON_REGEXP = /^(\w+)\-/

const RecoIconProps = Vue.extend({
  props: {
    icon: {
      type: String,
      default: ''
    },
    link: {
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

  go (link) {
    if (link === '') return
    window.open(link)
  }

  render () {
    return (
      <i {...{
        class: this.getClass(this.icon),
        on: { click: this.go.bind(this, this.link) }
      }}>
        {this.$slots.default}
      </i>
    )
  }
}

export default RecoIcon
