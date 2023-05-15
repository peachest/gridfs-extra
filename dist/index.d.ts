import * as mongodb from 'mongodb';
import { GridFSFile } from 'mongodb';

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
declare function createGridFSBucket(db: mongodb.Db, options?: mongodb.GridFSBucketOptions): mongodb.GridFSBucket;
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
declare function writeFileWithStream(uploadStream: mongodb.GridFSBucketWriteStream, file: Buffer): Promise<GridFSFile>;
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
declare function writeFileByName(bucket: mongodb.GridFSBucket, file: Buffer, fileName: string, options?: mongodb.GridFSBucketWriteStreamOptions): Promise<GridFSFile>;
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
declare function writeFileById(bucket: mongodb.GridFSBucket, id: mongodb.ObjectId, file: Buffer, fileName: string, options?: mongodb.GridFSBucketWriteStreamOptions): Promise<GridFSFile>;
/**
 * readFileWithStream reads a file from gridFS bucket using the provided stream
 *
 * @example
 * const stream = bucket.openDownloadStreamByName("example.txt") ;
 * const buffer = await readFileWithStream(stream) ;
 * @param downloadStream - The stream to download file from mongodb
 * @returns returns a promise that resolves to a Buffer
 */
declare function readFileWithStream(downloadStream: mongodb.GridFSBucketReadStream): Promise<Buffer>;
/**
 * readFileByName returns Buffer read from specified file stored in mongodb bucket by fileName
 *
 * @param bucket - a mongodb gridFS bucket
 * @param fileName - name of file to read
 * @param options - options for opening download stream
 * @returns a promise that resolves to a Buffer
 */
declare function readFileByName(bucket: mongodb.GridFSBucket, fileName: string, options?: mongodb.GridFSBucketReadStreamOptionsWithRevision): Promise<Buffer>;
/**
 * readFileByName returns Buffer read from specified file stored in mongodb bucket by objectId
 *
 * @param bucket - a mongodb gridFS bucket
 * @param id - objectId of file to read
 * @param options - options for opening download stream
 * @returns a promise that resolves to a Buffer
 */
declare function readFileById(bucket: mongodb.GridFSBucket, id: mongodb.ObjectId, options?: mongodb.GridFSBucketReadStreamOptionsWithRevision): Promise<Buffer>;

export { createGridFSBucket, readFileById, readFileByName, readFileWithStream, writeFileById, writeFileByName, writeFileWithStream };
