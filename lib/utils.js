/**
 * @const {RegExp}
 */
const UUID_TEST = /([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}/i;

/**
 * Get random element from array
 * @param {Array<T>} arr
 * @returns {T} element
 */
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  getRandomElement,
  UUID_TEST,
};
