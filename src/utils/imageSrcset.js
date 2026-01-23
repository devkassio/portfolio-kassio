const getBasePath = (src) => {
  const cleanSrc = src.split('?')[0];
  return cleanSrc.replace(/\.[^/.]+$/, '');
};

export const buildSrcSet = (src, widths, format) =>
  widths.map((width) => `${getBasePath(src)}-${width}w.${format} ${width}w`).join(', ');
