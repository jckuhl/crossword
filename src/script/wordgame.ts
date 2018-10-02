interface GameOptions {
    numLetters: number;
    numWords: number;
    wordLength: number;
}

export class WordGame {

    private words: string[];
    private letters: string[];
    private numLetters: number;
    private numWords: number;
    private wordLength: number;
    private ABC: string[] = [];

    // This is a percentage mapping of the most commonly used letters
    // source: https://www3.nd.edu/~busiforc/handouts/cryptography/letterfrequencies.html
    private ABC_FREQ = {
        // tslint disabled here, as I want it sorted by frequency
        // tslint:disable-next-line:object-literal-sort-keys
        e: 11.1607, a: 8.4966, r: 7.5809, i: 7.5448,
        o: 7.1635, t: 6.9509, n: 6.6544, s: 5.7351,
        l: 5.4893, c: 4.5388, u: 3.6308, d: 3.3844,
        p: 3.1671, m: 3.0129, h: 3.0034, g: 2.4705,
        b: 2.0720, f: 1.8121, y: 1.7779, w: 1.2899,
        k: 1.1016, v: 1.0074, x: 0.2902, z: 0.2722,
        j: 0.1965, q: 0.1962
    };

    constructor({numLetters, numWords, wordLength}: GameOptions) {
        this.words = [];
        this.numLetters = numLetters;
        this.numWords = numWords;
        this.wordLength = wordLength;
        this.ABC = this.createFreqArray();
        this.letters = this.getRandomLetters();
    }

    /**
     * Starts the game and sets everything up
     */
    public async startGame() {
        const checkLength = (word: string) => word.length > 3 && word.length < this.wordLength;
        this.words = (await this.getWords())
            .filter(word => this.wordIsPossible(word) && checkLength(word))
            .sort((wordA, wordB) => {
                if (wordA.length > wordB.length) {
                    return -1;
                } else if (wordA.length < wordB.length) {
                    return 1;
                } else {
                    return 0;
                }
            })
            .slice(0, this.numWords);
    }

    public getLetters(): string[] {
        if (!this.letters) {
            throw new Error('No letters, game has not been initialized');
        }
        return this.letters;
    }

    public getGameWords(): string[] {
        if (!this.words) {
            throw new Error('No words, game has not been initialized');
        }
        return this.words;
    }

    /**
     * Creates an array populated with each letter of the alphabet proportional
     * to their frequency.  If we treat Q, the most infrequent letter as the value
     * of 1, then we can determine how many of each letter need to be in this array.
     * This will lead to 56 'e' and 1 'q' and all the other letters at some range between.
     * Thus, randomly picking 'e' should be approximately 11% and 'q' should be approximately 0.2%
     * @returns {string[]}
     */
    private createFreqArray(): string[] {
        // find the constant that sets q, the smallest value, to 1
        const k = 1 / this.ABC_FREQ.q;
        let letters: string[] = [];

        // now multiply each letter in the array by timesing its frequency % by k.
        Object.entries(this.ABC_FREQ).forEach(([letter, freq]) => {
            letters = letters.concat(letter.repeat(freq * k).split(''));
        });
        return letters;
    }

    /**
     * Grabs random letters from the ABC array that's been populated according to frequency
     * @returns {string[]}
     */
    private getRandomLetters(): string[] {
        const random = () => Math.floor(Math.random() * this.ABC.length - 1);

        // ensure each letter is unique
        const letters = new Set();
        while (letters.size < this.numLetters) {
            letters.add(this.ABC[random()]);
        }
        return Array.from(letters);
    }

    /**
     * Fetches the words from Firebase
     * @returns {Promise<string[]>} words if successful, or throws an error
     */
    private getWords(): Promise<string[]> {
        return fetch('https://words-project-breakpoint.firebaseio.com/words.json')
            .then(data => data.json())
            .then(json => json)
            .catch(error => console.log(error));
    }

    /**
     * Determines if a word is possible for the available letters
     * @param {word} string
     * @returns {boolean}
     */
    private wordIsPossible(word: string): boolean {
        let possible = true;
        const letters = word.split('');
        for (const letter of letters) {
            if (this.letters.indexOf(letter) === -1) {
                possible = false;
            }
        }
        return possible;
    }
}
