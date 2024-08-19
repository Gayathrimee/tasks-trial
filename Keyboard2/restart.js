let currentIndex = 0;
let isLoopRunning = true;
let currentInputField = 'to';

const controlButton = document.querySelector('.control');
const spans = document.querySelectorAll('span')

const To = document.querySelector('.to');
const Subject = document.querySelector('.subject');
const Textarea = document.querySelector('#textArea');
const SendButton = document.querySelector('.send button');

function restartProgram(){
    currentIndex = 0;
    currentInputField = 'to';

    spans.forEach(span => span.classList.remove('active'))

    spans[currentIndex].classList.add('active')

    SendButton.style.backgroundColor = 'cornflowerblue';

    // reset the input fields
    To.value = '';
    Subject.value = '';
    Textarea.value = '';
}

controlButton.addEventListener('click', ()=>{
    if(spans.length === 0) return;

    if(currentInputField === 'send'){
        restartProgram();
    } else {
        spans.forEach(span => span.classList.remove('active'));

        currentIndex = (currentIndex + 1) % spans.length;

    }
});

// Handle double-click on the control button
controlButton.addEventListener('dblclick', () => {
    if (spans.length === 0) return; // No spans to work with

    // Stop the loop
    isLoopRunning = false;

    // Get the active span
    const activeSpan = document.querySelector('span.active');
    if (activeSpan) {
        // Get the text content of the active span
        const char = activeSpan.textContent.trim();

        // Handle special characters and focus management
        if (char === 'backspace') {
            // Remove the last character from the current input field
            if (currentInputField === 'to') {
                To.value = To.value.slice(0, -1);
            } else if (currentInputField === 'subject') {
                Subject.value = Subject.value.slice(0, -1);
            } else if (currentInputField === 'textarea') {
                Textarea.value = Textarea.value.slice(0, -1);
            }
        } else if (char === 'Enter') {
            // Move focus from TO -> SUBJECT -> TEXTAREA -> SEND BUTTON
            if (currentInputField === 'to') {
                Subject.focus(); // Move to SUBJECT
                currentInputField = 'subject'; // Update the active field
            } else if (currentInputField === 'subject') {
                Textarea.focus(); // Move to TEXTAREA
                currentInputField = 'textarea'; // Update the active field
            } else if (currentInputField === 'textarea') {
                SendButton.focus(); // Move to SEND button
                currentInputField = 'send'; // Update the active field
                SendButton.style.backgroundColor = 'green'; // Indicate send button active state
                console.log('send');
            }
        } else if (char === 'spacebar') {
            // Insert a space into the current input field
            if (currentInputField === 'to') {
                To.value += ' ';
            } else if (currentInputField === 'subject') {
                Subject.value += ' ';
            } else if (currentInputField === 'textarea') {
                Textarea.value += ' ';
            }
        } else {
            // Append the character to the current input field
            if (currentInputField === 'to') {
                To.value += char;
            } else if (currentInputField === 'subject') {
                Subject.value += char;
            } else if (currentInputField === 'textarea') {
                Textarea.value += char;
            }
        }

        console.log('Appended to', currentInputField, ':', char);
    }   
});

// Initialize the first active span
function initializeLoop() {
    if (spans.length > 0) {
        spans[currentIndex].classList.add('active');
        isLoopRunning = true; // Ensure the loop is running on initialization
    }
}