<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [gridfs-extra](./gridfs-extra.md) &gt; [writeFileByName](./gridfs-extra.writefilebyname.md)

## writeFileByName() function

readFileByName stores file into gridFS bucket by fileName

**Signature:**

```typescript
declare function writeFileByName(bucket: mongodb.GridFSBucket, file: Buffer, fileName: string, options?: mongodb.GridFSBucketWriteStreamOptions | undefined): Promise<GridFSFile>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  bucket | mongodb.GridFSBucket | a mongodb gridFS bucket |
|  file | Buffer | the file to save into mongodb bucket |
|  fileName | string | name of file to store |
|  options | mongodb.GridFSBucketWriteStreamOptions \| undefined | _(Optional)_ options for opening download stream |

**Returns:**

Promise&lt;GridFSFile&gt;

a promise that resolves to a GridFSFile

## Exceptions

Error

