# 如何优雅地链式取值

在取值时，如果层级过深，很容易出现`Uncaught TypeError: Cannot read property 'goods' of undefined`的情况。

但如果每层都进行判断，代码可读性就会变差。

## optional chaining

这是一个出于stage 2的ecma新语法，目前已经有了babel的插件 babel-plugin-transform-optional-chaining，这种语法在swift中有，可以看下官方给的实例

```js
a?.b                          // undefined if `a` is null/undefined, `a.b` otherwise.
a == null ? undefined : a.b
a?.[x]                        // undefined if `a` is null/undefined, `a[x]` otherwise.
a == null ? undefined : a[x]
a?.b()                        // undefined if `a` is null/undefined
a == null ? undefined : a.b() // throws a TypeError if `a.b` is not a function// otherwise, evaluates to `a.b()`
a?.()                        // undefined if `a` is null/undefined
a == null ? undefined : a()  // throws a TypeError if `a` is neither null/undefined, nor a function// invokes the function `a` otherwise
```

## 通过函数解析字符串

我们可以通过函数解析字符串来解决这个问题，这种实现就是lodash的 _.get 方法

```js
var object = { a: [{ b: { c: 3 } }] };
var result = _.get(object, 'a[0].b.c', 1);
console.log(result);
// output: 3
```

原理：

```js
function get (obj, props, def) {
    if((obj == null) || obj == null || typeof props !== 'string') return def;
    const temp = props.split('.');
    const fieldArr = [].concat(temp);
    temp.forEach((e, i) => {
        if(/^(\w+)\[(\w+)\]$/.test(e)) {
            const matchs = e.match(/^(\w+)\[(\w+)\]$/);
            const field1 = matchs[1];
            const field2 = matchs[2];
            const index = fieldArr.indexOf(e);
            fieldArr.splice(index, 1, field1, field2);
        }
    })
    return fieldArr.reduce((pre, cur) => {
        const target = pre[cur] || def;

        if(target instanceof Array) {
            return [].concat(target);
        }
        if(target instanceof Object) {
            return Object.assign({}, target)
        }
        return target;
    }, obj)
}
var c = {a: {b : [1,2,3] }}
get(c ,'a.b')     // [1,2,3]
get(c, 'a.b[1]')  // 2
get(c, 'a.d', 12)  // 12
```

## 使用解构赋值

```js
const c = {a:{b: [1,2,3,4]}}
const { a: result } = c;
// result : {b: [1,2,3,4]}
const {a: { c: result = 12 }} = c
// result: 12
```

## 使用Proxy

```js
function pointer(obj, path = []) {
    return new Proxy({}, {
        get (target, property) {
            return pointer(obj, path.concat(property))
        },
        apply (target, self, args) {
            let val = obj;
            let parent;
            for(let i = 0; i < path.length; i++) {
                if(val === null || val === undefined) break;
                parent = val;
                val = val[path[i]]    
            }
            if(val === null || val === undefined) {
                val = args[0]
            }
            return val;
        }
    })
}
```

使用：

```js
let c = {a: {b: [1, ,2 ,3]}}
pointer(c).a();   // {b: [1,2,3]}
pointer(c).a.b(); // [1,2,3]
pointer(d).a.b.d('default value');  // default value复制代码
```