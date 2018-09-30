export function arrayShuffle(array: any[]): any[] {
    const random = (len: number)=> Math.floor(Math.random() * (len));
    const result: string[] = [];
    const usedIndexes = new Set();
    for(let i = 0; i < array.length; i++) {
        let index: number;
        do {
            index = random(array.length - 1);
            if(!usedIndexes.has(index)) {
                result[index] = array[i];
                usedIndexes.add(index);
            }
        } while(usedIndexes.has(index));
    }
    return result;
}