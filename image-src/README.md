# image-src

Masters for the images and video served from `src/assets/`. Nothing here is
published: the build copies only `src/assets/`, so these files never reach
`dist/`.

## Layout

Folders mirror `src/assets/images/` exactly, so a master is always at the same
purpose path as the asset built from it:

| Master | Served |
|---|---|
| `image-src/gallery/` | `src/assets/images/gallery/` |
| `image-src/hero/` | `src/assets/images/hero/` |
| `image-src/publications/` | `src/assets/images/publications/` |
| `image-src/proof/` | `src/assets/images/proof/` |
| `image-src/video/` | `src/assets/video/` |

## This is not a complete archive

Only some served assets have masters here. The 113 files in
`src/assets/images/proof/` have two; the logos and `og-cover.jpg` have none.
Missing masters came from `dr/`, the raw personal export, which is gitignored
and not in the repository. Do not assume an asset can be regenerated from this
folder -- check first.

`image-src/video/` is gitignored: 22MB of third-party broadcast footage does
not belong in git history.

## Regenerating

Gallery stills -- 1200px on the long edge, JPEG q3 plus WebP q82:

```bash
ffmpeg -i image-src/gallery/<slug>.jpg \
  -vf "scale='if(gt(iw,ih),min(1200,iw),-2)':'if(gt(iw,ih),-2,min(1200,ih))'" \
  -q:v 3 src/assets/images/gallery/<slug>.jpg
ffmpeg -i image-src/gallery/<slug>.jpg \
  -vf "scale='if(gt(iw,ih),min(1200,iw),-2)':'if(gt(iw,ih),-2,min(1200,ih))'" \
  -c:v libwebp -quality 82 src/assets/images/gallery/<slug>.webp
```

`robust-to-resilience-talk` is the one exception: its master carries a burned-in
"Shot on OnePlus" phone watermark across the bottom. Prepend `crop=1280:830:0:0`
to the filter chain to remove it. Measured -- the image is clean above y=830.

Video, and its 4:5 poster frame:

```bash
ffmpeg -i image-src/video/devops-odyssey-kalinga-tv-source.mp4 \
  -c:v libx264 -crf 29 -preset slow -profile:v high -pix_fmt yuv420p \
  -c:a aac -b:a 96k -movflags +faststart \
  src/assets/video/devops-odyssey-kalinga-tv.mp4

ffmpeg -ss 88 -i image-src/video/devops-odyssey-kalinga-tv-source.mp4 \
  -frames:v 1 -vf "crop=292:365:279:8,scale=600:750:flags=lanczos" \
  -q:v 3 src/assets/video/devops-odyssey-kalinga-tv-poster.jpg
```

The poster crop avoids the grey band along the bottom of the broadcast frame
and centres the book cover. The source is 848x480, so the poster is upscaled
and soft by nature -- that is the source, not the encode.

`og-cover.jpg` has no WebP sibling on purpose: several social platforms still
do not accept WebP for preview images.
