# JavaScript 中的私有变量

### 命名约定

开发者间约定以_开头为私有变量。但仍可被访问。

### WeakMap

一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

```js
const map = new WeakMap();
// 创建一个在每个实例中存储私有变量的对象
const internal = obj => {
  if (!map.has(obj)) {
    map.set(obj, {});
  }
  return map.get(obj);
}
class Shape {
  constructor(width, height) {
    internal(this).width = width;
    internal(this).height = height;
  }
  get area() {
    return internal(this).width * internal(this).height;
  }
}
const square = new Shape(10, 10);
console.log(square.area);      // 100
console.log(map.get(square));  // { height: 100, width: 100 }
```

### Symbol

一种原始数据类型，该类型的性质在于这个类型的值可以用来创建匿名的对象属性。

```js
const widthSymbol = Symbol('width');
const heightSymbol = Symbol('height');
class Shape {
  constructor(width, height) {
    this[widthSymbol] = width;
    this[heightSymbol] = height;
  }
  get area() {
    return this[widthSymbol] * this[heightSymbol];
  }
}
const square = new Shape(10, 10);
console.log(square.area);         // 100
console.log(square.widthSymbol);  // undefined
console.log(square[widthSymbol]); // 10
``` 

### 闭包

将类包在函数内部，类使用函数中的变量。这样外部的类对象访问不到函数中的变量。

```js
function Shape() {
  // 私有变量集
  const this$ = {};

  class Shape {
    constructor(width, height) {
      this$.width = width;
      this$.height = height;
    }

    get area() {
      return this$.width * this$.height;
    }
  }

  const instance = new Shape(...arguments);
  // 将 this 设置为实例原型的原型
  Object.setPrototypeOf(Object.getPrototypeOf(instance), this);
  return instance;
}
const square = new Shape(10, 10);
console.log(square.area);             // 100
console.log(square.width);            // undefined
console.log(square instanceof Shape); // true
```

### Proxy

允许你有效地将对象包装在名为 Proxy 的对象中，并拦截与该对象的所有交互。

```js
class Shape {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }
  get area() {
    return this._width * this._height;
  }
}
const handler = {
  get: function(target, key) {
    if (key[0] === '_') {
      throw new Error('Attempt to access private property');
    } else if (key === 'toJSON') {
      // 拦截toJSON
      const obj = {};
      for (const key in target) {
        if (key[0] !== '_') {
          obj[key] = target[key];
        }
      }
      return () => obj;
    }
    return target[key];
  },
  set: function(target, key, value) {
    if (key[0] === '_') {
      throw new Error('Attempt to access private property');
    }
    target[key] = value;
  },
  getOwnPropertyDescriptor(target, key) {
    // 拦截遍历
    const desc = Object.getOwnPropertyDescriptor(target, key);
    if (key[0] === '_') {
      desc.enumerable = false;
    }
    return desc;
  }
}
const square = new Proxy(new Shape(10, 10), handler);
console.log(square.area);             // 100
console.log(square instanceof Shape); // true
console.log(JSON.stringify(square));  // "{}"
for (const key in square) {           // No output
  console.log(key);
}
square._width = 200;                  // 错误：试图访问私有属性
```

文章作者开发的组件包，用于创建私有属性：[Privatise](https://github.com/AverageMarcus/privatise)

