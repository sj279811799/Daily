# 深入 V8 引擎：“小整数”到底有多小？

### 取值范围

Smis 在 64 位平台上的范围是 -2³¹ 到 2³¹-1（2³¹≈2*10⁹）。

kSmiMinValue 并 kSmiMaxValue 在 include/v8.h 中定义如下：

```c
static const int kSmiMinValue = 
  (static_cast<unsigned int>(-1)) << (kSmiValueSize — 1);
static const int kSmiMaxValue = -(kSmiMinValue + 1);
```

### 左移

左移意味着将数字的二进制向左移一位，右侧用0填充。整数左移与乘2相同。

### 静态转换为无符号整数

```
static_cast<unsigned int>(-1)
```

下面暂时看不懂。。。
