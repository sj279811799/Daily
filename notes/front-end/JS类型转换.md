# JavaScript核心概念：类型转换

## 原始类型转换

### 原始值转化为布尔值

1. undefined，null，0，-0，NaN，""会被转换为false。

2. 原始值转换为字符串，相当于+""

3. 布尔值转换数字：true->1，false->2。字符串转数字，数字类型直接转化，其他转换为NaN。

### 原始值到对象的转换

1. null和undefined转对象直接抛异常

2. 其他通过调用String(),Number(),Boolean()直接转为对应对象。

### 对象到原始值的转换

1. 对象转布尔值都为true

2. 转为字符串：

    - 如果有String()方法，则调用，如果返回原始值，则转为字符串。

    - 如果没有String()，则调用valueOf()方法，如果返回原始值，则转换为字符串。

    - 否则报错。

3. 转为数字：

    - 与转字符串类似，只是先调用valueOf方法。

4. toString()和valueOf()

    - toString

    ![toString()](https://github.com/sj279811799/Daily/blob/master/notes/front-end/images/toString.jpeg)

    - valueOf

    ![valueOf()](https://github.com/sj279811799/Daily/blob/master/notes/front-end/images/valueOf.jpeg)

### === 运算符

1. 一个是null，一个是undefined，则相等

2. 一个字符串，一个数字，则将字符串转为数字再比较

3. true转1，false转为0，再比较

4. 一个是对象，另个一个是数字或字符串，则先把对象转换成普通类型再比较

### + 运算符

1. 但作为一元运算符，可以将字符串转为数字

2. 二元运算符：
    
    - 两边任意一边如有字符串，另一边会转为字符串

    - 没有字符串，会转为数字相加

    - 如果存在对象，则转换为原始值


![类型转化](https://github.com/sj279811799/Daily/blob/master/notes/front-end/images/tye.jpg)