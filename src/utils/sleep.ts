/**
 * Sleep for a given number of seconds
 * @param seconds Number of seconds to sleep
 * @example
 * ```typescript
 * await sleep(5); // sleep for 5 seconds
 * await sleep(10); // sleep for 10 seconds
 * ```
 */
export const sleep = (seconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

export default sleep;
