const multer = require("multer");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

module.exports = multer({ storage });