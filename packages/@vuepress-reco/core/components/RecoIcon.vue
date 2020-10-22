<script>
const ICON_REGEXP = /^(\w+)\-/

export default {
  name: 'RecoIcon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  methods: {
    getClass (icon) {
      if (ICON_REGEXP.test(icon)) {
        return icon.replace(ICON_REGEXP, (...args) => {
          return args[1] === 'reco' ? `iconfont ${args[0]}` : `${args[1]} ${args[0]}`
        })
      }
      return ''
    }
  },
  render (h) {
    return h('i', { class: this.getClass(this.icon) }, this.$slots.default)
  }
}
</script>
