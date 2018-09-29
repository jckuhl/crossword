class WordGame {

    private words: string[];
    private letters: string[];
    private numLetters: number;
    private ABC = 'abcdefghijklmnopqrstuvwxyz'.split('');

    constructor(numLetters: number) {
        this.numLetters = numLetters;
        this.letters = this.getRandomLetters();
    } 
    

    private getRandomLetters(): string[] {
        const random = ()=> Math.floor(Math.random() * 26);
        const letters = [];
        for(let x = 0; x < this.numLetters; x++) {
            letters.push(this.ABC[random()])
        }
        return letters;
    }

    private getWords(): Promise<string[]> {
        return fetch('https://words-project-breakpoint.firebaseio.com/words.json')
            .then(data => data.json())
            .then(json => json)
            .catch(error => console.log(error));
    }

    async startGame() {
        this.words = (await this.getWords())
        console.log(this.letters);
        console.log(this.words);
    }

}

new WordGame(10).startGame();
