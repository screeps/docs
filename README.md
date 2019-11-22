# Screeps 中文文档

该文档是 [Screeps 官方文档](https://docs.screeps.com) 的中文汉化版本 (zh-CN)，由 Screeps 中国玩家自发创建并维护。欢迎加入我们的 Q 群 [Screeps 编程游戏小组](https://shang.qq.com/wpa/qunwpa?idkey=8d9a9245519f3ecc94b23fbdada6d6479d8a3330071e0d44f372bb63a372a083)。

![](https://travis-ci.org/screeps-cn/docs.svg?branch=master)

Click [here](./README.en-US.md) to visit English readme.

## 项目依赖

- Node.js: `8+`
- npm: `Node.js` 自带版本即可

## 部署并启动

```bash
sh start.sh
```

或者 

```bash
# 安装依赖
npm install
cd api
npm install

# 构建带有热更新的静态站点
npm run generate-watch &
cd ..
npm run generate-watch &

# 启动本地服务器
npm run server
```

## 参与 & 贡献

如果你想通过提交 PR 的形式参与该项目，请务必遵守以下规范：

- 请勿修改翻译内容之外的文件，尤其是 `package.json` 及 `package-lock.json`。
- 请解决完所有的冲突后再提交 PR。
- 提交时请正确选择对应的 Label（PR 页面右侧）。

想要了解更多关于如何参与的信息，请参阅 [本文](./CONTRIBUTING.md)。

## 中文教程

本小节收录了一些非官方的中文教程，如果你也想要在下面列出教程，请联系本项目维护人员。

|教程名称|发布平台|作者|
|:-:|:-:|:-:|
[screeps 入门教程](https://twodam.net/tags/screeps)|个人博客|[LuckyKoala](https://github.com/LuckyKoala)
[Screeps 中文教程](https://www.jianshu.com/p/5431cb7f42d3)|简书|[HoPGoldy](https://github.com/HoPGoldy)
[Screeps 游玩指北](https://www.jianshu.com/nb/40235961)|简书|[趣味的吃](https://www.jianshu.com/u/14a95c23386e)
[Screeps 教程及攻略](https://zhuanlan.zhihu.com/c_1097137377700667392)|知乎|[九日木彡](https://www.zhihu.com/people/noname-mr/activities)

## 鸣谢

本项目和 Screeps-cn 社区完全自发维护，在此对这些做出过贡献的人们表示由衷的感谢！如果你曾经做出过贡献但是并没有在下面中找到你的名字，请及时联系我们：

[LokiSharp](https://github.com/LokiSharp)，[ayoitsLuke](https://github.com/ayoitsLuke)，[HHpetra](https://github.com/HHpetra)，[foraphe](https://github.com/foraphe)，[fangxm](https://github.com/fangxm233)，[coldWater](https://github.com/forsaken628)，[SirCM](https://github.com/SirCM)，[HoPGoldy](https://github.com/HoPGoldy)，[趣味的吃](https://github.com/qwedc001)，[zkl2333](https://github.com/zkl2333)。

*排名取决于参与日期。*