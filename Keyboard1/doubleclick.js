let currentIndex = 0;
let previousIndex = -1;
let isLoopRunning = false; // Start with loop not running

const controlButton = document.querySelector('.control');
const spans = document.querySelectorAll(' span');

// Handle single-click on the control button
controlButton.addEventListener('click', () => {
    if (spans.length === 0) return; // No spans to work with

    // Remove 'active' class from the previous span if it exists
    if (previousIndex >= 0) {
        spans[previousIndex].classList.remove('active');
    }

    // Add 'active' class to the current span
    spans[currentIndex].classList.add('active');

    // Update previousIndex to currentIndex
    previousIndex = currentIndex;

    // Move to the next span, loop back to the first when reaching the end
    currentIndex = (currentIndex + 1) % spans.length;

    // Mark the loop as running
    isLoopRunning = true;
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
        textArea.value += char;

        console.log('Appended to textarea:', char);
    }
});

// Initialize the first active span
function initializeLoop() {
    if (spans.length >= 0) {
        spans[currentIndex].classList.add('active');
    }
}

// Call the function when the page loads
initializeLoop();
