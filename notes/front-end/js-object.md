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



