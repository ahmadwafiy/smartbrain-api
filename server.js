const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors =require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'smartbrain'
  }
});

db.select('*').from('users').then(data => {

	//console.log(data);
});


const app = express();

app.use(bodyParser.json());
app.use(cors())


//for testing purpose


app.get('/',(req, res) => {	res.send(database.users); })


app.post('/signin', signin.handleSignin( db, bcrypt) ) //cara tulis yg lebih advance g(x)[f(x)] >> mula2 parse db, bcrypt, pastu utk settle parents guna lubang(params) sama utk parse req, res

//transaction make sure if something failed, its failed everyting
// buat transaction bila perle settelkan lebih dari perkara dlm 1 masa, update login dan register baru, oleh itu trx ganti db sini
app.post('/register',(req, res) => { register.handleRegister(req, res, db, bcrypt) })

//this algo not the best but, keeping this bcos it can be good solution to avoid problem when using loops.
//if else statement not helping here
//('/profile/:id') adalah salah satu contoh req.params (type of request(4))
app.get('/profile/:id',(req, res) => {profile.handleProfileGet(req, res, db) })

//increment sila rujuk documentation for KNEX
app.put('/image',(req, res) => {image.handleImage(req, res, db)} )
								                   //dependencies injection
app.post('/imageurl',(req, res) => {image.handleApiCall(req, res)} )





app.listen(process.env.PORT || 3000, () =>{

	console.log(`app is running on port ${process.env.PORT}`);
})



/*

/test dlu --> res = this is working
/signin --> POST = succes/fail //POST diguna walaupun bukan create mnde baru tetapi sebagai langkah berjaga utk send password POST>GET
/resgister --> POST --> users
//display profile
	/prolfile/:userId --> GET = user
/image --> PUT --> user //update user setiap kali imej diupload  


*/