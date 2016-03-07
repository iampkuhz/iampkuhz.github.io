<?php
$mysql_server_name="59.108.48.17"; //数据库服务器名称
$mysql_username="root"; // 连接数据库用户名
$mysql_password="19920326"; // 连接数据库密码
$mysql_database="hanzhe"; // 数据库的名字
$con=mysql_connect($mysql_server_name, $mysql_username, $mysql_password);
mysql_query("SET NAMES utf8"); // avoid chinese error while inserting into mysql
mysql_select_db($mysql_database, $con);
//echo "mysql conected<br/>";
?>
