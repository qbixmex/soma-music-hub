/**
 * Process the image URL to ensure it is in the correct format. Could be local or remote.
 * @param imageUrl The image URL to be processed.
 * @example
 * ```typescript
 * const eventImage = imageUrl("your-image.jpg");
 * // OR
 * const eventImage = imageUrl("https://service.com/your-image-name-123abc.jpg");
 * 
 * console.log(eventImage);
 * 
 * // output if url is local: /images/your-image.jpg
 * // output if url is remote: https://service.com/your-image-name-123abc.jpg
 * ```
 * 
 * @returns The processed image URL.
 */
export const getImageUrl = (imageUrl: string) => {

  if (imageUrl === '') {
    throw new Error('Image URL is required');
  }

  //* Remove any leading or trailing whitespace
  imageUrl = imageUrl.trim();

  return imageUrl.startsWith("https") ? imageUrl : `/images/${imageUrl}`;

};

export default getImageUrl;
