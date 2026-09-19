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

Only some served assets have masters here. `src/assets/images/proof/` holds
62 photographs as 120 files (58 as WebP + JPEG pairs, 4 as JPEG only -- see
`proofPicture()` in `src/_includes/lib/proof-picture.ts` for why some proof
images have no WebP), and only 6 of the 62 have a master in `image-src/proof/`.
The logos and `og-cover.jpg` have no master at all. Missing masters came from
`dr/`, the raw personal export, which is gitignored and not in the repository.
Do not assume an asset can be regenerated from this folder -- check first.

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

Video, and its two poster frames. The card uses a 4:5 crop; the lightbox
viewer uses the full 848x480 broadcast frame. Both are needed: a `<video>`
with no metadata yet takes its intrinsic size from its `poster`, so handing
the lightbox the 4:5 crop opened it as a portrait box that snapped to
landscape once playback began. See `videoCard()` in
`src/_includes/components/card-grid.ts`.

```bash
ffmpeg -i image-src/video/devops-odyssey-kalinga-tv-source.mp4 \
  -c:v libx264 -crf 29 -preset slow -profile:v high -pix_fmt yuv420p \
  -c:a aac -b:a 96k -movflags +faststart \
  src/assets/video/devops-odyssey-kalinga-tv.mp4

# Card poster: cropped to the grid's 4:5, with a WebP sibling like any card image.
ffmpeg -ss 88 -i image-src/video/devops-odyssey-kalinga-tv-source.mp4 \
  -frames:v 1 -vf "crop=292:365:279:8,scale=600:750:flags=lanczos" \
  -q:v 3 src/assets/video/devops-odyssey-kalinga-tv-poster.jpg
ffmpeg -i src/assets/video/devops-odyssey-kalinga-tv-poster.jpg \
  -c:v libwebp -quality 84 src/assets/video/devops-odyssey-kalinga-tv-poster.webp

# Lightbox poster: the full broadcast frame, no crop, no WebP (see below).
ffmpeg -ss 88 -i image-src/video/devops-odyssey-kalinga-tv-source.mp4 \
  -frames:v 1 -q:v 3 src/assets/video/devops-odyssey-kalinga-tv-lightbox.jpg
```

The card poster's crop avoids the grey band along the bottom of the broadcast
frame and centres the book cover. The source is 848x480, so both posters are
upscaled and soft by nature -- that is the source, not the encode.

`og-cover.jpg` has no WebP sibling on purpose: several social platforms still
do not accept WebP for preview images. `devops-odyssey-kalinga-tv-lightbox.jpg`
has no WebP sibling for a different reason: it is used only as a `<video>`
`poster` attribute, not inside a `<picture>`, so a second format could never be
selected.
