---
layout: post
title: "ubuntu误删/etc/passwd文件导致登录系统失败 修复方法"
date: 2015-04-07 15:33:00
category: ubuntu/linux 
---
本来准备备份ubuntu的/etc/passwd文件，结果cp命令写成了mv命令，导致移动后系统没有passwd文件。无法进入root，只能重启；重启后无法登陆系统（停留在grub）引导界面

<!--more-->

<br/>
<br/>
<br/>

# 解决方案一：制作liveCD u盘引导来修复文件
网上搜了一些修改启动ubuntu的grub引导内容的方法，都没有奏效，停留在‘loading initial ramdisk’，最后采用liveCD制作的启动盘修复的

### 制作liveCD u盘引导
相当于制作一个linux的u盘安装程序

1. 迅雷下载iso文件[Ubuntu 14.04.2 LTS](http://releases.ubuntu.com/14.04.2/ubuntu-14.04.2-desktop-amd64.iso)

2. 安装UltraISO

3. [使用UltraISO制作U盘启动盘](http://jingyan.baidu.com/article/a378c960630e61b329283045.html)
    a. UltraISO直接打开ubuntu的iso文件可能不正常，win8系统下在ubuntu的iso上点右键，打开方式，选择Mount，也就是把这个iso加载成虚拟光驱。然后在UltraISO里面，选打开光驱，之后再选“写入硬盘镜像”，写到USB里就行了。
   ![UltralISO\_mount]({{site.IMG_PATH}}/post/20150407/UltraoISO_mount.JPG)

4. 设置系统U盘启动：开机的时候按F12，打开Boot Menu，选USB×××, 重启
    a. 之前安装了ubuntu启动项，也可以到ubuntu启动项中选择最后一个"System setup"

5. 开机后光标放到第一个选项"Try Ubuntu without install",不要点回车, 输入"e"编辑引导模式.

6. 将导数第二行结尾"quiet splash--" 改为"ro init=/bin/bash", 按F10启动
   
   ![try_ubuntu]({{site.IMG_PATH}}/post/20150407/try_ubuntu.png)

7. 稍等一下后会以root登入(u盘上的)系统

{% highlight console %}
// 在u盘上的ubuntu新建一个文件夹,用于挂载原来硬盘上的ubuntu分区
mkdir ~/tmp/
// 挂载原来ubuntu在硬盘上的分区到新创建的tmp文件夹.
// 原来我创建的ubuntu在分区'dev/sda9/'上, 不同的人可能不同,可以逐一挂载,
// 然后ls查看一下目录下面的文件对不对
mount /dev/sda9 ~/tmp/
// ls 查看一下目录下文件是不是安装ubuntu的那个分区
ls ~/tmp/
// 复制文件
// 我当时是把文件备份了,如果没有备份,可以把u盘上的passwd文件复制给硬盘上的ubuntu系统 
// 'cp /etc/passwd ~/tmp/etc/'
cp ~/tmp/etc/passwd.20150407 ~/tmp/etc/passwd
// 复制完了查看一下, 有passwd文件,且不是空文件
ls -al ~/tmp/etc/pass\*
// 搞定了,重新设置启动项为ubuntu启动项排在第一,就可以按正常顺序启动了

{% endhighlight %}


<!-- 多说评论框 start -->
<div class="ds-thread" data-thread-key="no comment!" data-title="{{ site.title }}" data-url="{{ site.url }}"></div>
