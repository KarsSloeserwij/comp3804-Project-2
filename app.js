const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')

var binaryPassword;

app.use(bodyParser.urlencoded({
    extended: true
}));


app.post('/test',function(req,res) {
	var binaryString = req.body.binary;
	binaryPassword = binaryString;
	var writeString = "password,"+binaryString;
	fs.writeFile("./files/test.txt", writeString, function(err) {
	    if(err) {
	        return console.log(err);
	    }

    	console.log("The file was saved!");
	}); 

  	res.send("/password");
});


app.post('/writeFile',function(req,res) {
	var writeString = req.body.string;
	
	fs.appendFile("./files/test.txt", writeString, function(err) {
	    if(err) {
	        return console.log(err);
	    }

    	console.log("The file was saved!");
	}); 

  	res.send("/password");
});


app.post('/writeFileNew',function(req,res) {
	var writeString = req.body.string;
	
	fs.appendFile("./files/newcsv.txt", writeString, function(err) {
	    if(err) {
	        return console.log(err);
	    }

    	console.log("The file was saved!");
	}); 
	res.send("/index");
});

app.get('/getPassword',function(req,res) {
  	res.send(binaryPassword);
});


//assuming app is express Object.
app.get('/password',function(req,res) {
  	res.sendFile(path.join(__dirname + '/html/password.html'));
});

//assuming app is express Object.
app.get('/passwordNew',function(req,res) {
  	res.sendFile(path.join(__dirname + '/html/passwordNew.html'));
});

app.get('/main',function(req,res) {
  	res.sendFile(path.join(__dirname + '/html/main.html'));
});

app.get('/index',function(req,res) {
  	res.sendFile(path.join(__dirname + '/html/index.html'));
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))