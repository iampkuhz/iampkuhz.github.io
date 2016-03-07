<?php
header("Content-Type: text/html; charset=utf-8");
// 指定允许其他域名访问  
header('Access-Control-Allow-Origin:*');  
// 响应类型  
header('Access-Control-Allow-Methods:POST');  
// 响应头设置  
header('Access-Control-Allow-Headers:x-requested-with,content-type');  

function getInt($sql,$mysql_database,$con){
	mysql_select_db($mysql_database, $con);
	$result=mysql_query($sql);
	list($num) = mysql_fetch_row($result);
	return $num;
}
$range = $_GET["range"];
$page = $_GET["page"];

//echo $sql;
require("mysql-localhost-conn.php");
//require("mysql-76-conn.php");
$sql = "select COALESCE(sum(count),0) from blogVisitCnt where page='$page'";
if($range == "all") {
}
elseif($range == "lastDay") {
	$sql = $sql . " and curdate()-Date=1";
	//echo "sql" . $sql;
}
elseif($range == "today") {
	$sql = $sql . " and curdate()=Date";
	//echo "sql" . $sql;
}
elseif($range == "three"){
	echo getInt($sql,$mysql_database,$con);
	echo " " . getInt($sql . "and curdate()-Date=1",$mysql_database,$con);
	echo " " . getInt($sql . "and curdate()=Date",$mysql_database,$con);
	return;
}
echo getInt($sql,$mysql_database,$con);
mysql_close($con);


?>
