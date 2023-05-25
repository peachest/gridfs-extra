# gridfs-extra

![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/peachest/gridfs-extra)![npm type definitions](https://img.shields.io/npm/types/gridfs-extra)

![Top Language](https://img.shields.io/github/languages/top/peachest/gridfs-extra)![Code Size](https://img.shields.io/github/languages/code-size/peachest/gridfs-extra)![NPM Bundle Size](https://img.shields.io/bundlephobia/min/gridfs-extra?label=npm%20bundle%20size)![License](https://img.shields.io/github/license/peachest/gridfs-extra)

![npm dev dependency version](https://img.shields.io/npm/dependency-version/gridfs-extra/dev/eslint)![npm dev dependency version](https://img.shields.io/npm/dependency-version/gridfs-extra/dev/rollup)![npm dev dependency version](https://img.shields.io/npm/dependency-version/gridfs-extra/dev/typescript)![Dependencies](https://img.shields.io/librariesio/github/peachest/gridfs-extra)

![Goto Counter](https://img.shields.io/github/search/peachest/gridfs-extra/goto)![Github Downloads](https://img.shields.io/github/downloads/peachest/gridfs-extra/total?label=github%20downloads)![GitHub issues](https://img.shields.io/github/issues/peachest/gridfs-extra)![Github pull requests](https://img.shields.io/github/issues-pr/peachest/gridfs-extra)![GitHub last commit](https://img.shields.io/github/last-commit/peachest/gridfs-extra)

![NPM Downloads](https://img.shields.io/npm/dt/gridfs-extra?label=npm%20downloads)![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/peachest/gridfs-extra?label=package%20version)


<p align="center">
    <a href="https://peachest.github.io/gridfs-extra/">API 文档</a>
</p>

<p align="center">
    <a href="README.md">English</a>
    ·
    <a href="README_zh-Hans.md">简体中文</a>
</p>



简单封装了 MongoDB GirdFSBucket 的 API。如果你需要搭配 mongoose 使用，请查看这个仓库 [mongoose-gridfs-extra](https://github.com/peachest/mongoose-gridfs-extra)。

本项目是为了避免在原生 API 提供的流对象上执行繁琐且反复的读写操作，节省时间

## 安装

**安装 npm 包**

```shell
npm install gridfs-extra
```



或者 **克隆 Github 仓库**

```shell
# ssh
git clone git@github.com:peachest/gridfs-extra.git

# http
git clone https://github.com/peachest/gridfs-extra.git
```



## Usage

本项目提供了完整的可运行的范例代码。请查看 `example/example.{cjs,mjs}`.

克隆仓库到本地后，请运行：

```shell
cd gridfs-extra
node example/example.cjs
node example/example.mjs
```



****

**在项目中导入**

```javascript
// ESModule
import * as gridfs from "gridfs-extra"
import mongodb from "mongodb"

// or CommandJS
const mongodb = require('mongodb')
const gridfs = require("gridfs-extra")
```



**连接到本地 Mongodb 服务器**

```javascript
const client = new mongodb.MongoClient("mongodb://localhost:27017");

await client.connect()
// or top-level await is not allowed
client.connect().then(async () => {
    // put the following code here
})
```



**创建 GridFS bucket**

```javascript
const db = client.db('test')
const bucketName = "testBucket";
const options = {
    bucketName
}

// gridfs-extra
const bucket = gridfs.createGridFSBucket(db, options)
// or mongodb native API
const bucket = new mongodb.GridFSBucket(db, options) ;
```



**写入文件到 bucket 中**

```javascript
// Read Buffer type file content
const fileName = ""
let file = await fs.readFile("")

// Write file into bucket
const gridFSFile = await gridfs.writeFileByName(bucket, file, fileName)
const id = gridFSFile._id
```



**从 bucket 中读取文件**

```javascript
// Read file from bucket
file = await gridfs.readFileById(bucket, id)
// or use fileName
file = await gridfs.readFileByName(bucket, fileName, {
    revision: -1 // default value
})
```

:warning: 一个 bucket 可以存储同名文件。如果你好奇 bucket 如何在同名文件中按名查找文件，阅读以下 mongodb 官方文档的描述：

> If there are multiple files with the same name, this will stream **the most recent file** with the given name (as determined by the uploadDate field). You can set the **revision option** to change this behavior.

对于 `revision `选项:

> The revision number relative to the oldest file with the given filename.
>
> * 0 gets you the oldest file,
> * 1 gets you the 2nd oldest,
> * -1 gets you the newest.



## License

Apache 2.0

