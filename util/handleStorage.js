/**
 * ModuleMenuIndex 模块路由下标
 * FirstMenuIndex 一级菜单下标
 * SecondMenuIndex 耳机菜单路径
 */
const storage = window.localStorage

export function getStorage (whichMenu) {
  return storage.getItem(whichMenu)
}

export function setStorage (whichMenu, content) {
  storage.setItem(whichMenu, content)
}

export function removeStorage (whichMenu) {
  storage.removeItem(whichMenu)
}
