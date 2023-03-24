const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegPath);

module.exports.youtube = async (req, res) => {
	try {
		const videoUrl = req.query.url;
		const info = await ytdl.getInfo(videoUrl);

		const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
		const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

		const videoStream = ytdl(videoUrl, {
			format: videoFormat,
			quality: 'highestvideo'
		});

		const audioStream = ytdl(videoUrl, {
			format: audioFormat,
			quality: 'highestaudio'
		});

		const fileTitle = info.videoDetails.title.replace(/[^0-9a-zA-Z-_]/g, '');

		res.header('Content-Disposition', `attachment; filename=${fileTitle}.mp4`);

		const filePath = path.join(__dirname, fileTitle);

		// Save video and audio streams separately
		const videoOutputPath = path.join(__dirname, `temp_vedio.mp4`);
		const audioOutputPath = path.join(__dirname, `temp_audio.mp3`);

		videoStream.pipe(fs.createWriteStream(videoOutputPath));
		audioStream.pipe(fs.createWriteStream(audioOutputPath));

		videoStream.on('end', () => {
			console.log('Video and audio streams download completed');
			console.log('Now merging vedio with audio ...');


			const audioFile = videoOutputPath;
			const videoFile = audioOutputPath;
			const outputFile = path.join(__dirname, `${fileTitle}.mp4`);
			ffmpeg()
				.input(audioFile)
				.input(videoFile)
				.output(outputFile)
				.on('end', () => {
					console.log('Merging finished');
					console.log("Youtube Vedio is saved as ",fileTitle);
					fs.unlinkSync(audioFile);
					fs.unlinkSync(videoFile);
					res.status(200).send('Video downloaded successfully');
				})
				.on('error', (err) => {
					console.error('An error occurred while merging the streams:', err.message);
					res.status(500).send('Error: Could not merge audio and video streams');
				})
				.run();
		});

	} catch (error) {
		console.error(error);
		res.status(500).send('Error: Could not download video');
	}
}