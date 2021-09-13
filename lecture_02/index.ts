//=============================================
// TASK №0 ------------------------------------
//=============================================
// add ----------------------------------------
type Add = (a: number) => Added;
type Added = ((b: number) => Added) & (() => number);
const add = ((a: number) => (b?: number) => b ? add(a + b) : a ) as Add;

console.log(add(2)(5)(7)(1)(6)(5)(10)());

// isAnagram ------------------------------------
const isAnagram = (a: string, b: string) => {
  const toSortedStr = (str: string) => str.replace(/\W+/g, '').toLowerCase().split('').sort().join();
  return toSortedStr(a) === toSortedStr(b);
}
console.log(isAnagram('asap', 'pata'))

// copy ----------------------------------------
const copy = <T extends object>(obj: T ) => {
  if (obj === null) {
    return obj;
  }
  if (typeof obj === 'object' && obj !== {}) {
  const copied = { ...(obj as { [key: string]: any }) } ;
    Object.keys(copied).forEach(k => {
      copied[k] = copy<T>(copied[k]);
    });
    return copied;
  }
  return obj;
}

console.log(copy({f: {d: {f:'m'}}}));

// wrapper ----------------------------------------
const wrapper = <F extends Function, R extends unknown>(func: F) => {
  let cache = new Map();

  return (...args: R[]): R => {
    const key = args.join()
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
}
const add1 = (a: number, b: number) => a + b;

const cachedAdd = wrapper(add1);
console.log(cachedAdd(2,2)); 
console.log(cachedAdd(5,8)); 
console.log(cachedAdd(2,2)); 

//=============================================
// TASK №1 ------------------------------------
//=============================================

const runSequentially = async<T>(
  array: Array<T>, 
  callback: (item: T, index: number) => Promise<{item: string, index: number}>
  ) => {
    let result: Array<{item: string, index: number}> = [];
    array.forEach(async (item, index) => result.push(await callback(item, index)));
    return result;
  }

const array1: Array<string> = ["one", "two", "three"];
(async () => {
    const results = await runSequentially(array1, (item, index) =>
    Promise.resolve({
      item,
      index,
    })
  );
  console.log(results);
})()

//=============================================
// TASK №2 ------------------------------------
//=============================================
const arrayMutateRemove = (arr: Array<number>, func: (item: number) => void) => {
  const removed = arr.filter(func);
  const mutate = arr.filter(val => !removed.includes(val));
  return { mutate, removed };
}

const array = [1, 2, 3, 6, 7, 9];

const removedElements = arrayMutateRemove(array, (item: number) => item % 2 === 0);

console.log(removedElements);

