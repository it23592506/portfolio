# Hero Background Video

## How to Add Your Video

Place your hero background video in this folder with one of these names:
- `hero-bg.mp4` (required - MP4 format for best compatibility)
- `hero-bg.webm` (optional - WebM format for better compression)

## Recommended Video Specifications

- **Resolution**: 1920x1080 (Full HD) or higher
- **Duration**: 10-30 seconds (loop seamlessly)
- **File Size**: Keep under 10MB for faster loading
- **Content**: Abstract tech/code visuals, circuits, particles, or subtle animations
- **Style**: Dark themed to match the portfolio

## Tips for Better Performance

1. **Compress your video**: Use tools like HandBrake or FFmpeg
2. **Remove audio**: Since the video is muted, remove the audio track to reduce file size
3. **Optimize for web**: Use `-movflags +faststart` flag in FFmpeg for better streaming

### FFmpeg Command Example:
```bash
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -crf 28 -preset slow -an -movflags +faststart hero-bg.mp4
```

## Optional: Poster Image

Add a poster image at `assets/img/hero-poster.jpg` - This shows while the video loads.

## Free Video Resources

- [Pexels Videos](https://www.pexels.com/videos/) - Free stock videos
- [Pixabay](https://pixabay.com/videos/) - Free videos
- [Coverr](https://coverr.co/) - Beautiful free videos
- [Videvo](https://www.videvo.net/) - Free stock footage

Search for: "technology", "circuits", "particles", "abstract", "code"
