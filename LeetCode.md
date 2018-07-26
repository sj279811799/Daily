# LeetCode

# 算法

## [重复的DNA序列](https://leetcode-cn.com/problems/repeated-dna-sequences/description/)

```java
public List<String> findRepeatedDnaSequences(String s) {
    // 统计字符串出现次数
    Map<String, Integer> map = new HashMap();
    int s_length = s.length();
    List<String> strList = new ArrayList<String>();
    for (int i=0; i < s_length - 9; i++) {
        String subStr = s.substring(i, i+10);
        if (!map.containsKey(subStr)) {
            // map中没有则加入
            map.put(subStr, 1);
        } else {
            if (map.get(subStr) < 2) {
                // 出现2次则满足条件
                strList.add(subStr);
            }
            // 每出现一次加一
            map.put(subStr, map.get(subStr) + 1);
        }
    }
    return strList;
}
```

## [有效的井字游戏](https://leetcode-cn.com/problems/valid-tic-tac-toe-state/description/)

```java
public boolean validTicTacToe(String[] board) {
    int x_count = 0;
    int o_count = 0;
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 3; ++j) {
            if (board[i].charAt(j) == 'X') {
                x_count++;
            } else if (board[i].charAt(j) == 'O') {
                o_count++;
            }
        }
    }
    // X个数大于等于O,且只能比O多一个
    if (o_count > x_count || x_count - o_count > 1) {
        return false;
    }
    // 转换成二维数组
    char[][] map = new char[3][3];
    for (int i = 0; i < 3; ++i) {
        map[i] = board[i].toCharArray();
    }
    if (checkWin(map, 'O')) {
        if (checkWin(map, 'X')) {
            // 当O赢，X不能赢
            return false;
        }
        // 当O赢，X和O数量相同
        return x_count == o_count;
    } else if (checkWin(map, 'X')) {
        // 当X赢,X比O多一个
        return (x_count - 1) == o_count;
    }
    return true;
}

// 判断是否p赢
public boolean checkWin(char[][] map, char p) {
    for (int i = 0; i < 3; ++i) {
        // 横向相同
        if (map[i][0] == p && map[i][0] == map[i][1] && map[i][1] == map[i][2]) {
            return true;
        }
        // 纵向相同
        if (map[0][i] == p && map[0][i] == map[1][i] && map[1][i] == map[2][i]) {
            return true;
        }
    }
    // 斜向相同
    if (map[1][1] == p && (map[0][0] == map[1][1] && map[1][1] == map[2][2] || map[0][2] == map[1][1] && map[1][1] == map[2][0])) {
        return true;
    }
    return false;
}
```

## [全局倒置与局部倒置](https://leetcode-cn.com/problems/global-and-local-inversions/description/)

```java
public boolean isIdealPermutation(int[] A) {
    int max = 0;
    // 如果数组长度小于2，则数量都为0
    if (A.length < 2) {
        return true;
    }
    for (int i = 0; i < A.length - 2; i++) {
        max = Math.max(A[i], max);
        // 如果两者数量相等，则全局倒置全是局部倒置。即不存在A[i]>A[j],其中i+2<=j;即max(A[i])>A[i+2]
        if (max > A[i+2]) {
            return false;
        }
    }
    return true;
}
```

## [单词接龙](https://leetcode-cn.com/problems/word-ladder/description/)

```java
// 今天随机的题目有点难，待我周末学习一下DFS和BFS再搞。
```


# 数据库


# Shell
