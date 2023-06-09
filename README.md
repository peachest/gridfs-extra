# gridfs-extra

![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/peachest/gridfs-extra)![npm type definitions](https://img.shields.io/npm/types/gridfs-extra)

![Top Language](https://img.shields.io/github/languages/top/peachest/gridfs-extra)![Code Size](https://img.shields.io/github/languages/code-size/peachest/gridfs-extra)![NPM Bundle Size](https://img.shields.io/bundlephobia/min/gridfs-extra?label=npm%20bundle%20size)![License](https://img.shields.io/github/license/peachest/gridfs-extra)

![npm dev dependency version](https://img.shields.io/npm/dependency-version/gridfs-extra/dev/eslint)![npm dev dependency version](https://img.shields.io/npm/dependency-version/gridfs-extra/dev/rollup)![npm dev dependency version](https://img.shields.io/npm/dependency-version/gridfs-extra/dev/typescript)![Dependencies](https://img.shields.io/librariesio/github/peachest/gridfs-extra)

![Goto Counter](https://img.shields.io/github/search/peachest/gridfs-extra/goto)![Github Downloads](https://img.shields.io/github/downloads/peachest/gridfs-extra/total?label=github%20downloads)![GitHub issues](https://img.shields.io/github/issues/peachest/gridfs-extra)![Github pull requests](https://img.shields.io/github/issues-pr/peachest/gridfs-extra)![GitHub last commit](https://img.shields.io/github/last-commit/peachest/gridfs-extra)

![NPM Downloads](https://img.shields.io/npm/dt/gridfs-extra?label=npm%20downloads)![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/peachest/gridfs-extra?label=package%20version)


<p align="center">
    <a href="https://peachest.github.io/gridfs-extra/">API Documents</a>
</p>

<p align="center">
    <a href="README.md">English</a>
    ·
    <a href="README_zh-Hans.md">简体中文</a>
</p>



A simple wrapper for the MongoDB GridFSBucket-API. If you need a similar wrapper for mongoose GridFSBucket-API, see [mongoose-gridfs-extra](https://github.com/peachest/mongoose-gridfs-extra)

This package is designed to avoid operations on the stream objects provided by the native API, thereby saving time.

## Install

**install npm package**

```shell
npm install gridfs-extra
```



or **clone from Github**

```shell
# ssh
git clone git@github.com:peachest/gridfs-extra.git

# http
git clone https://github.com/peachest/gridfs-extra.git
```



## Usage

Complete **runnable** example is provided. See `example/example.{cjs,mjs}`.

 After cloning the repository to local, run:

```shell
cd gridfs-extra
node example/example.cjs
node example/example.mjs
```



****

**Import**

```javascript
// ESModule
import * as gridfs from "gridfs-extra"
import mongodb from "mongodb"

// or CommandJS
const mongodb = require('mongodb')
const gridfs = require("gridfs-extra")
```



**Connect to Mongodb Server**

```javascript
const client = new mongodb.MongoClient("mongodb://localhost:27017");

await client.connect()
// or top-level await is not allowed
client.connect().then(async () => {
    // put the following code here
})
```



**Create GridFS bucket**

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



**Write file into bucket**

```javascript
// Read Buffer type file content
const fileName = ""
let file = await fs.readFile("")

// Write file into bucket
const gridFSFile = await gridfs.writeFileByName(bucket, file, fileName)
const id = gridFSFile._id
```



**Read file from bucket**

```javascript
// Read file from bucket
file = await gridfs.readFileById(bucket, id)
// or use fileName
file = await gridfs.readFileByName(bucket, fileName, {
    revision: -1 // default value
})
```

:warning: A bucket can store files with the same name. If you wonder how the bucket will retrun when read file by name, see the following native doc from mongodb gridfs bucket:

> If there are multiple files with the same name, this will stream **the most recent file** with the given name (as determined by the uploadDate field). You can set the **revision option** to change this behavior.

As for the revision:

> The revision number relative to the oldest file with the given filename.
>
> * 0 gets you the oldest file,
> * 1 gets you the 2nd oldest,
> * -1 gets you the newest.



## License

Apache 2.0

