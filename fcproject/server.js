/* Much of  starting code came from Dr. Zappala. */ 
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

//Knex
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

let bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/api/scores', (req, res) => {
      	knex('scores').insert({user_id: req.body.id, score: req.body.score});
	return;
    }); 

app.post('/api/login', (req, res) => {
	if (!req.body.email || !req.body.password) {
	    return res.status(400).send();
	}
	knex('users').where('email', req.body.email).first().then(user => {
		if (user === undefined) {
		    res.status(403).send('Invalid Credentionals');
		    throw new Error('abort');
		}
		return [bcrypt.compare(req.body.password, user.hash), user];
		console.log(user.hash);
	    }).spread((result, user) => {
	    if (result) {
		res.status(200).json({user: {username:user.username, id:user.id}});
	    }
	    else {
		res.status(403).send('Invalid Credentials');
		console.log("HoneySuckleMagoo");
	    }
	    return
		}).catch(error => {
			 if (error.message !== 'abort') {
			     console.log(error);
			     res.status(500).json({ error });
			 }
		});
	   });

app.post('/api/users', (req, res) => {
        if (!req.body.email || !req.body.username || !req.body.password) {
            return res.status(400).send();
        }
	knex('users').where('email', req.body.email).first().then(user => {
		if (user !== undefined) {
		    res.status(403).send('Email already used.');
		    throw new Error('abort');
		}
		return knex('users').where('username', req.body.username).first();
	    }).then(user => {
		    if (user !== undefined) {
			res.status(409).send('Username is already in use.');
			throw new Error('abort');
		    }
		    return bcrypt.hash(req.body.password, saltRounds);
		}).then(hash => {
			console.log("hash:", hash);
			return knex('users').insert({email: req.body.email, hash: hash, username: req.body.username});
		    }).then(ids => {
			    return knex('users').where('id', ids[0]).first().select('username', 'id');
			}).then(user => {
				res.status(200).json({user: user});
				return;
			    }).catch(error => {
				    if (error.message !== 'abort') {
					console.log(error);
					res.status(500).json({ error });
				    }
				});
    });





app.listen(3000, () => console.log('Server listening on port 3000!!!'));
