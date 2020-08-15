const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
var numberOfRequests=0;
//Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden=true;
}

// Hide Loading
function complete(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden=false;
    }

}

// Get Quote FROM API
async function getQuote(){
    loading();
    
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // IF Author is blank and unknown
        if(data.quoteAuthor === ' '){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }

        // Reduce font size for long quotes
        
        if(data.quoteText.length>120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        complete();
    } catch(error) {
        numberOfRequests = numberOfRequests+1; 
        console.log(numberOfRequests);
        console.log(error);
        if(numberOfRequests<=10){
            getQuote();
        }else{
            quoteText.innerText = 'It looks like something has broken. Please come after sometime.';
            complete();
        }
    }
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// ON LOAD
getQuote();