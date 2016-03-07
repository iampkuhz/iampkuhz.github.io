<?php
header("Content-Type: text/html; charset=utf-8");
// 指定允许其他域名访问  
header('Access-Control-Allow-Origin:*');  
// 响应类型  
header('Access-Control-Allow-Methods:POST');  
// 响应头设置  
header('Access-Control-Allow-Headers:x-requested-with,content-type');  
$title = $_GET["page"];

require("mysql-localhost-conn.php");
//require("mysql-76-conn.php");
echo $title;

if (!$con)
{
	echo ('Could not connect: ' . mysql_error());
}
else {
	echo "connect!<br/>";
}
$strsql="insert into blogVisitCnt (Date,page,count)  values(curDate(),'$title',1) ON DUPLICATE KEY UPDATE count=count+1;";
mysql_query($strsql);
mysql_close($con);
echo $title;
?>
