// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'upload_images/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// // Serve the HTML page
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Handle file uploads
// app.post('/upload', upload.array('images'), (req, res) => {
//     const uploadedFiles = req.files.map(file => ({
//         filename: file.originalname,
//         path: file.path
//     }));
//     res.json(uploadedFiles);
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Multer config for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload_images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
