const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2
//ROUTES
const adminRoutes = require('./routes/adminRoutes');
const projectRoutes = require('./routes/projectRoutes');

//SETUP
const app = express();
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

//use express-file-upload to parse req.files
app.use(fileUpload());

//cloudinary setup. used to save images to cloud
cloudinary.config({
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME
})

const port = process.env.PORT || 5000; 

//CONNECT TO DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//ROUTES SETUP
app.use('/public/images/', express.static('./tmp'));
app.use('/api/', adminRoutes);
app.use('/api/projects', projectRoutes);

app.listen(port, (err) => {
	if (err) console.log(err);
	console.log(`server running on ${port}`);
});
