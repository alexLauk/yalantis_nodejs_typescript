//=============================================
// TASK №0 ------------------------------------
//=============================================
// add ----------------------------------------
type T1 = (a: number) => T2;
type T2 = ((b: number) => T1) & (() => number);
const add = ((a: number) => (b?: number) => b ? add(a + b) : a ) as T1;

console.log(add(2)(5)(7)(1)(6)(5)(10)());

// isAnagram ------------------------------------
const isAnagram = (a: string, b: string) => {
  const toSortedStr = (str: string) => str.replace(/\W+/g, '').toLowerCase().split('').sort().join();
  return toSortedStr(a) === toSortedStr(b);
}

console.log(isAnagram('absd','bdsa'));
console.log(isAnagram('absdb','bdsad'));

// copy ----------------------------------------
const copy = <T extends object | Date | []>(obj: T ): T => {
  if (obj === null) {
    return obj;
  }
  if(obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  if(Array.isArray(obj)) {
    return obj.reduce((arr: T[], item: T, i: number) => {
      arr[i] = copy<T>(item);
      return arr;
    }, []) as T;
  }
  if (typeof obj === 'object' && obj !== {}) {
  const copied = { ...(obj as { [key: string]: any }) } ;
    Object.keys(copied).forEach(k => {
      copied[k] = copy<T>(copied[k]);
    });
    return copied as T;
  }
  return obj;
}

const obj = {f: {d: {f: new Date(), key: [1]}}};
console.log(obj, copy(obj));

// wrapper ----------------------------------------
const wrapper = <F extends Function, R>(func: F) => {
  let cache = new Map();
  return (...args: R[]): R => {
    const key = args.join()
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args) as R;
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

