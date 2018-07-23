# LeetCode

# 算法

## [重复的DNA序列](https://leetcode-cn.com/problems/repeated-dna-sequences/description/)

```java
public List<String> findRepeatedDnaSequences(String s) {
    Map<String, Integer> map = new HashMap();
    int s_length = s.length();
    List<String> strList = new ArrayList<String>();
    for (int i=0; i < s_length-9; i++) {
        String subStr = s.substring(i, i+10);
        if (!map.containsKey(subStr)) {
            map.put(subStr, 1);
        } else {
            if (map.get(subStr) < 2) {
                strList.add(subStr);
            }
            map.put(subStr, map.get(subStr) + 1);
        }
    }
    return strList;
}
```


# 数据库


# Shell
