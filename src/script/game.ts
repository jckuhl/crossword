import Vue from 'vue';
import { WordGame } from './wordgame';
import { arrayShuffle } from './arrayshuffle';

const VueApp: any = Vue;

const WordAnswer = {
    props: ['answer'],
    template: '<span> {{ answer }} </span>'
};

const Main = new VueApp({
    el: '#app',
    components: {
        'word-answer': WordAnswer
    },
    data: {
        name: 'hello',
        wordGame: new WordGame(10, 10),
        mounted: false,
        letters: [],
        words: [],
        guess: ''
    },
    methods: {
        /**
         * Shuffles the letters
         */
        shuffle() {
            if(!this.mounted) {
                return;
            }
            this.letters = arrayShuffle(this.letters);

            // force Vue to update or the DOM won't reflect the changes.
            this.$forceUpdate();
        }
    },
    async mounted() {
        //must await start game, to fetch from the Firebase database
        await this.wordGame.startGame();
        this.letters = this.wordGame.getLetters();
        this.words = this.wordGame.getGameWords();
        this.mounted = true;
    }
});