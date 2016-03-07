---
layout: post
title:  "xml 文件缩进/格式化方法及速度对比"
date:   2016-01-26 17:32:33
categories: Ubuntu,linux
---

Pretty print large xml files(command lines and StAX) <br/>

对比了网上能搜到的shell命令和自己编写的使用StAX程序来对XML文件进行格式化输出

<br/>
<!--more-->

> 下面程序都在linux下执行，默认编码utf8

## 格式化方法

<br/>

### 一、命令行命令（linux）

1. [xmlstarlet](http://xmlstar.sourceforge.net/doc/UG/xmlstarlet-ug.html)(linux, mac, windows下都有)

{% highlight bash %}
xmlstarlet format unformatedXMLFile.xml > targetFormatedXMLFilePath.xml # linux
{% endhighlight %}

2. [xmllint](http://xmlsoft.org/xmllint.html)

{% highlight bash %}
xmllint --format unformatedXMLFile.xml > targetFormatedXMLFilePath.xml # linux
{% endhighlight %}

3. [xml_pp](http://search.cpan.org/~mirod/XML-Twig/), 可以源码安装，参照README步骤

{% highlight bash %}
xml_pp  unformatedXMLFile.xml > targetFormatedXMLFilePath.xml # linux
{% endhighlight %}

4. [tidy]

{% highlight bash %}
sudo apt-get install tidy # 安装tidy
tidy -xml -utf8 -i unformatedXMLFile.xml > targetFormatedXMLFilePath.xml #linux
{% endhighlight %}

<br/>

### 二、Java StAX 

基于[stax-utils](http://mvnrepository.com/artifact/net.java.dev.stax-utils/stax-utils/20070216)库来实现, 采用`BufferedWriter`来减少写操作，加速程序运行

{% highlight Java  %}
import javanet.staxutils.IndentingXMLEventWriter;
import javax.xml.stream.*;
import java.io.*;
public class StAXIndentXML {
    public static boolean prettyPrintXML(String srcXML, String tarXML){
		try {
			XMLEventWriter writer;
            FileOutputStream ow = new FileOutputStream(new File(tarXML));
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(ow, "utf8"), 1000);
            writer = XMLOutputFactory.newInstance().createXMLEventWriter(bw);
			writer = new IndentingXMLEventWriter(writer);
			XMLEventReader reader = XMLInputFactory.newInstance().createXMLEventReader(new InputStreamReader(new FileInputStream(new File(srcXML)), "utf8"));
			while(reader.hasNext()){
				writer.add(reader);
			}
			writer.flush();
		} catch (Exception e) {
            e.printStackTrace();
        } 
        return true;
    }
}
{% endhighlight %}

<br/>

### 速度对比

采用4个文件：Mapping_en.xml(2.3M), intelligence_news(29.3M), trs.xml(490M,含有非标准字符，非标准XML字符`^Z`在正文中)，zhwiki-20150602-pages-articles.xml(5.2GB)

> 注：下面的时间都是在java里调用命令行脚本执行的时间

|   | 2.3M | 29.3M | 490M | 5.2G|
| ------------- | ------------- | -------------| ------------- | ------------- |
| xmlstarlet| 121ms | 1sec 364ms| 停止| 崩掉|
| StAX| 121ms | 1sec 461ms| 停止| 3min 7sec|
| xmllint| 49ms |  896ms| 停止| 崩掉|
| tidy| 185ms | 3sec 348ms| 22sec 338 ms| 崩掉|
| twig| 794ms | 1min 12sec | 停止| 1hour 16min|

可以发现，小文件（< 50M）上表现差不多，大文件indent上自己实现的StAX速度最优,明显快。另外tidy鲁棒性比较好，在处理文件在内存可接受状态下推荐使用，大XML缩进的时候建议使用StAX

<br/>
