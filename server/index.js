import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
// import router from './node-js-getting-started/Route.js';
// import mysql from 'mysql'
import path from 'path'
import {fileURLToPath} from 'url'
import pg from 'pg';
import dotenv from 'dotenv'
import {router} from './Route.js';
import { env } from 'process';
dotenv.config()
const Pool = pg.Client
const app = express()
// const del= delete env.PORT;
// env.PORT = 9898;
// env.NODE_ENV='production';
env.NODE_TLS_REJECT_UNAUTHORIZED=0;
const port = process.env.PORT || 9898;
console.log(process.env);
console.log(process.env.NODE_TLS_REJECT_UNAUTHORIZED);
// var pool = new Pool({
//   host: "localhost",
//   user: "postgres",
//   password: "pgsql",
//   database:"postgres",
//   port:5432
// });
// console.log(typeof con);

const devconfig=`postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
const proconfig=process.env.DATABASE_URL;
const pool = new Pool({
  connectionString:process.env.NODE_ENV==="production"?proconfig:devconfig,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  ssl:{
    rejectUnauthorized:true
  },
  ssl: process.env.DATABASE_URL ? true : false
  // ssl:true
})
console.log(pool.connectionString)
pool.connect(function (err) {
  if (err) throw err;
  console.log("Connected successfully!");
});
// pool.query('DELETE from post_api', function (error, results, fields) {
//   if (error)
//     return console.error(error.message);

//   console.log('Deleted Row(s):', results);

// })
  const buildpath=path.join(path.dirname(fileURLToPath(import.meta.url)),"../build/index.html")
  app.use(express.static(buildpath));

// if (process.env.NODE_ENV === "production") {
//   const buildpath=path.join(path.dirname(fileURLToPath(import.meta.url)),"Client/build")
//   app.use(express.static(buildpath));
// }
// console.log('!!!',path.join(path.dirname(fileURLToPath(import.meta.url)), "Client/build/index.html"));
// console.log()
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({extended:true}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", router)
// app.use("/login/server",(req,res,next)=>{
//         res.setTimeout(() => {
//           console.log("req has timeout...")
//           res.send(408)
//         }, 5000)
//         next();
// })

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})
// console.log(__dirname);

export default pool