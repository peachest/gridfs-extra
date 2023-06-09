import mongodb from "mongodb"
import * as gridfs from "gridfs-extra"
import fs from "fs-extra"
import path from "path"
import url from "url";


const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const resolve = p => path.resolve(__dirname, p);

// Create a new MongoClient
const uri = 'mongodb://localhost:27017';
const client = new mongodb.MongoClient(uri);

// Connect to the MongoDB server and get the database
await client.connect();
const db = client.db('mydatabase');

// Create a new GridFSBucket
const bucketName = "testBucket";

console.log(`creating bucket ${bucketName}...`)
const bucket = gridfs.createGridFSBucket(db, {
    bucketName,
})
console.log(`created bucket "${gridfs.getGridFSBucketName(bucket)}" with options ${JSON.stringify(gridfs.getGridFSBucketOptions(bucket), null, 2)}`)

// Read a file
const fileName = "package.json"
const filePath = resolve(path.join("..", fileName))

console.log(`reading file ${fileName}...`)
const packageJson = fs.readFileSync(filePath)

// Write package.json into bucket
console.log(`writing file ${fileName} into bucket ${bucketName}...`)
const gridFSFile = await gridfs.writeFileByName(bucket, packageJson, fileName)
const id = gridFSFile._id

console.log(`reading file ${fileName} from bucket ${bucketName}...`)
let storedPackageJson
// Read file from bucket, the file name must match the one used aboved in writing file to bucket
// storedPackageJson = await gridfs.readFileByName(bucket, fileName)
// or use id for unique
storedPackageJson = await gridfs.readFileById(bucket, id)
console.log(storedPackageJson.toString())


// Close the connection
await client.close();
