export function formatDate (date, time) {
  if (/(y+)/.test(time)) {
    time = time.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(time)) {
      let str = o[k] + '';
      time = time.replace(RegExp.$1, (RegExp.$1.length === 1 ? str : padLeftZero(str)));
    }
  }
  return time;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}
