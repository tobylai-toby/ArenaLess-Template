这是 ArenaLess 的模板Github仓库，你可以点击右上角`use this template`创建一个项目。然后打开[vscode.dev vscode在线版](https://vscode.dev)，左下角连接储存库，选择你创建的仓库即可。

以下是ArenaLess的教程。别的东西可以去ArenaPro的文档找
# ArenaLess
支持VSCode与TypeScript的神岛游戏制作插件
告别繁琐，拥抱高效！神岛ArenaLess插件，专为游戏开发者设计，旨在通过无缝集成VSCode本地版、[VSCode在线版](https://vscode.dev)与神岛Arena编辑器，为游戏开发带来前所未有的便捷与效率。本插件不仅解决了Arena编辑器功能单一、开发体验不佳的问题，还引入了TypeScript支持，为游戏开发提供更丰富的功能和体验。

👆 以上文字修改自ArenaPro的介绍

本插件旨在实现神岛实验室的ArenaPro的核心功能，并且可以在[VSCode在线版 vscode.dev](https://vscode.dev)和本地版上运行。使用vscode.dev链接到Github仓库后，您就可畅享在任何设备的`TypeScript`+`Arena`编程体验。

## 快速上手
基础操作几乎与ArenaPro一致。
### 创建项目
<kbd>Ctrl+Shift+P</kbd> 打开命令面板，输入选中以下命令：
```
ArenaLess: 创建ArenaLess项目
```
创建完项目如果左侧文件夹列表没有更新，请点击一下刷新按钮（vscode.dev的文件更新不灵敏）

### 项目编写
教程直接使用ArenaPro的：
[你的一个程序](https://www.yuque.com/box3lab/arenapro/ka7wgn4eeett48nl)

### 登录、打包上传
> 如果没有出现`AL`按钮，请用命令`ArenaLess: 激活ArenaLess扩展 (WEB版可能不能自动激活)`。
1. 创建完项目后，你可能会注意到下面的状态栏有一个`AL`按钮，点击它，选择`登录神岛账号`，根据提示进行登录。（请注意：token内容不可以给别人看）
2. 点击`AL`按钮，点击链接扩展地图，选择你要链接到的地图
3. 点击`AL`按钮，点击`构建并上传`。

## 常见问题
### 我想用npm的包，怎么办？
由于`ArenaLess`是为了兼容`vscode web版(vscode.dev)`设计的，在这种环境里，npm是无法使用的。所以ArenaLess引入了一种新的方法：支持从网络引入库，支持`npm:`前缀。
```typescript
// 网络引用库
import ... from 'https://xxxxx/xxxx';

// 那npm怎么办呢？ArenaLess提供了一个npm:前缀，这个前缀就是下面esm.sh链接的缩写
// 前缀列表可以在后面看
import ... from "npm:xxx"
import ... from "npm:xxx@1.0.0"//版本号
import ... from "npm:yyy/路径"

// esm.sh 是一个将npm/jsr/gh上的包转换为es格式的cdn服务
// 以下的用法都可用，在导入的后面你还可以增加路径以导入某个特定的文件。
import ... from "https://esm.sh/npm的包名";
import ... from "https://esm.sh/npm的包名(@版本号)";// https://esm.sh/PKG@SEMVER[/PATH]
import ... from "https://esm.sh/gh/OWNER/REPO[@TAG]/PATH"// github的也可以
import ... from "https://esm.sh/jsr/OWNER/REPO[@TAG]/PATH"// jsr.io的也可以

// 比如说我想用JSON5来解析有注释的JSON文件
import JSON5 from "https://esm.sh/json5";
import JSON5 from "npm:json5";// 也可以
const json=JSON5.parse(`{
    "foo":"bar"// 注释在这里
}`);
```
目前这个操作还可能存在不稳定。

#### 为什么编辑器提示红色了？
因为TypeScript语言支持并不支持网络导入，但是ArenaLess修改了打包器的逻辑实现了此功能。如果你看不惯这个红色提示的的话，在这行之上加一行`// @ts-ignore`即可。
```typescript
// @ts-ignore
import JSON5 from "https://esm.sh/json5";
```

### 网络导入/前缀导入没法兼容ArenaPro怎么办？！
细心的用户可以发现，根目录下有一个`importMap.arenaless.jsonc`，这是用来指定ArenaLess专属导入库的别名的。
通过它我们就可以实现兼容。
```jsonc
{
    "imports":{
        "包名":"导入的地址/带前缀符号的包",
        // 例子
        "json5":"npm:json5"
    }
}
```
```typescript
// 例子
import JSON5 from "json5";// 由于你上面制定了了json5的别名，所以可以直接用json5
// 你在桌面环境用npm install json5 --save 安装json5，然后你会发现代码在ArenaPro中也能运行了。
```
这样指定以后arenaless中就可以直接写`import ... from "包名"`了，你可以更改一下`package.json`，用`npm install xxx`安装相应的包。

## 前缀列表
1. `npm:xxx` -> `https://esm.sh/xxx`
2. `jsr:xxx` -> `https://esm.sh/jsr/xxx`