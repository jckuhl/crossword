/**
 * Uses Fisher-Yates to shuffle the array
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @param {any} array Array of elements to be shuffled
 * @returns {Array} returns a new array with the same elements, shuffled
 */
export function arrayShuffle(array: any[]): any[] {
    const random = (len: number) => Math.floor(Math.random() * len);
    const result = array;
    let counter = array.length;
    while (counter > 0) {
        const index = random(counter);
        counter--;
        const temp = result[counter];
        result[counter] = result[index];
        result[index] = temp;
    }
    return result;
}