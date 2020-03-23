import { zhHans, zhHant, en } from '../locals/index'

export default {
  computed: {
    $recoLocals () {
      if (/^zh\-(CN|SG)$/.test(this.$lang)) {
        return zhHans
      }
      if (/^zh\-(HK|MO|TW)$/.test(this.$lang)) {
        return zhHant
      }
      return en
    }
  }
}
