export const IMAGE_MAX_SIDE = 1920;
export const IMAGE_JPEG_QUALITY = 0.82;

// Same algorithm as amblema-front src/app/helpers/img.helper.ts (keep in sync)
export class ImageHelper {
  /**
   * Single-pass compression of an image data URL before uploading it:
   * limits the longest side and re-encodes photos as JPEG. Images with
   * transparency or few colors (logos) stay PNG. Returns the original when
   * it can't be improved or isn't a raster data URL, and null when the browser
   * can't decode it (invalid image).
   */
  static compressDataUrl(
    dataUrl: string,
    maxSide = IMAGE_MAX_SIDE,
    quality = IMAGE_JPEG_QUALITY,
  ): Promise<string> {
    const isRaster =
      typeof dataUrl === 'string' &&
      dataUrl.startsWith('data:image/') &&
      !/^data:image\/(gif|svg)/.test(dataUrl);
    if (!isRaster) {
      return Promise.resolve(dataUrl);
    }
    const sourceMime = dataUrl.substring(5, dataUrl.indexOf(';'));

    return new Promise<string>((resolve) => {
      const img = new Image();
      img.onerror = () => resolve(null);
      img.onload = () => {
        try {
          // Browsers already apply the EXIF orientation when decoding
          const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
          const canvas = ImageHelper.drawScaled(
            img,
            Math.round(img.naturalWidth * scale),
            Math.round(img.naturalHeight * scale),
          );
          const keepPng = sourceMime !== 'image/jpeg' && ImageHelper.isGraphic(canvas);
          const outputMime = keepPng ? 'image/png' : 'image/jpeg';
          const result = keepPng
            ? canvas.toDataURL('image/png')
            : canvas.toDataURL('image/jpeg', quality);

          const notImproved =
            scale === 1 && outputMime === sourceMime && result.length >= dataUrl.length;
          resolve(notImproved ? dataUrl : result);
        } catch (e) {
          console.error('error while compressing image', e);
          resolve(dataUrl);
        }
      };
      img.src = dataUrl;
    });
  }

  // Halving steps avoid the aliasing of a single big downscale on canvas
  private static drawScaled(img: HTMLImageElement, width: number, height: number): HTMLCanvasElement {
    let source: HTMLImageElement | HTMLCanvasElement = img;
    let w = img.naturalWidth;
    let h = img.naturalHeight;
    do {
      w = Math.max(width, Math.round(w / 2));
      h = Math.max(height, Math.round(h / 2));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(source, 0, 0, w, h);
      source = canvas;
    } while (w > width || h > height);
    return source as HTMLCanvasElement;
  }

  // Transparency or <= 256 colors: logos/diagrams that JPEG would blur
  private static isGraphic(canvas: HTMLCanvasElement): boolean {
    const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
    const colors = new Set<number>();
    let fewColors = true;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 255) { return true; }
      if (fewColors) {
        colors.add((data[i] << 16) | (data[i + 1] << 8) | data[i + 2]);
        fewColors = colors.size <= 256;
      }
    }
    return fewColors;
  }
}
