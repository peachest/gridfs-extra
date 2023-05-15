import * as mongodb from 'mongodb';

/**
 * create a gridFS bucket object to store files into mongodb
 * @example
 * import mongoose = require('mongoose');
 * import gridfs = require('gridfs-extra')
 * const connection = mongoose.createConnection("mongodb://localhost:27017/test")
 * if (connection.readyState !== 1){
 *      throw new Error("Connection is not ready")
 * }
 * const bucket = gridfs.createGridFSBucket(connection.db)
 * @param db - database
 * @param options - options for creating gridFS bucket
 * @returns a mongodb GridFSBucket object
 */
function createGridFSBucket(db, options) {
    return new mongodb.GridFSBucket(db, options);
}
/**
 * writeFileWithStream store a file into gridFS bucket using the provided stream. This function will overwrite the
 *
 *
 * @example
 * const uploadStream = bucket.openUploadStream("example.txt") ;
 * const gridFsFile = await writeFileWithStream(uploadStream, file) ;
 * @param uploadStream - The stream to upload file to mongodb
 * @param file - the file to save into mongodb bucket
 * @returns a promise that resolves to a GridFSFile
 * @throws Error
 */
async function writeFileWithStream(uploadStream, file) {
    uploadStream.write(file);
    return new Promise((resolve, reject) => {
        uploadStream.once("error", (err) => {
            reject(err);
        });
        uploadStream.end((err, gridFsFile) => {
            if (err !== undefined || gridFsFile === undefined) {
                reject(err);
            }
            else {
                resolve(gridFsFile);
            }
        });
    });
}
/**
 * readFileByName stores file into gridFS bucket by fileName
 *
 * @param bucket - a mongodb gridFS bucket
 * @param file - the file to save into mongodb bucket
 * @param fileName - name of file to store
 * @param options - options for opening download stream
 * @returns a promise that resolves to a GridFSFile
 * @throws Error
 */
async function writeFileByName(bucket, file, fileName, options) {
    const uploadStream = bucket.openUploadStream(fileName, options);
    return writeFileWithStream(uploadStream, file);
}
/**
 * readFileByName stores file into gridFS bucket by id
 *
 * @param bucket - a mongodb gridFS bucket
 * @param id - objectId of file to read
 * @param file - the file to save into mongodb bucket
 * @param fileName - name of file to store
 * @param options - options for opening download stream
 * @returns a promise that resolves to a GridFSFile
 * @throws Error
 */
async function writeFileById(bucket, id, file, fileName, options) {
    const uploadStream = bucket.openUploadStreamWithId(id, fileName, options);
    return writeFileWithStream(uploadStream, file);
}
/**
 * readFileWithStream reads a file from gridFS bucket using the provided stream
 *
 * @example
 * const stream = bucket.openDownloadStreamByName("example.txt") ;
 * const buffer = await readFileWithStream(stream) ;
 * @param downloadStream - The stream to download file from mongodb
 * @returns returns a promise that resolves to a Buffer
 */
async function readFileWithStream(downloadStream) {
    const chunks = [];
    let size = 0;
    downloadStream.on("readable", () => {
        let chunk = downloadStream.read();
        while (chunk !== null) {
            chunks.push(chunk);
            size += chunk.length;
            chunk = downloadStream.read();
        }
    });
    return new Promise((resolve) => {
        downloadStream.on("end", () => {
            resolve(Buffer.concat(chunks, size));
        });
    });
}
/**
 * readFileByName returns Buffer read from specified file stored in mongodb bucket by fileName
 *
 * @param bucket - a mongodb gridFS bucket
 * @param fileName - name of file to read
 * @param options - options for opening download stream
 * @returns a promise that resolves to a Buffer
 */
async function readFileByName(bucket, fileName, options) {
    const stream = bucket.openDownloadStreamByName(fileName, options);
    return await readFileWithStream(stream);
}
/**
 * readFileByName returns Buffer read from specified file stored in mongodb bucket by objectId
 *
 * @param bucket - a mongodb gridFS bucket
 * @param id - objectId of file to read
 * @param options - options for opening download stream
 * @returns a promise that resolves to a Buffer
 */
async function readFileById(bucket, id, options) {
    const stream = bucket.openDownloadStream(id, options);
    return await readFileWithStream(stream);
}

export { createGridFSBucket, readFileById, readFileByName, readFileWithStream, writeFileById, writeFileByName, writeFileWithStream };
//# sourceMappingURL=index.mjs.map
