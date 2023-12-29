function highlightWords(text, probability) {
    // Remove special and non-letter characters
    const cleanedText = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"'”“‘’\[\]]/g, '');
    const words = cleanedText.split(/\s+/);
    const highlightedWords = [];

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const randomNum = Math.random();
        const isLastWord = i === words.length - 1; // Sets boolean value based on if it is the last word

        // Assign 'highlight' or 'nonhighlight' based on chance or if it's the last word.
        const spanId = randomNum < probability || isLastWord ? 'highlight' : 'nonhighlight';
        highlightedWords.push(`<span id="${spanId}">${word}</span>`);

        // Add a space between words that are not the last word
        if (!isLastWord) {
            highlightedWords.push(`<span id="highlight"> </span>`);
        }
    }

    return highlightedWords.join('');
}

function generatePoetry() {
    const inputText = document.getElementById('paragraph-input').value;
    const probability = 0.9; // Determines the chance of a word being highlighted
    const highlightedText = highlightWords(inputText, probability);
    const highlightedParagraph = document.getElementById('highlighted-paragraph');

    highlightedParagraph.innerHTML = highlightedText;
    highlightedParagraph.style.padding = '1vw'; // Adds padding to paragraph for formatting
}

function saveAsTXT() {
    const container = document.getElementById('highlighted-paragraph');

    // Extract non-highlighted words and join them into a space-separated string
    const nonHighlightedWords = Array.from(container.querySelectorAll('#nonhighlight')).map(word => word.textContent).join(' ');

    // Add a newline character when a line approaches 80 characters
    const wordsArray = nonHighlightedWords.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of wordsArray) {
        if ((currentLine + word).length < 80) {
            // Add word to the current line if it doesn't exceed 80 characters
            currentLine += `${word} `;
        } else {
            // Start new line if new word would exceed 80 characters
            lines.push(currentLine.trim());
            currentLine = `${word} `;
        }
    }

    // Add last line if it contains content
    if (currentLine.trim()) {
        lines.push(currentLine.trim());
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });

    // Create link element to trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'poetry.txt';

    // Append link to the document body, trigger the click event, and remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

