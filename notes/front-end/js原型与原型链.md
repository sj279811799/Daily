# js原型与原型链

![原型](https://github.com/sj279811799/Daily/blob/master/notes/front-end/images/prototype.png)

1. 实例原型：每个js对象在生成时都会关联另外一个对象，这个对象就是实例原型（理解为用来创建实例的模板）。

2. 实例原型的原型是Object.prototype，Object.prototype的原型为null。

3. 原型链，图中蓝色部分，实例到实例原型一直到null。

4. 当访问实例属性，如果实例不存在该属性，就会通过原型链向上找，一直到null。

5. person.constructor === Person.prototype.constructor === Person