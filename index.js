const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
// Setting View Engine
app.set('view engine', 'ejs');

// Making public folder static
app.use('/assets', express.static('public'));

// Setting Routes
app.get('/', function (req, res) {
	res.render('index');
	console.log('Get: ', req.url);
});

// Handling Form Submit
// Setting Upload Directory
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
	filename: function(req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	}
});
var upload = multer({
    storage: storage,
}).fields([
    { name: 'content', maxCount: 1 },
    { name: 'style', maxCount: 1 }
]);


app.post('/', function(req, res) {
	console.log('Post: ', req.url);	
    upload(req, res, function(err) {
        var spawn = require("child_process").spawn; 
        console.log('Body: ', req.body);
    	console.log('Files:', req.files);
        // console.log('Style Image:', req.style);
        // Parameters passed in spawn - 
	    // 1. type_of_script 
	    // 2. list containing Path of the script 
        // so, first name = Mike and last name = Will 
	    var process = spawn('python',["./python/hello.py", req.files.content.path, req.files.style.path]);
	    // Takes stdout data from script which executed 
        // with arguments and send this data to res object 
        process.on('exit', function(code) {
            res.json(JSON.stringify({
                'output': '1604229798970.jpg',
	    		'exitCode': code,
	    	}));
        });
	});
});


// Starting Server
app.listen(3000);
console.log('Kaptionator Server has Started');
