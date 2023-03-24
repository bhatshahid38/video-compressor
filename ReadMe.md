# Video Compression and YouTube Video Download
This is a Node.js application that provides two routes for downloading and compressing YouTube videos. The downloadYoutubeVideo route allows you to download a YouTube video and save it in the mp4 format with the highest available quality. The CompressVideo route compresses the downloaded video to a 720p resolution while preserving the audio.

Usage
Once the server is running, you can use the following routes:

## downloadYoutubeVideo

This route allows you to download a YouTube video by providing its URL as a query parameter. The downloaded video is saved in the project directory with the name of the video as its title in the mp4 format.
e.g
```
http://localhost:7000/downloadYoutubeVideo?url=https://www.youtube.com/watch?v=FfM3VPj7a9o
```
## Compressing a Video
To compress a video, make a GET request to the '/CompressVideo' route with the 'name' query parameter set to the name of the video file you want to compress:

```
GET /CompressVideo?name=example.mp4
```
The compressed video will be saved to the project directory with the filename 'compressed_example.mp4'. The route will also return the compressed video as a response, and the original and compressed file sizes will be logged to the console.

### The compression settings used in the code are:
```
Video codec: libx264
Video preset: slow
Maximum height: 720p (aspect ratio is preserved)
Constant rate factor (CRF): 22 (lower CRF results in higher quality and larger file size)
Audio codec: copy (preserve original audio codec and bit rate)
Move MP4 metadata and make the video stream start playing before the file is completely downloaded (faststart)
Note: Compressing a video can take a while, especially for larger files.
```

## Test
#### Compressed this Youtube https://www.youtube.com/watch?v=FfM3VPj7a9o Video with a size of 371MB to 50MB.
![compressionResult](https://user-images.githubusercontent.com/122678904/227640075-9b5b02f4-c40e-47eb-92cc-f85b45b73fe0.png)

