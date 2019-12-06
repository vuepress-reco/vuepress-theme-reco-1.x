import postMixin from '@theme/mixins/posts'
import appMixin from '@theme/mixins/app'

export default ({
  Vue
}) => {
  Vue.mixin(postMixin)
  Vue.mixin(appMixin)
}
