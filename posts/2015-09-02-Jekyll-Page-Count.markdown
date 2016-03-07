---
layout: post
title:  "搭建jekyll文章访问统计次数"
date:   2015-09-02 22:32:33
categories: Ubuntu/linux, 示例文章
---

搭了一个个人用的统计每个页面访问次数的东西. 利用服务器的mysql存储每篇文章每天的访问次数,并提供服务器端php读取访问次数,然后使用ajax读取php的返回值,渲染在页面用上
<br />
<br />
<!--more-->


----------

<br />

# LAMP服务器

1. 一台安装了LAMP的linux vps,创建表用于存储访问次数. 为了防止标题中文乱码问题,请设置mysql字符集为`utf8mb4`(设置方式请百度).

{% highlight SQL %}
create table `blogVisitCnt`(
	`Date` DATE default  NULL,
	`page` varchar(100) NOT NULL,
	`count` int(8) default 1,
	unique key(`Date`, `page`));
{% endhighlight %}

<br/>

# 服务器端php文件

2. 在服务器的apache目录下放置文件`BlogCounterGet.php`和`BlogCounterGet.php`,前者用于获取访问次数,后者用于增加访问次数

`BlogCounterGet.php`,查询mysql中存储的次数,返回`"总次数 昨天访问次数 今天访问次数"`
{% highlight PHP %}
<?php
header("Content-Type: text/html; charset=utf-8"); //防止读写数据库乱码
// 下面三个header为了防止 远程的ajax读取该php失败
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:x-requested-with,content-type');

function getInt($sql,$mysql_database,$con){
        mysql_select_db($mysql_database, $con);
        $result=mysql_query($sql);
        list($num) = mysql_fetch_row($result);
        return $num;
}
$range = $_GET["range"];
$page = $_GET["page"];

//连接数据库操作,生成$con
require("mysql-localhost-conn.php");
$sql = "select COALESCE(sum(count),0) from blogVisitCnt where page='$page'";
echo getInt($sql,$mysql_database,$con);
echo " " . getInt($sql . "and curdate()-Date=1",$mysql_database,$con);
echo " " . getInt($sql . "and curdate()=Date",$mysql_database,$con);
mysql_close($con);
?>
{% endhighlight %}

`BlogCounterUpdate.php`类似,插入当前文章当前天访问次数为1(如果存在记录,将访问次数加一)
{% highlight PHP %}
<?php
header("Content-Type: text/html; charset=utf-8");
header('Access-Control-Allow-Origin:*');  
header('Access-Control-Allow-Methods:POST');  
header('Access-Control-Allow-Headers:x-requested-with,content-type');  
$title = $_GET["page"];
require("mysql-localhost-conn.php");
$strsql="insert into blogVisitCnt (Date,page,count)  values(curDate(),'$title',1) ON DUPLICATE KEY UPDATE count=count+1;";
mysql_query($strsql);
mysql_close($con);
?>
{% endhighlight %}

<br/>

# jekyll端js文件

3. jekyll的模板文件`\_layout/post.html`中增加[visit.js](http://7xi4pf.com1.z0.glb.clouddn.com/post/blogvisitvisit-noIP.js)文件路径用于调用上面两个php文件, 记得将visit.js文件中php文件替换为自己vps的php文件的路径

>- 在`post.html`的某一位置加上下面的代码,次数会显示在上面

{% highlight html %}
<p>今日访问量 <a id="todaylVisit"></a></p>
<p>昨日访问量 <a id="lastVisit"></a></p>
<p>总访问量 <a id="allVisit"></a></p>
{% endhighlight %}

>- 在`post.html`的下面添加`visit.js`引用(相对于jekyll目录的路径)

{% highlight html %}
<script  type="text/javascript" src="/php/BlogVisitCount/visit.js"></script>
<script type="text/javascript">  
UpdateBlogVisit("{\{page.title}}");
GetBlogVisitCount("{\{page.title}}");
</script>
{% endhighlight %}



<!-- 多说评论框 start -->
<div class="ds-thread" data-thread-key="{{site.title}}" data-title="{{ site.title }}" data-url="{{ site.url }}"></div>
