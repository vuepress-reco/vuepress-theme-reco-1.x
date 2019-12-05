export default {
  data () {
    return {
      recoShowMoudle: false
    }
  },
  mounted () {
    this.recoShowMoudle = true
  },
  destoryed () {
    this.recoShowMoudle = false
  }
}
