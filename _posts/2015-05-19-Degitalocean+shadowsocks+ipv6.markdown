---
layout: post
title:  "Degitalocean+shadowsocks+polipo配置socks5+http代理"
date:   2015-05-19 22:32:33
categories: Ubuntu/linux 
---

<br />
<br />
<br />
<!--more-->


----------

<br />

# SwitchVPN的优缺点

1. 不同客户端体验差别很大。

	a. windows客户端速度很好，下载东西可以稳定在300kb/s上，一般都在400-500之间。

	b. linux没有专门的客户端，只能手动设置PPTP连接或OpenVPN连接。而且OpenVPN连接一直没有成功过。并且下载速度只能达到100kb/s，非常恼人

2. 需要连接收费网址之后才能连接VPN

	a. 实验室的网可以访问学校的收费网，但是没有ipv6，而且速度也不行。去学校连SwitchVPN，速度可是达到600kb/s以上，不过需要先连收费网关。一不小心忘关了这个月的时长就没了。

<br />

# 注册Digitalocean账户（获取100刀！）

在bbs看到有人用github教育优惠申请了Digitalocean的100刀的账户礼券，立刻去[https://education.github.com/pack/offers](https://education.github.com/pack/offers)领,他会给你一个奇怪符号组成的优惠码，只要在digitalocean里面输入，账户立刻有了100刀，可以免费用1年多的服务。只要你的github账户通过了教育审核就行了。

之前我注册了一次。北大的`******@pku.edu.cn`的邮箱在申请的时候不能直接选中，需要额外提供学生证照片。第一次申请的时候我只拍了纸质学生证带照片的那页，被拒了。第二次把学生证、学生卡、校内门户的信息都拍了，弄到一张图片里发过去，就过了。

<br />

# 部署步骤

主要参考下面的帖子。其他帖子感觉写的不好，要么无关的东西太多，要么读不懂。。。

1. [DigitalOcean 搭建 Shadowsocks](http://zipperary.com/2015/01/17/ss-built/)

{% highlight bash lineno %}
apt-get install python-pip
pip install shadowsocks
{% endhighlight %}

创建config.json文件

{% highlight bash lineno %}
 mkdir /etc/shadowsocks/
 vim /etc/shadowsocks/config.json
{% endhighlight %}

更新json文件内容如下

{% highlight bash lineno %}
{ # config.json file
    "server":"serverIP",
    "server_port":8388,
    "local_address": "127.0.0.1", # no need
    "local_port":1081, # no need
    "password":"XXXXXXXX",
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open":true
}
{% endhighlight %}

服务器端启动命令`nohup ssserver -c /etc/shadowsocks/config.json &`.添加命令到`/etc/rc.local`设置开机子启动服务. 

客户端我用的是[shadowsocks-qt5](https://github.com/librehat/shadowsocks-qt5),建议ppa安装,省去安装依赖
{% highlight bash lineno %}
sudo add-apt-repository ppa:hzwhuang/ss-qt5
sudo apt-get update
sudo apt-get install shadowsocks-qt5
{% endhighlight %}

客户端链接后即可使用

## http代理

shadowsocks默认的是socks5代理,如果需要http代理,需要安装`polipo`, apt-get 安装即可. 安装完后配置polipo文件`/etc/polipo/config`如下
{% highlight bash lineno %}
logSyslog = false
logFile = "/var/log/polipo/polipo.log"
socksParentProxy = "127.0.0.1:1081" #和shadowsocks端口一致
socksProxyType = socks5 #必须是socks5
chunkHighMark = 50331648
objectHighMark = 16384
serverMaxSlots = 64
serverSlots = 16
serverSlots1 = 32
proxyAddress = "0.0.0.0"
proxyPort = 8123  #http的端口号
{% endhighlight %}
设置完之后记得重启polipo `sudo service polipo restart`
之后设置http代理的时候,代理地址为`127.0.0.1`,端口为`8123`


这里需要注意

1. Digital-Ocean创建完一个Droplet之后，记得在本地ping一下droplet的ip地址。如果ping不通，要先不断创建新的droplet直到能ping通，之后再把之前的droplet删除。如果先删除，再创建，貌似创建的都会是同一个ip的。

2. 如果设置了ssh连接，按照root登陆服务器的时候是不需要输入密码，直接认证过。密码可以在登陆之后再设置。
 
3. Digital-Ocean需要注册paypal账户. paypal建议添加中国银行而不是农行的卡。因为我用的是ubuntu，paypal通过银联卡支付需要使用网上银行。农行的网银需要安装插件，该插件只能在windows下安装（巨坑）；中行的可以装，而且后面付款的时候貌似自动扣款，不需要跳到网银里付。（不知道是不是我开了中行的快捷支付而没开农行的？）

4. 调试的时候服务器端采用前端执行（ssserver -c /etc/shadowsocks.json）,这样出现错误可能会发现。之前我不小心把前端和后端的加密方式选错了，没弄一致，结果死活连不上。

<br />

-------------

<br />

# 支持ipv6

只要把config.json文件的`server`设置为`"::"`,就可以同时监听ipv6和ipv4了. 注意确认自己有ipv6网址(ifconfig查看`inet6 addr`有值且Scope:Global)
<!-- 多说评论框 start -->
<div class="ds-thread" data-thread-key="海淘x1c" data-title="{{ site.title }}" data-url="{{ site.url }}"></div>
