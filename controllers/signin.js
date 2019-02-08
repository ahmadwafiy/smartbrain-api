
//				//child fucn params	 //parents params
const handleSignin = (db, bcrypt) => (req, res) =>{

	const {email, password} = req.body;  //destructur
	if(!email || !password){ //check samada kosong ke x
		return res.status(400).json('incorrect form submission')
	}
 	
 	db.select('email', 'hash').from('login')
 	.where('email','=', email)//req dlm bentuk body
 	.then(data => {

 		// const tryni = bcrypt.compareSync('', '');
 		// console.log(tryni); //this is synchrounus


 		const isValid = bcrypt.compareSync( password, data[0].hash);
 		if(isValid){
 			db.select('*').from('users')
 			.where('email','=', email)
 			.then(user => {
 				res.json(user[0])
 			})
 			.catch(err => res.status(400).json('unable to get user'))
 		} else{

 			res.status(400).json('wrong credintials_2')//jika passwrd salah
 		}

 	})
	.catch(err => res.status(400).json('wrong credintials_1')) //jika email salah
}


module.exports = {
	handleSignin: handleSignin
}