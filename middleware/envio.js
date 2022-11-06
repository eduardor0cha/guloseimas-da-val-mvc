const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url:
    process.env.DB_URL ??
    "mongodb+srv://nossouser:nossasenha123@cluster0.muxyzuo.mongodb.net/guloseimas-da-val-database?retryWrites=true&w=majority",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-gdv-database-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "imagens",
      filename: `${Date.now()}-gdv-database-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });
