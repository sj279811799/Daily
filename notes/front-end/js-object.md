# 一起探讨 JavaScript 的对象

对象是多个属性的动态集合，它有一个链接着原型的隐藏属性（注：proto）。一个属性拥有一个 key 和一个 value 。

## 属性的 key

key唯一，可以使用点或括号访问属性。

```js
let obj = {
  message : "A message"
}
obj.message //"A message"
obj["message"] //"A message"
```

访问不存在的key,会返回undefined。当使用括号表示法，key不要求是有效值，可以是任意值。

当key是非字符串时，会调用toString方法转换为字符串。

```js
let obj = {};
//Number
obj[1] = "Number 1";
obj[1] === obj["1"]; //false
//Object
let number1 = {
  toString : function() { return "1"; }
}
obj[number1] === obj["1"]; //true
```

## 属性的值

属性的值可以是任意的基础数据类型，对象，或函数。

### 对象作为值

对象可以嵌套在其他对象里.

### 函数作为值

当一个函数被作为属性值，通常成为一个方法。在方法中，this 关键字代表着当前的对象。

## 动态性

对象本质上就是动态的。可以任意添加删除属性。

```js
let obj = {};
obj.message = "This is a message"; //add new property
obj.otherMessage = "A new message"; //add new property
delete obj.otherMessage; //delete property
```

## Map

我们可以把对象当做一个 Map。Map 的 key 就是对象的属性。

## 原型

对象有一个链接着原型对象的“隐藏”属性 proto，对象是从这个原型对象中继承属性的。

```js
var obj = {};
obj.__proto__ === Object.prototype; //true
```

### 原型链

原型对象有它自己的原型。当一个属性被访问的时候并且不包含在当前对象中，JavaScript会沿着原型链向下查找直到找到被访问的属性，或者到达 null 为止。

### 只读

原型只用于读取值。对象进行更改时，只会作用到当前对象，不会影响对象的原型；就算原型上有同名的属性，也是如此。

### 空对象

正如我们看到的，空对象 {} 并不是真正意义上的空，因为它包含着指向 Object.prototype 的链接。为了创建一个真正的空对象，我们可以使用 Object.create(null) 。它会创建一个没有任何属性的对象。这通常用来创建一个Map。

## 原始值和包装对象

在允许访问属性这一点上，JavaScript 把原始值描述为对象。当然了，原始值并不是对象。

```js
(1.23).toFixed(1); //"1.2"
"text".toUpperCase(); //"TEXT"
true.toString(); //"true"
```

为了允许访问原始值的属性， JavaScript 创造了一个包装对象，然后销毁它。JavaScript引擎对创建包装和销毁包装对象的过程做了优化。

数值、字符串和布尔值都有等效的包装对象。跟别是：Number、String、Boolean。

null 和 undefined 原始值没有相应的包装对象并且不提供任何方法。

## 内置原型

Numbers 继承自Number.prototype，Number.prototype继承自Object.prototype。

```js
var no = 1;
no.__proto__ === Number.prototype; //true
no.__proto__.__proto__ === Object.prototype; //true
```

Strings 继承自 String.prototype。Booleans 继承自 Boolean.prototype

函数都是对象，继承自 Function.prototype 。函数拥有 bind()、apply() 和 call() 等方法。

所有对象、函数和原始值（除了 null 和 undefined ）都从 Object.prototype 继承属性。他们都有 toString() 方法。



