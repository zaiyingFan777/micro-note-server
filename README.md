## micro-note-server

## Description

micro note server client

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## commit 规范检查 [参考链接](参考连接：https://blog.csdn.net/fe_watermelon/article/details/127646273)

安装 husky，用于拦截 commit 命令：

```bash
$ pnpm i husky -D
```

初始化 husky:

```bash
$ npx husky install
```

该命令会创建一个 .husky 目录。

```
.husky
└── _
    ├── .gitignore
    └── husky.sh
```

同时，该命令还将 git 所在项目本地环境的 core.hookspath 设置为 .husky。所以，这个 .husky 目录就是我们放 git hook 脚本的地方。

我们执行下面命令，可以看到当前 git 项目的本地配置有：core.hookspath=.husky。

```bash
$ config --local --list
```

其他同事拉取项目时，他们可能会忘记执行上面的命令启用 git hook。但有一个命令他们是一定会执行的，就是执行 npm install 或 yarn 去安装依赖。

于是我们需要利用 npm script 的生命周期脚本，加上一个 prepare。prepare 会在 install 之后执行。

```
// package.json
{
  "scripts": {
   // ...
    "prepare": "husky install"
  }
}
```

这样就能保证新同事拉项目并安装依赖后，husky 被启用。

创建 hook

```bash
npx husky add .husky/pre-commit "pnpm lint"
```

该命令会给你在 .husky 下创建一个 pre-commit 脚本，并填充 pnpm lint 内容，这样我们就能在 commit 前先过一过测试用例。

> 这个脚本会自动设置为可执行。如果你是手动创建的，你需要手动使用 chmod u+x pre-commit 命令将该文件设置为可执行文件。否则钩子脚本是不会执行的。

创建的脚本内容为：

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint
```

它会在真正 commit 前执行 pnpm lint，如果报错就会中止 commit。

pnpm lint 会对代码全量检查，当项目复杂后执行速度可能比较慢，届时可以考虑使用 lint-staged，实现只对暂存区代码进行检查

lint-staged 是一个命令行工具，它能够对 git 的 staged（暂存区）中的文件使用 linter 工具格式化，修复一些风格问题，并再次添加到 staged 上。

一个经典的搭配是，配合 husky 的 pre-commit 钩子将文件 格式化后再提交。pre-commit 在真正 commit 前触发，配合上 lint-staged，就能做一些风格的修正。

使用 lint-staged 强制提交的文件做格式化适用的场景：

1. 一些团队成员使用的编辑器没有或未安装格式化插件，代码不能在保存后自动格式化，容易提交风格错误的代码；
2. 项目开发了一段时间才引入了代码风格规范，希望一点点修正。如果一次性全部格式化，可能会有不少需要手动修复的风格；

下面我们开始配置。

首先我们安装 lint-staged：

```bash
pnpm i lint-staged -D
```

然后新增 pre-commit 钩子，内容为 npx lint-staged：

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

因为提交的文件有多种类型，比如 js、md、less、mdx 等。所以我们还需要配置一下，针对不同类型文件使用不同的 linter。

lint-commit 的配置可以放到 package.json，也可以放到专门的配置文件里。我选择后者，在项目根目录创建一个 .lintstagedrc.js 文件，然后加上以下内容：

```
module.exports = {
  "src/**/*.{js,jsx,ts,tsx}": "eslint --fix",
};
```

这里表示指定在 src 目录下 js、jsx、ts、tsx 后缀文件，使用 eslint 做格式化。我只使用 eslint 做 js 和 ts 的格式化，其他的就不管了，你可以考虑用过 prettier 格式化它们。

使用 commitlint 校验 commit 信息格式

我们希望在提交 commit 时，能够检验 commit 信息，如果不对就不允许提交。这样能防止开发人员提交一些杂乱、无法理解或不统一的信息。

安装：

```bash
pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D
```

然后创建 .commitlintrc.js 配置文件，并添加内容，使用 @commitlint/config-conventional 规则

```
module.exports = {
  extends: ["@commitlint/config-conventional"]
};
```

集成到 husky 中：

这种情况下需要用到 commit-msg 钩子，我们先创建一个 commit-msg。

```bash
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $HUSKY_GIT_PARAMS"
```

conventional 规范集意义：

```
// 提交的类型: 摘要信息
<type>: <subject>
```

常用的 type 值包括如下:

- feat: 添加新功能
- fix: 修复 Bug
- chore: 一些不影响功能的更改
- docs: 专指文档的修改
- perf: 性能方面的优化
- refactor: 代码重构
- test: 添加一些测试代码等等
