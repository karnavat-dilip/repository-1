import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'

const app =express()

const port =2000;

app.use(bodyParser.urlencoded({extended:true }))

const url='mongodb+srv://dilip:k@rnavatdilip@cluster0.9idub.mongodb.net/Cluster0?retryWrites=true&w=majority';

