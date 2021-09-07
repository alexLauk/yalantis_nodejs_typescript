//=============================================
// TASK №0 ------------------------------------
//=============================================
const add = a => b => b ? add(a + b) : a

//=============================================
// TASK №1 ------------------------------------
//=============================================
const isAnagram = (a, b) => {
  const toSortedStr = (str) => str.replace(/\W+/g, '').toLowerCase().split('').sort().join();
  
  return toSortedStr(a) === toSortedStr(b);
}

//=============================================
// TASK №2 ------------------------------------
//=============================================
const copy = (obj) => {
  return Object.keys(obj).reduce((a, b) => { 
    a[b]= obj[b]; 
    return a; 
  }, {});
}

//=============================================
// TASK №3 ------------------------------------
//=============================================
const wrapper = (func) => {
  let cache = new Map();

  return function(...args) {
    let key = args.join()

    if (cache.has(key)) {
        return cache.get(key);
    }

    let result = func.call(this, ...args);
    cache.set(key, result);

    return result;
  };
}

