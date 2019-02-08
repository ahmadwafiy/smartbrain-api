const handleRegister = (req, res, db, bcrypt) =>{

	const {email, name, password} = req.body; 
	if(!email || !name || !password){ //check samada kosong ke x
		return res.status(400).json('incorrect form submission')
	}

	const hash = bcrypt.hashSync(password);

	//returning,transaction is knex method
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email') //parse balik email, sebab kita buat returning ini adalah utk pastikan email yg disimpan adalah email ug sama, returning adalah dlm array #baca doc
		.then(loginEmail => {
		 return trx('users')
			.returning('*')// parse balik semua utk disumbat ke tabul users
			.insert({
				email: loginEmail[0], //bcos we returning array
				name: name,
				joined: new Date()
			})
			.then(user => {
			 res.json(user[0]);
			})
		})
		.then(trx.commit)//send tarnsaction
		.catch(trx.rollback)//undur segalanya
	})//trans end
	
	.catch(err => res.status(400).json('unable to register'))

	

}

module.exports ={
	handleRegister: handleRegister
}