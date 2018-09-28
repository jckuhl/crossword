
fetch('https://words-project-breakpoint.firebaseio.com/words.json')
    .then(data=> data.json())
    .then(json=> console.log(json));

