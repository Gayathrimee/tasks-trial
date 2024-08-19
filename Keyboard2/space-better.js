let currentIndex = 0; // Track the current index
let isLoopRunning = false; // Flag to control the loop status

const controlButton = document.querySelector('.control');
const spans = document.querySelectorAll(' span');

// Handle single-click on the control button
controlButton.addEventListener('click', () => {
    if (spans.length === 0) return; // No spans to work with

    if (isLoopRunning) {
        // Remove 'active' class from the previous span if it exists
        spans.forEach(span => span.classList.remove('active'));

        // Add 'active' class to the current span
        spans[currentIndex].classList.add('active');

        // Move to the next span, loop back to the first when reaching the end
        currentIndex = (currentIndex + 1) % spans.length;
    } else {
        // If the loop was paused, resume from the currentIndex
        isLoopRunning = true;
        // Optionally, you can re-add the 'active' class to the current span
        spans.forEach(span => span.classList.remove('active'));
        spans[currentIndex].classList.add('active');
    }
});

// Handle double-click on the control button
controlButton.addEventListener('dblclick', () => {
    if (spans.length === 0) return; // No spans to work with

    // Stop the loop
    isLoopRunning = false;

    // Get the active span
    const activeSpan = document.querySelector(' span.active');
    if (activeSpan) {
        // Get the text content of the active span
        const char = activeSpan.textContent.trim();

        // Insert the content into the textarea
        const textArea = document.getElementById('textArea');
        // textArea.value += char;

         // Handle special characters
         if (char === 'backspace') {
            // Remove the last character from the textarea if it's not empty
            textArea.value = textArea.value.slice(0, -1);
        } else if (char === 'Enter') {
            // Insert a newline into the textarea
            textArea.value += '\n';
        }else if(char === 'spacebar') {
            // insert a space into the textarea
            textArea.value += ' ';
        } else {
            // Append the character to the textarea
            textArea.value += char;
        }

        console.log('Appended to textarea:', char);
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

// 