/*
 * @Autor: yinkaili
 * @Date: 2020-07-08 11:01:54
 * @Last Modified by: yinkaili
 * @Last Modified time: Do not edit
 */ 
const loaderUtils = require('loader-utils')
// 默认参数
let defaultsProp = {
  unitToConvert: 'px',
  viewportWidth: 375,
  unitPrecision: 5,
  viewportUnit: 'rem',
  fontViewportUnit: 'rem',
  minPixelValue: 1
}
const template = /<template>([\s\S]+)<\/template>/gi
const ZPXRegExp = /(\d+)px/
module.exports = function (source) {
  const opts = loaderUtils.getOptions(this)
  const defaults = Object.assign({}, defaultsProp, opts)
  let _source = ''
  if (template.test(source)) {
    _source = source.match(template)[0]
  }
  let pxGlobalRegExp = new RegExp(ZPXRegExp.source, 'ig')
  if (pxGlobalRegExp.test(_source)) {
    let $_source = _source.replace(pxGlobalRegExp, createPxReplace(defaults.viewportWidth, defaults.minPixelValue, defaults.unitPrecision, defaults.viewportUnit))
    return source.replace(template, $_source)
  } else {
    return source
  }
}
function createPxReplace (viewportSize, minPixelValue, unitPrecision, viewportUnit) {
  return function ($0, $1) {
    if (!$1) return
    var pixels = parseFloat($1)
    if (pixels <= minPixelValue) return
    return toFixed((pixels / viewportSize*10), unitPrecision) + viewportUnit
  }
}
function toFixed (number, precision) {
  var multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier)
  return Math.round(wholeNumber / 10) * 10 / multiplier
}