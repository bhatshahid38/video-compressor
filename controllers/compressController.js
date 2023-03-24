const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

module.exports.compressfile = (req, res) => {
  const inputFileName = req.query.name;
  const inputFilePath = path.join(__dirname, inputFileName);
  const outputFilePath = path.join(__dirname, `compressed_${inputFileName}`);

  const originalSize = fs.statSync(inputFilePath).size;
  console.log('Compressing...');

  ffmpeg(inputFilePath)
  .outputOptions([
    '-c:v libx264',
    '-preset slow',
    '-vf scale=-2:720', // limit video height to 720p, keep aspect ratio
    '-crf 22',
    '-c:a copy', // preserve original audio codec and bit rate
    '-movflags faststart'
  ])  
    .on('end', () => {
      console.log('Compression finished');
      const compressedSize = fs.statSync(outputFilePath).size;
      console.log(`Original size: ${originalSize} bytes`);
      console.log(`Compressed size: ${compressedSize} bytes`);
      res.download(outputFilePath, (err) => {
        if (err) {
          console.error(err);
        }
      });
      res.status(200).send(`Compression finished. Original size: ${originalSize} bytes, compressed size: ${compressedSize} bytes`);
    })
    .on('error', (err) => {
      console.error(err);
      res.sendStatus(500);
    })
    .save(outputFilePath);
};
