/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id: 12345, a: b}
 */
export function urlParse () {
  let url = window.location.search; // 得到 ?id=12345&a=b
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g; // 正则解读，以?或者&开头，但是后面跟着的不包含?或者&，然后加上一个=，再加上不以?或者&的内容
  let arr = url.match(reg); // 得到 ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let temArr = item.substring(1).split('='); // str.substring(1) 是删除第一个字符，。即?或者&
      let key = decodeURIComponent(temArr[0]); // decodeURIComponent 对url解码
      let val = decodeURIComponent(temArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}
