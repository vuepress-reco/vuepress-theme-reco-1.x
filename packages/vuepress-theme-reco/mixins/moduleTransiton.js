export default {
  data () {
    return {
      recoShowModule: false
    }
  },
  mounted () {
    this.recoShowModule = true
  },
  watch: {
    '$route' () {
      this.recoShowModule = false
      setTimeout(() => {
        this.recoShowModule = true
      }, 200)
    }
  }
}
