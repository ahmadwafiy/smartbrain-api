
const Clarifai = require('clarifai');

//API key //nk sorok ni laa sebab clarifai di impaort dkt backend
  const app = new Clarifai.App({
 apiKey: '5e27eae620bc49aa95cfba7b432c0031'
});

const handleApiCall = (req, res) => {
 app.models
  .predict(Clarifai.FACE_DETECT_MODEL,  req.body.input) //api
  .then(data => {
  	res.json(data); //data border muka
  })
  .catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) =>{
	const { id } =req.body;

  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
    	res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
  }

  module.exports = {
  	handleImage,
  	handleApiCall
  }