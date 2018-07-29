# Java 8 新特性之Stream流

## 流API

API是一个程序向使用者提供的一些方法,通过这些方法就能实现某些功能。流API中的流操作的数据源,是数组或者是集合.它本身是不存储数据的,只是移动数据,在移动过程中可能会对数据进行过滤,排序或者其它操作.

## demo
```java
// 创建List
List<Integer> lists = new ArrayList<>();
// 取最大值
lists.stream().max(Integer::compareTo).ifPresent(System.out.println);
// 取最小值
lists.stream().min(Integer::compareTo).ifPresent(System.out.println);
// 排序
lists.stream().sorted().forEach(elem -> System.out.println(elem + " "));
// 过滤
lists.stream().filter(elem -> elem > 0).filter(elem -> elem < 4).sorted(Integer::compareTo).forEach(System.out::println);
```