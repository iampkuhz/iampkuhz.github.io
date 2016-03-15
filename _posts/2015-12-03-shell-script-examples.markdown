---
layout: post
title:  "shell 脚本例子"
date:   2015-12-03 17:32:33
categories: Ubuntu,linux 
---

记录一些用到的脚本例子
<br/>
<br/>
<br/>

<!--more-->

<br/>
<br/>
<br/>

## AWK


{% highlight bash %}
# 打印file文件中第二列大于20的行
cat file | awk '$2>20'

# 查找字符串str第一次出现的行数,然后跳出
awk '/str/{print NR; exit;}' file
{% endhighlight %}


## sort/uniq


{% highlight bash %}
sort -u -k1,1 file | wc -l # 统计文件中第一列不重复的个数
sort file1>a; sort file2>b; comm -12 a b; # 查看2个文件相同的行
{% endhighlight %}


## 文件截取


{% highlight bash %}
# 截取从500000 到 501000 行的内容，对于大文件快
tail -n +500000 file | head -n 1000
{% endhighlight %}
