// Array of quotes
const quotes = [
    "Be yourself; everyone else is already taken.",
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    "So many books, so little time.",
    "A room without books is like a body without a soul.",
    "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
];

// Planned/Initial Approach:
// Step 1: I'm starting by defining an array of quotes.
// Step 2: Create a function to translate the quote.
// USe Google translate API
// Use a quote generator API

// Function to generate a random quote using a quote generating API (name?!). 
// Essentially it is a JSON object and using the random method to source quotes

function generateQuote() {
    fetch("https://type.fit/api/quotes")
        .then((response) => response.json())
        .then((data) => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const quote = data[randomIndex].text;
            document.getElementById("quote").textContent = quote;
        })
        .catch((error) => {
            console.log("Error fetching quote:", error);
        });
}

function translateQuote() {
    const quote = document.getElementById("quote").innerText;
    const languageSelect = document.getElementById("languageSelect");
    const selectedOption = languageSelect.options[languageSelect.selectedIndex];
    let targetLanguage;

    if (selectedOption.value === "custom") {
        const languageInput = document.getElementById("languageInput");
        targetLanguage = languageInput.value;

        // Perform regex validation for custom language input
        const languagePattern = /^[a-zA-Z]+$/;
        if (!languagePattern.test(targetLanguage)) {
            alert("Please enter a valid language name (letters only)");
            return;
        }
    } else {
        targetLanguage = selectedOption.value;
    }

    // Using the Google Translate API to make an API call to translate the quote to the target language

    fetch(
        `https://translation.googleapis.com/language/translate/v2?key=AIzaSyC0lAGHpVroBfnGCDL2N02jmmxMgkqdLtY&q=${quote}&target=${targetLanguage}`
    )
        .then((response) => response.json())
        .then((data) => {
            const translatedQuote = data.data.translations[0].translatedText;
            document.getElementById("quote").innerText = translatedQuote;
        })
        .catch((error) => {
            console.log("Error translating quote:", error);
        });
}

// Event listener for the "Generate Quote" button
document.getElementById("generateBtn").addEventListener("click", generateQuote);

// Event listener for the language select dropdown
document
    .getElementById("languageSelect")
    .addEventListener("change", translateQuote);

// Saving this to ask questions later. I ran into a CORS issue that I dont fully understand
// function generateQuote() {
//     fetch(
//         "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
//     )
//         .then((response) => response.json())
//         .then((data) => {
//             const quote = data.quoteText;
//             document.getElementById("quote").textContent = quote;
//         })
//         .catch((error) => {
//             console.log("Error fetching quote:", error);
//         });
// }
