/**
 *  时间格式化的方法
 *  创建时间：2019-10-08
 *  作者：刘晓北
 *  邮箱： 15732451723@163.com
*/

// 将时间格式化成 YYYY/MM/DD HH:mm:SS
export const fromatDateTime = (time) => {
  const date = new Date(time)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  let H = date.getHours()
  H = H > 9 ? H : '0' + H
  let m = date.getMinutes()
  m = m > 9 ? m : '0' + m
  let S = date.getSeconds()
  S = S > 9 ? S : '0' + S
  return Y + '/' + M + '/' + D + ' ' + H + ':' + m + ':' + S
}