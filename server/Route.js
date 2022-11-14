import express from 'express';
import pool from './index.js';
// import fs from 'fs'
import path from 'path'
import timeout from 'connect-timeout'
import { fileURLToPath } from 'url'
const app = express()
export const router = express.Router()

// router.get("/",(req,res)=>{
//   res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)),"Client/build/index.html"));
// });

router.use('/', express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), '../build')));
router.get('/', function (request, response) {
  response.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), '../build', 'index.html'));
});
router.get('/gloves', (req, res) => {
  pool.query('SELECT * FROM gloves', (err, row, result) => {
    if (err) throw err;
    res.send(row);
  })
});
router.get('/doctor', (req, res) => {
  pool.query('SELECT * FROM doctors', (err, row, result) => {
    if (err) throw err;
    res.send(row);
  })
});
router.get('/login', (req, res) => {
  console.log("This is backend api...");
  try {
    pool.query('SELECT * FROM login_details', (err, row, result) => {
      res.send(row);
    })
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/login/server', (req, res) => {
  // pool.query("INSERT INTO cities(name) VALUES (?)",JSON.parse(JSON.stringify(req.body.Uname)), (err, result) => {    
  //     console.log(req.body.Uname,"success...");
  //   })
  const { Uid, h, selected, G_name, G_size, portno, G_items, location } = req.body;
  const parse = JSON.parse(Uid)
  console.log("sdf", parse)
   pool.query("INSERT INTO post_api(id,h,selected,G_name,G_size,portno,Company_name,location) VALUES (?,?,?,?,?,?,?,?)"[JSON.parse(Uid, h, selected, G_name, G_size, portno, G_items, location)], (err, result) => {    
    console.log("success...");
  })
})
// function haltOnTimedout (req, res, next) {
//   if (!req.timedout) next()
// }

router.post("/account", (req, res) => {
  const { user, password, conpassword } = req.body;
  console.log(user)
  pool.query('INSERT INTO create_account (Uname,Upass,Uconpass) VALUES(?,?,?)'[JSON.parse(user, password, conpassword)], (err, result) => {
    console.log("inserted...");
  })
});
router.get('/get', (req, res) => {
  pool.query('SELECT * FROM post_api', (err, row, result) => {
    if (err) throw err;
    res.send(row);
  });
});
router.get('/getaccount', async (req, res) => {
  await pool.query('SELECT * FROM create_account', (err, row, result) => {
    if (err) throw err;
    res.send(row);
  });
});