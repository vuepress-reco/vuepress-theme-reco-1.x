function install (Vue, options = {}) {
  /**
	 * 检测图片是否存在
	 * @param url
	 */
  const imageIsExist = function (url) {
    return new Promise((resolve) => {
      var img = new Image()
      img.onload = function () {
        if (this.complete == true) {
          resolve(true)
          img = null
        }
      }
      img.onerror = function () {
        resolve(false)
        img = null
      }
      img.src = url
    })
  }
  Vue.directive(options.name || 'default-img', async function (el, binding) {
    // 指令名称为：v-default-img
    const imgURL = el.src // 获取图片地址
    const defaultURL = binding.value
    el.setAttribute('src', defaultURL)
    if (imgURL) {
      const exist = await imageIsExist(imgURL)
      if (exist) {
        el.setAttribute('src', imgURL)
      } else {
        el.setAttribute('src', defaultURL)
      }
    } else {
      el.setAttribute('src', defaultURL)
    }
  })
}

export default { install }
