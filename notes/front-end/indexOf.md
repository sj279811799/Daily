# indexOf

## String

```js
let numStr = '2016';
numStr.indexOf('2'); //0
numStr.indexOf(2); //0
```

String的indexOf会把传入的数字转成字符串。

## Number

number类型没有indexOf方法，只能先转换成String。

```js
//二逼青年的写法
num = '2016';
num.indexOf(2); //0
//普通青年的写法
num.toString().indexOf(2); //0
//文艺青年的写法
('' + num).indexOf(2); //0
```

## Array

```js
let arr = ['orange', '2016', '2016'];
arr.indexOf('orange'); //0
arr.indexOf('o'); //-1
arr.indexOf('2016'); //1
arr.indexOf(2016); //-1
```

只能匹配数组元素，不会对number做转换。