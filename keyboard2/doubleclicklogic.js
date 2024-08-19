let currentIndex = 0; // Track the current index
let isLoopRunning = true; // Flag to control the loop status
let currentInputField = 'to'; // Track which input field is currently active
let clickTimeout = null; // Timeout for detecting single vs double click

const controlButton = document.querySelector('.control');
const spans = document.querySelectorAll('span'); // Select spans within the .numbers class

// Select input fields and send button
const To = document.querySelector('.to');
const Subject = document.querySelector('.subject');
const Textarea = document.querySelector('#textArea');
const SendButton = document.querySelector('.send button'); // Select the send button

// Handle single-click on the control button
controlButton.addEventListener('click', () => {
    if (clickTimeout) clearTimeout(clickTimeout); // Clear any existing timeout

    // Set a new timeout to delay single-click action
    clickTimeout = setTimeout(() => {
        if (spans.length === 0) return; // No spans to work with

        // Remove 'active' class from the previous span if it exists
        spans.forEach(span => span.classList.remove('active'));

        // Add 'active' class to the current span
        spans[currentIndex].classList.add('active');

        // Move to the next span, loop back to the first when reaching the end
        currentIndex = (currentIndex + 1) % spans.length;

        clickTimeout = null; // Reset clickTimeout
    }, 300); // 300ms delay for detecting single-click
});

// Handle double-click on the control button
controlButton.addEventListener('dblclick', () => {
    if (clickTimeout) clearTimeout(clickTimeout); // Clear the single-click timeout
    clickTimeout = null; // Ensure no single-click action is triggered

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
                SendButton.style.backgroundColor = 'green';
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

// Call the function when the page loads
// initializeLoop();
