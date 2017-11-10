/**
 * 存
 * @param id
 * @param key
 * @param value
 */
export function saveToLocal (id, key, value) {
  let seller = window.localStorage.__seller__; // 在eslint中，localStorage是哪个空间下的。因为只有在浏览器环境下会默认为是window下的
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) { // 判读是否有该商家
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
}

/**
 * 读取
 * @param id
 * @param key
 * @param def
 */
export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
}
