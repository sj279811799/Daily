# map和reduce，处理数据结构的利器

### reduce

将多个数据放进一个实例

```js
const posts = [
  {id: 1, upVotes: 2},
  {id: 2, upVotes: 89},
  {id: 3, upVotes: 1}
];
const totalUpvotes = posts.reduce((totalUpvotes, currentPost, currentIndex, collectionCopy) =>     
  totalUpvotes + currentPost.upVotes, //reducer函数
  0 // 初始化投票数为0
);
console.log(totalUpvotes)//输出投票总数：92
```

### map

```js
const integers = [1, 2, 3, 4, 6, 7];
const twoXIntegers = integers.map(i => i*2);
// twoXIntegers现在是 [2, 4, 6, 8, 12, 14]，而integers不发生变化。
```

### find

返回满足条件的第一个元素

```js
const posts = [
  {id: 1, title: 'Title 1'},
  {id: 2, title: 'Title 2'}
];
// 找出id为1的posts
const title = posts.find(p => p.id === 1).title;
```

### filter

返回满足条件的数组

```js
const integers = [1, 2, 3, 4, 6, 7];
const evenIntegers = integers.filter(i => i%2 === 0);
// evenIntegers的值为[2, 4, 6]
```

### 数组中新增元素

```js
const books = ['Positioning by Trout', 'War by Green'];
const newBooks = [...books, 'HWFIF by Carnegie'];
// newBooks are now ['Positioning by Trout', 'War by Green', 'HWFIF // by Carnegie']
```
