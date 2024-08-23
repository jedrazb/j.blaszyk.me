export const selectHighestResolutionFromSrcSet = (srcSet) => {
  const srcSetArray = srcSet.split(',');
  const srcArraySorted = srcSetArray.map((srcWithResolution) => {
    const [src, resolution] = srcWithResolution.split(' ');
    return src;
  });

  return srcArraySorted[srcArraySorted.length - 1];
};

export const selectThumbnailFromSrcSet = (srcSet) => {
  if (!srcSet) {
    return null; // Handle null or undefined srcSet
  }

  try {
    const srcSetArray = srcSet.split(',');
    const srcArraySorted = srcSetArray.map((srcWithResolution) => {
      const [src] = srcWithResolution.trim().split(' ');
      return src;
    });

    return srcArraySorted[0] || null; // Return the first source or null if none
  } catch (e) {
    throw new Error(`Failed to process srcSet: ${e.message}`);
  }
};
