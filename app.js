/*

The main purpose of this file is to start the node server and to host the restful calls to get files and also write to the logging file

app.post('/writeFileNew')
// this restful call will append or write to a file called newcsv.txt which will contain all the log data

app.get('/passwordShape')
// this restful call will open the passwordShape.html page, used for the pop up creation/entry windows

app.get('/index')
// this restful call will get the main index.html page

*/

// variables required to start app and use file systems and parsing functions
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')

app.use(bodyParser.urlencoded({
    extended: true
}));

// this restful call will append or write to a file called newcsv.txt which will contain all the log data
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

// this restful call will open the passwordShape.html page, used for the pop up creation/entry windows
app.get('/passwordShape',function(req,res) {
  	res.sendFile(path.join(__dirname + '/html/passwordShape.html'));
});

// this restful call will get the main index.html page
app.get('/index',function(req,res) {
  	res.sendFile(path.join(__dirname + '/html/index.html'));
});

// open port for app to listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`))