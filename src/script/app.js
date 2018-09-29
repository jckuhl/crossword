class WordGame {

    constructor() {
        this.words = [];
        this.letters = [];
    } 

    getWords() {
        return fetch('https://words-project-breakpoint.firebaseio.com/words.json')
            .then(data => data.json())
            .then(json => json)
            .catch(error => console.log(error));
    }

    getRandomWords(words, number) {
        const randomWords = [];
        let count = 0;
        const random = ()=> Math.floor(Math.random() * (words.length-1));
        while(count < number) {
            randomWords.push(words[random()]);
            count++;
        }
        return randomWords
    }

    getPuzzleLetters(words) {
        return new Set(words.join('').split('').sort());
    }

    getPossibleWords(words) {
        this.letters = Array.from(this.getPuzzleLetters(words));
        return words.filter(word => {
            let possible = true;
            const chars = word.split('');
            for(let c of chars) {
                if(!this.letters.includes(c)) {
                    possible = false;
                    break;
                }
            }
            return possible;
        });
    }

    async getPuzzleAnswers({len, number}) {
        let words = (await this.getWords()).filter(word => {
            if(word.length > 4 && word.length < len) {
                return word;
            }
        });
        words = this.getRandomWords(words, number);
        this.words = this.getPossibleWords(words);
        return this.words
    }
}

const wordGame = new WordGame();
console.log(wordGame.getPuzzleAnswers({ len: 8, number: 10}));