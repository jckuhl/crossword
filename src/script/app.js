function getWords() {
    return fetch('https://words-project-breakpoint.firebaseio.com/words.json')
        .then(data => data.json())
        .then(json => json)
        .catch(error => console.log(error));
}

function getRandomWords(words, number) {
    const randomWords = [];
    let count = 0;
    const random = ()=> Math.floor(Math.random() * (words.length-1));
    while(count < number) {
        randomWords.push(words[random()]);
        count++;
    }
    return randomWords
}

function getPuzzleLetters(words) {
    return new Set(words.join('').split('').sort());
}

async function getPuzzleAnswers({len, number}) {
    let words = (await getWords()).filter(word => {
        if(word.length > 4 && word.length < len) {
            return word;
        }
    });
    words = getRandomWords(words, number)
    console.log(getPuzzleLetters(words));
    return words
}

const answers = getPuzzleAnswers({ len: 8, number: 5})