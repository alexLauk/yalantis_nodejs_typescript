//=============================================
// TASK №0 ------------------------------------
//=============================================
const add = a => b => b ? add(a + b) : a
console.log(add(2)(5)(7)(1)(6)(5)(10)());
//=============================================
// TASK №1 ------------------------------------
//=============================================
const isAnagram = (a, b) => {
  const toSortedStr = (str) => str.replace(/\W+/g, '').toLowerCase().split('').sort().join();
  return toSortedStr(a) === toSortedStr(b);
}

console.log(isAnagram('absd','bdsa'));
console.log(isAnagram('absdb','bdsad'));
//=============================================
// TASK №2 ------------------------------------
//=============================================
const copy = (obj) => {
  if (obj === null) {
    return obj;
  }
  if (typeof obj === 'object' && obj !== {}) {
  const copied = { ...obj } ;
    Object.keys(copied).forEach(k => {
      copied[k] = copy(copied[k]);
    });
    return copied;
  }
  return obj;
}
console.log(copy({f: {d: {f:'m'}}}));
//=============================================
// TASK №3 ------------------------------------
//=============================================
const wrapper = (func) => {
  let cache = new Map();

  return (...args) => {
    const key = args.join()

    if (cache.has(key)) {
        return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result);

    return result;
  };
}
const add1 = (a, b) => a + b;

const cachedAdd = wrapper(add1);
console.log(cachedAdd(2,2)); 
console.log(cachedAdd(5,8)); 
console.log(cachedAdd(2,2)); 
