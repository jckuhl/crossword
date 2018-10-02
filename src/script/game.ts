import { arrayShuffle } from './arrayshuffle';
import Vue from 'vue';
import { WordGame } from './wordgame';

const WordAnswer = {
    template: '<span v-if="guessed"> {{ answer }} </span>',
    props: ['answer', 'guess'],
    data() {
        return {
            guessed: false
        };
    },
    watch: {
        guess() {
            if (this.guess === this.answer) {
                this.guessed = true;
                this.$emit('correct-guess');
            }
        }
    }
};

const Main = new Vue({
    el: '#app',
    components: {
        'word-answer': WordAnswer
    },
    data: {
        numLetters: 10,
        numWords: 10,
        wordGame: new WordGame({numLetters: 10, numWords: 10, wordLength: 5}),
        mounted: false,
        letters: [],
        words: [],
        guess: '',
        correctGuess: 0
    },
    methods: {
        /**
         * Shuffles the letters
         */
        shuffle() {
            if (!this.mounted) {
                return;
            }
            this.letters = arrayShuffle(this.letters);

            // force Vue to update or the DOM won't reflect the changes.
            this.$forceUpdate();
        },
        submitGuess() {
            if (this.words.includes(this.guess)) {
                console.log('yay');
            } else {
                console.log('nay');
            }
        },
        recieveCorrectGuess() {
            this.correctGuess += 1;
            if (this.correctGuess === this.numWords) {
                console.log('you won!');
            }
        }
    },
    async mounted() {
        // must await start game, to fetch from the Firebase database
        await this.wordGame.startGame();
        this.letters = this.wordGame.getLetters();
        this.words = this.wordGame.getGameWords();
        this.mounted = true;
    }
});
