export default {
  data () {
    return {
      recoShowModule: false
    }
  },
  mounted () {
    this.recoShowModule = true
  },
  destoryed () {
    this.recoShowModule = false
  }
}
