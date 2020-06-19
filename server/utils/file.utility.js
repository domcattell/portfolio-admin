const cloudinary = require('cloudinary').v2;

const DEFAULT_MAX_SIZE = 3 * 1000000;
const DEFAULT_ALLOWED_FORMATS = [ 'image/png', 'image/jpeg', 'image/jpg' ];
const DEFAULT_CONVERT_FILE = 'png';

/**
 * @param {*} fileName file name which will be used as cloudinary public_id
 * @param {*} file file to be used for upload
 * @param {*} params allow user to custom set max file size, allowed formats and
 * file conversion format, or use defaults if none declared
 */

const uploadFile = ({
	fileName = null,
	file = null,
	maxFileSize = DEFAULT_MAX_SIZE,
	allowedFormats = DEFAULT_ALLOWED_FORMATS,
	convertFile = DEFAULT_CONVERT_FILE
}) => {
	if (!fileName || !file) console.error('ERROR: fileName and file are required parameters');

	//make filename url friendly
	const newFileName = fileName.replace(/[&\/\\#,+()$~%.'":*?<>/ /{}]/g, '_').toLowerCase();

	//get current file type and size
	const currentFormat = file.mimetype;
	const size = file.size;

	//loops through allowed formats and check if current format is valid
	//checks size is below the max file size that has been set
	if (allowedFormats.every((format) => format != currentFormat)) {
		throw Error('Please choose the correct format');
	} else if (size > maxFileSize) {
		throw Error('Image size too large');
	}

	//create new promise for uploading to cloudinary
	return new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload_stream({ public_id: newFileName, format: convertFile }, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			})
			.end(file.data);
	});
};

/**
 * @param {*} newName new name to be used for rename process on cloudinary
 * @param {*} oldName current name that cloudinary will look for to rename
 */

const renameFile = ({ newName = null, oldName = null }) => {
	if (!newName || !oldName) new Error('ERROR: newName and oldName are required parameters');

	//make file name url friendly
	const newFileName = newName.replace(/[&\/\\#,+()$~%.'":*?<>/ /{}]/g, '_').toLowerCase();

	//create new promise to rename file currently present on cloudinary
	return new Promise((resolve, reject) => {
		cloudinary.uploader.rename(oldName, newFileName, { overwrite: true }, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
};

/**
 * @param {*} fileName file name that user wants to delete. cloudinary will look
 * for public_id under this name and perform delete action
 */

const deleteFile = (fileName) => {
	if (!fileName) console.error('ERROR: fileName is a required parameter');

	//create promise to remove file from cloudinary using file name (public_id)
	return new Promise((resolve, reject) => {
		cloudinary.uploader.destroy(fileName, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
};

module.exports = {
	uploadFile,
	renameFile,
	deleteFile
};
