//Array() 是 JavaScript 中的构造函数，用于创建一个新的数组。它可以用作构造函数（使用 new 关键字）或者作为一个工厂函数（直接调用）
// 使用构造函数
const newArray1 = new Array(3);  // 创建包含 3 个元素的数组，元素值为 undefined

// 作为工厂函数
const newArray2 = Array(1, 2, 3);  // 创建包含元素 1, 2, 3 的数组


//Array.from() 是一个静态方法，用于从类似数组或可迭代对象中创建一个新的数组。它接受两个参数：第一个参数是要转换的对象，第二个参数是一个映射函数，用于对每个元素进行处理
// 从字符串创建数组
const strArray = Array.from("hello");  // ["h", "e", "l", "l", "o"]

// 从可迭代对象创建数组，并对每个元素进行处理
const doubleArray = Array.from([1, 2, 3], x => x * 2);  // [2, 4, 6]
