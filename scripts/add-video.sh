#!/usr/bin/env bash
# Convert a phone video (e.g. iPhone .mov / HEVC) into a web-ready clip for the site.
#
#   scripts/add-video.sh <input> <name> [crop-top-px] [crop-bottom-px] [poster-second]
#
#   input           the original video file
#   name            output name, e.g. "pull-up" -> public/video/pull-up.mp4 / .webm / .webp
#   crop-top-px     pixels to cut from the top (e.g. Instagram story overlay), default 0
#   crop-bottom-px  pixels to cut from the bottom, default 0
#   poster-second   which second to use as the still poster image, default 0.5
#
# Then add an entry for it to src/content/videos.ts.
set -euo pipefail

in="$1"; name="$2"; top="${3:-0}"; bottom="${4:-0}"; poster_at="${5:-0.5}"
out_dir="$(dirname "$0")/../public/video"
mkdir -p "$out_dir"

crop="crop=iw:ih-${top}-${bottom}:0:${top}"
# Keep the source's full resolution (never upscale), capped at 1080 wide for vertical phone clips.
scale="scale='min(1080,iw)':-2:flags=lanczos"
# Light sharpening and a touch of saturation/contrast for an OLED-style punch.
grade="unsharp=5:5:0.6:5:5:0.0,eq=contrast=1.05:saturation=1.12"

# H.264 + AAC plays in every browser; +faststart lets it start before fully downloaded.
ffmpeg -v error -y -i "$in" \
  -vf "${crop},${scale},${grade},format=yuv420p" \
  -c:v libx264 -preset slow -crf 19 -profile:v high -movflags +faststart \
  -c:a aac -b:a 192k -ac 2 \
  "$out_dir/$name.mp4"

# VP9 + Opus WebM fallback for browsers built without H.264.
ffmpeg -v error -y -i "$in" \
  -vf "${crop},${scale},${grade},format=yuv420p" \
  -c:v libvpx-vp9 -b:v 0 -crf 30 -row-mt 1 -deadline good -cpu-used 2 \
  -c:a libopus -b:a 128k -ac 2 \
  "$out_dir/$name.webm"

ffmpeg -v error -y -ss "$poster_at" -i "$in" -frames:v 1 \
  -vf "${crop},${scale},${grade}" -c:v libwebp -quality 88 \
  "$out_dir/$name.webp"

ffprobe -v error -select_streams v:0 -show_entries stream=width,height:format=duration \
  -of default=nw=1 "$out_dir/$name.mp4"
ls -lh "$out_dir/$name.mp4" "$out_dir/$name.webm" "$out_dir/$name.webp"
