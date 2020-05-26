const path = require('path');
const fs = require('fs');
const fileHelper = {};

/**
* File upload helper function to simplify uploading, renaming and deleting a file
* uses file-expressupload for the upload functionality
*/

/**
* @func uploadFile
* @param projectName is used to create a new file name. set up to replace special
* characters with "_" along with ammending "_image" to end of the file name
* @param file takes a file request (req.files.FILE_NAME) to upload
* @func validateFile is used to validate and check it is ok to be uploaded
* @const maxFileSize sets the max file size that can be upload
* @const formats is an array of formats that can be accepted. the function
* will then loop through each value (format), and if the current format
* doesn't match, it will throw an error 
*/

/**
* @func renameFile
* @param newName is used to create a new name. replaces special characters with "_"
* @param oldName is the current file name. then uses fs.renameSync, and replaces old file name
* with thew new one.
*/

/**
* @func deleteFile
* @param fileName simply takes a file name, uses the global @const FILE_DIR, concatenates 
* them together, and uses fs.unlinkSync to delete the file.
*/

//global vars
const FILE_DIR = '../client/public/images/';

fileHelper.uploadFile = (projectName, file) => {
	const formatFileName = projectName.replace(/[&\/\\#,+()$~%.'":*?<>/ /{}]/g, '_').toLowerCase();
	const fileExt = path.extname(file.name);
	const newFileName = `${formatFileName}_image${fileExt}`;
	const filePath = `${FILE_DIR}${newFileName}`;

	const validateFile = () => {
		const currentFormat = file.mimetype;
		const size = file.size;
		const maxFileSize = 3000000;
		const formats = [ 'image/png', 'image/jpeg', 'image/jpg' ];

		if (formats.every((format) => format != currentFormat)) {
			throw Error('Please choose the corrent format.');
		} else if (size > maxFileSize) {
			throw Error('Image size too large. ');
		}
	};

	const uploadFile = () => {
		file.mv(filePath, (err) => {
			if (err) {
				console.log(err);
				throw Error('Something went wrong uploading the image');
			}
		});
	};

	validateFile();
	uploadFile();

	return {
		fileName: newFileName
	};
};

fileHelper.renameFile = (newName, oldName) => {
	const fileExt = path.extname(oldName);
	const formatFileName = newName.replace(/[&\/\\#,+()$~%.'":*?<>/ /{}]/g, '_').toLowerCase();
	const newFileName = `${formatFileName}_image${fileExt}`;
	const oldFilePath = `${FILE_DIR}${oldName}`;
	let newFilePath = `${FILE_DIR}${newFileName}`;

	const renameFile = () => {
		if (fs.existsSync(oldFilePath)) {
			fs.renameSync(oldFilePath, newFilePath);
		} else {
			throw Error('Error renaming image name');
		}
	};

	renameFile();

	return {
		newFileName: newFileName
	};
};

fileHelper.deleteFile = (fileName) => {
	const path = `${FILE_DIR}${fileName}`;

	if (fs.existsSync(path)) {
		fs.unlinkSync(path);
	} else {
		throw Error('Error finding image to delete');
	}
};

module.exports = fileHelper;
