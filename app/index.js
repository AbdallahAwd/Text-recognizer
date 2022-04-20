const T = require("tesseract.js");
const express = require("express");
const multer = require("multer");
const app = express();
const path = require("path");
const port = 3000 || process.env.PORT;

app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console.log(file);

    cb(null, "extactingImage" + ".png");
  },
});

const upload = multer({
  storage: storage,
});

app.post("/", upload.single("image"), (req, res) => {
  T.recognize(`images/extactingImage.png`, req.body.lang, {
    logger: (e) => console.log(e),
  })
    .then((result) => {
      console.log(result.data.text);
      res.status(200);
      res.send({ data: result.data.text });
    })
    .catch((e) => {
      res.status(404);
      console.log(e);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
