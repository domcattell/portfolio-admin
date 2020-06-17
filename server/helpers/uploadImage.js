const path = require('path');
const fs = require('fs');
const imageHelper = {};
const cloudinary = require('cloudinary').v2;

imageHelper.uploadFile = () => {
    const currentFormat = file.mimetype;
    const size = file.size;
    const maxFileSize = 3000000;
    const formats = [ 'image/png', 'image/jpeg', 'image/jpg' ];

    if (formats.every((format) => format != currentFormat)) {
        throw Error('Please choose the correct format.');
    } else if (size > maxFileSize) {
        throw Error('Image size too large. ');
    }
};