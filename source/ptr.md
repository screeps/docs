title: 公共测试领域 (PTR)
---

公共测试领域 (Public Test Realm) 是一个独立的游戏服务器, 拥有单的的世界数据, 玩家脚本, Memory 和设置。 它的创建有两个目的:

1) 测试主服务器将发生的变化和新的特性, 
2) 为玩家提供一个平台，以便在一个多房间环境中安全地测试他们的脚本。

---

<div style="text-align: center">

<p><strong style="font-size: 20px; background: #eee; padding: 10px 40px;">[链接](https://screeps.com/ptr/)</strong></p>

<p>[更新日志](https://screeps.com/forum/category/8/)</p>

<p>[API 参考](http://ptr-docs.screeps.com/api/)</p> 
</div>

---

世界模式和模拟模式都在 PTR 上可用。 所有的游戏世界数据会在每周一 UTC 0:00 从主服务器复制到 PTR, 旧的 PTR 数据(包括玩家脚本) 会被清除。 **不要将 PTR 用于长期存储代码!**

在 PTR 上注册新账户被阻止。 每次当数据被从主服务器复制到 PTR 时, 现有的玩家账户也会被复制。 默认情况下，您的帐户 CPU 订阅处于停用状态。单击 [订购页面](https://screeps.com/ptr/#!/order) 上的激活按钮以启用免费的 PTR 订阅, 订阅将持续到下一次 PTR 重置。

请留意, 在 PTR 中建造任何 structure 仅需要 1 energy, controller 的升级需要 1000 energy。 它允许快速创造测试所需的基础架构。

如果您使用 [grunt-screeps](/commit.html) 来从本地计算机提交脚本, 您可以通过添加 <code style="white-space: nowrap;">ptr: true</code> 选项来提交您的代码至 PTR

PTR 引擎代码的更改会定期部署至 npm 上私有服务器软件包的 `ptr` 分支, 因此您可以用以下命令在本地运行:

```
npm install screeps@ptr
``` 
