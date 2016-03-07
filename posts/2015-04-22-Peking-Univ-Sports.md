---
layout: post
title: "北京大学校运会成绩查询/对比 2012-2015"
date: 2015-05-06 15:47:00
categories: 运动
---
[20150506] 更新2015年数据(注:有些项目是2015年新增:仰卧起坐,引体向上,立定跳远.男生的1500米改为1000米, 以上几个项目对比时可能会只有一条数据或没有)

搞来了2012年到2014年3年学校的运动会的成绩[^1],做了一个对比图. 1. 对比了甲组和乙组每个项目的前8名的成绩 2. 对比了每个项目前八名的成绩随着时间的变化. 这周末运动会结束后会把2015年的数据加入. 最近也会整理2011年的运动会资料[^2](还不会自动从网站爬结果,所以还没加上去), 之后也会整合上去.

<br /><br />

<!--more-->
[^1]: 学校运动会主页:<http://sports.pku.edu.cn>
[^2]: 2011年运动会主页:<http://w3.pku.edu.cn/ydh/ydhjs.htm>


<br /><br /><br />

# 甲乙组成绩对比

选择性别，时间和项目，提交后会在下面展示

<div>
	<select id="groupCompGender" data-toggle="select" class="input-xxlarge form-control select select-primary select-sm mrs mbm">
		<option value="0" disabled>性别</option>
		<option value="men" selected="selected">男</option>
		<option value="women">女</option>
	</select>
	<select id="groupCompYear" data-toggle="select" class="input-small form-control select select-primary select-sm mrs mbm">
		<option value="0" disabled>年份</option>
		<option value="1" selected="selected">2012</option>
		<option value="2">2013</option>
		<option value="3">2014</option>
		<option value="4">2015</option>
	</select>
	<select id="groupCompEvent" data-toggle="select" class="input-small form-control select select-primary select-sm mrs mbm">
		<option value="0" disabled>项目</option>
		<option value="1" selected="selected">100米</option>
		<option value="2">200米</option>
		<option value="3">400米</option>
		<option value="4">800米</option>
		<option value="5">1500米</option>
		<option value="6">5000米</option>
		<option value="7">4x100米接力</option>
		<option value="8">4x400米接力</option>
		<option value="9">标枪</option>
		<option value="10">跳远</option>
		<option value="11">铁饼</option>
		<option value="12">铅球</option>
		<option value="13">1000米</option>
		<option value="14">仰卧起坐</option>
		<option value="15">引体向上</option>
		<option value="16">立定跳远</option>
	</select>
	<p style="text-align:center;"><input type="submit" align="center" value="Submit" class="btn btn-danger" onclick="showGroupComparison();" id="groupCompare" /></p>
</div>

<br /><br />

<div id="groupChart">
	<div id="chartContainer3">sports groupCompare will load here!</div>
	<div id="tableContainer3">sports groupCompare  table will load here!</div>
</div>


--- 

<br /><br /><br />

# 前8名成绩的年份对比

选择性别、组别和项目，提交后会在下面展示


      
<div id="myCharts2">
<div>
	<select id="yearCompGender" data-toggle="select" class="input-small form-control select select-primary select-sm mrs mbm  input-sm">
		<option value="0" disabled>性别</option>
		<option value="men" selected="selected">男</option>
		<option value="women">女</option>
	</select>
	<select id="yearCompGroup" data-toggle="select" class="input-small form-control select select-primary select-sm mrs mbm">
		<option value="0" disabled>组别</option>
		<option value="1" selected="selected">甲组</option>
		<option value="2">乙组</option>
	</select>
	<select id="yearCompEvent" data-toggle="select" class="input-small form-control select select-primary select-sm mrs mbm">
		<option value="0" disabled>项目</option>
		<option value="1" selected="selected">100米</option>
		<option value="2">200米</option>
		<option value="3">400米</option>
		<option value="4">800米</option>
		<option value="5">1500米</option>
		<option value="6">5000米</option>
		<option value="7">4x100米接力</option>
		<option value="8">4x400米接力</option>
		<option value="9">标枪</option>
		<option value="10">跳远</option>
		<option value="11">铁饼</option>
		<option value="12">铅球</option>
		<option value="13">1000米</option>
		<option value="14">仰卧起坐</option>
		<option value="15">引体向上</option>
		<option value="16">立定跳远</option>
	</select>

	<p style="text-align:center;"><input type="submit" align="center" value="Submit" class="btn btn-danger" onclick="showyearComparison();" id="groupCompare" /></p>

</div>
	<div id="chartContainer2">sports will load here!</div>
	<div id="tableContainer2">sports groupCompare  table will load here!</div>
</div>

    

  <!-- fusion charts -->
  <script type="text/javascript" src="/js/fusioncharts/fusioncharts.js"></script>
  <script type="text/javascript" src="/js/fusioncharts/themes/fusioncharts.theme.zune.js"></script>
  
<script type="text/javascript" src="/js/20150410-PKU-Sports-Rank.js"></script>
<script type="text/javascript">  
showGroupComparison();
showyearComparison();
</script>  
<br />
<br />
<br />
