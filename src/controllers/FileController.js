const File = require("../models/File");
const Box = require("../models/Box");

class FileController {
  async store(req, res) {
    // Criar  um arquivo
    const box = await Box.findById(req.params.id);
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key
    });

    box.files.push(file);

    await box.save();

    // avisar qd receber o arquivo adicionado
    req.io.sockets.in(box._id).emit("file", file);

    return res.json(file);
    // console.log(req.file)
    // return res.send("ok");
  }
}

module.exports = new FileController();
