const csv = require("csv-parser");
const xlsx = require("xlsx");
const Task = require("../models/Task");
const Agent = require("../models/Agent");

exports.uploadAndDistribute = async (req, res) => {
  try {
    const agents = await Agent.find();

    if (agents.length === 0) {
      return res.status(400).json({ message: "No agents found" });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let items = [];

    if (file.mimetype === "text/csv") {
      const stream = require("stream");
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);

      await new Promise((resolve, reject) => {
        bufferStream
          .pipe(csv())
          .on("data", (data) => {
            items.push({
              firstName: data.FirstName,
              phone: data.Phone,
              notes: data.Notes
            });
          })
          .on("end", resolve)
          .on("error", reject);
      });

    } else {
      const workbook = xlsx.read(file.buffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(sheet);

      items = data.map(row => ({
        firstName: row.FirstName,
        phone: row.Phone,
        notes: row.Notes
      }));
    }

    // 🔥 Equal Distribution Logic
    let index = 0;
    for (let item of items) {
      item.assignedTo = agents[index]._id;
      index = (index + 1) % agents.length;
    }

    await Task.insertMany(items);

    res.status(201).json({
      message: "File uploaded and tasks distributed successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};