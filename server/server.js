const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
//ROUTES
const adminRoutes = require('./routes/adminRoutes');
const projectRoutes = require('./routes/projectRoutes');
// DB Config
const db = require('./config/keys')

//SETUP
const app = express();
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);
app.use(fileUpload());
const port = process.env.PORT || 5000;

//CONNTECT TO DB
const {mongoURI} = db;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

//ROUTES SETUP
app.use('/public/images/', express.static('../client/public/images'));
app.use('/api/', adminRoutes);
app.use('/api/projects', projectRoutes);

app.listen(port, (err) => {
	if (err) console.log(err);
	console.log(`server running on ${port}`);
});
