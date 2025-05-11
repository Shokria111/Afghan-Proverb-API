import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import allRoutes from './routes/allRoutes.js';

const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');

//folder setup
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
if(!fs.existsSync('Proverbs.json')) fs.writeFileSync('Proverbs.json','[]');

app.use('/', allRoutes());

app.get('/',(req,res)=>{
    res.send('Afghan Proverbs API  is runing!');
})

app.listen(PORT, ()=>{
    console.log("Server is running"); 
})