Timer
---

不支持 IE 9 及更旧的浏览器

### 下载

* [百度网盘](https://pan.baidu.com/s/1gfJniDH#list/path=%2FShared%2Ftimer&parentPath=%2FShared)
* [Releases · ccoode/timer](https://github.com/ccoode/timer/releases)


### 使用

直接修改 `config.js`，打开 `index.html`。

### 编译

安装 [Node.js](https://nodejs.org/en/)

命令行/Terminal 输入

``` bash
cd timer
npm install
npm run build
```

### 安装微软雅黑字体

将[字体文件](https://pan.baidu.com/s/1gfJniDH#list/path=%2FShared%2Ftimer%2F%E5%AD%97%E4%BD%93&parentPath=%2FShared)复制到 `C:\Windows\Fonts`

### 生成 fonts/inziu.ttf

参考 [雨忆 - 中文字体其实也可以用在网页上的](http://hxgdzyuyi.github.io/blog/chinese-subset.html)，使用 `sfnttool.jar` 得到精简的 [Inziu](https://be5invis.github.io/Iosevka/inziu.html) 字体：

从 [sfntly-builds/sfnttool.jar](https://github.com/reedy/sfntly-builds/blob/master/java-openjdk-8/sfnttool/sfnttool.jar) 获取 `sfnttool.jar`

或者进行编译（假定使用 Windows）：

>1. 安装 jdk，设置好环境。
>
>2. 安装 ant：下载 [ant](http://ant.apache.org/bindownload.cgi) 然后，解压，然后将 `ant\bin` 目录路径加入到环境变量的 `path` 中。
>
>3. 在 cmd 中 cd 到 [sfntly](https://github.com/googlei18n/sfntly) 的 `java` 目录，然后输入 `ant` 就开始编译了。编译完成后，`sfnttool.jar` 在 `dist\tools\sfnttool` 下。

将 `sfnttool.jar` 和 `inziu-SC-regular.ttc` 放在同一目录，cd 至此目录下，命令行输入

```
java -jar sfnttool.jar -w -s '中国广东工业大学计算机学院新生杯辩论赛软件工程科学技术网络的安全信息了反争夺赛季 军亚军冠军正立论反方立论对辩环节盘问环节攻辩小结暂停休整 自由辩论总结陈词卓越班半决赛预复淘汰一二三四五进强弱、；‘，’。/《》？：“{}|”（）￥！—' inziu-SC-regular.ttc inziu.ttf
```

`-s` 后的字符串包含生成的字体子集的所有字符，最后将 `inziu.ttf` 放在 repo 的 `fonts` 下就可以了。
