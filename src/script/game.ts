import Vue from 'vue';
import { WordGame } from './wordgame';
import { arrayShuffle }  from './arrayshuffle';

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
        words: []
    },
    methods: {
        shuffle() {
            if(!this.mounted) {
                return;
            }
            this.letters = arrayShuffle(this.letters);
            console.log(this.letters);
        }
    },
    async mounted() {
        await this.wordGame.startGame();
        this.letters = this.wordGame.getLetters();
        this.words = this.wordGame.getGameWords();
        this.mounted = true;
    }
});