// when double clicked on control button, it prints the character inthe textarea

let clickCount = 0; // Track the number of clicks
let spanLoop; // To store the interval reference
let clickTimeout; // Timeout for detecting triple-clicks
let isDoubleClick = false; // Flag to track if a double-click occurred
let currentIndex = 0; // Track the current index in the loop
let previousIndex = -1; // Track the previous index to remove 'active' class
let isLoopRunning = false; // Flag to check if the loop is currently running

// Handle clicks on the Control button
document.querySelector('.control').addEventListener('click', () => {
    clickCount++;

    // Reset click count after 500ms if it's not a triple click
    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
        if (clickCount === 1 && !isDoubleClick) {
            // Single click: Start the loop from where it paused
            startLoop();
        } else if (clickCount === 3) {
            // Triple click: Stop the loop
            stopLoop();
        }
        clickCount = 0; // Reset click count
        isDoubleClick = false; // Reset double-click flag after the sequence
    }, 500);
});

// Handle double-click on the Control button to append active span content to textarea
document.querySelector('.control').addEventListener('dblclick', () => {
    isDoubleClick = true; // Set flag to indicate a double-click occurred

    // Stop the loop when Control is double-clicked
    stopLoop();

    // Get the active span
    const activeSpan = document.querySelector('.numbers span.active');
    if (activeSpan) {
        // Get the text content of the active span
        const char = activeSpan.textContent.trim();

        // Insert the content into the textarea
        const textArea = document.getElementById('textArea');
        textArea.value += char; // Append the character to the textarea content

        console.log('Appended to textarea:', char); // For debugging purposes
    }
});

// Function to start the loop from the current index
function startLoop() {
    if (isLoopRunning) return; // If the loop is already running, do nothing

    const spans = document.querySelectorAll('.numbers span');

    // Set a new interval to start the loop from the current index
    spanLoop = setInterval(() => {
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

    }, 1000); // Adjust delay as needed
    
    isLoopRunning = true; // Set the loop as running
}

// Function to stop the loop and retain the current index
function stopLoop() {
    clearInterval(spanLoop); // Stop the loop by clearing the interval
    isLoopRunning = false; // Mark the loop as not running
}
