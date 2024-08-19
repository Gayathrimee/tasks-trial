// the loop pauses when triple clicked on mouse and when single clicked again on control will start from 1st


let clickCount = 0; // Track the number of clicks
let spanLoop; // To store the interval reference
let clickTimeout; // Timeout for detecting triple-clicks
let isDoubleClick = false; // Flag to track if a double-click occurred

document.querySelector('.control').addEventListener('click', () => {
    clickCount++;

    // Reset click count after 500ms if it's not a triple click
    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
        if (clickCount === 1 && !isDoubleClick) {
            // Single click: Start the loop from the beginning
            startLoop();
        } else if (clickCount === 3) {
            // Triple click: Stop the loop
            stopLoop();
        }
        clickCount = 0; // Reset click count
        isDoubleClick = false; // Reset double-click flag after the sequence
    }, 500);
});

// Function to start the loop
function startLoop() {
    const spans = document.querySelectorAll('.numbers span');
    let currentIndex = 0;
    let previousIndex = -1;

    // Clear any existing interval to prevent multiple loops
    clearInterval(spanLoop);

    // Remove 'active' class from all spans before starting a new loop
    spans.forEach(span => {
        span.classList.remove('active');
    });

    // Set a new interval to start the loop
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
}

// Function to stop the loop
function stopLoop() {
    clearInterval(spanLoop); // Stop the loop by clearing the interval
}

// Handle double-click on spans to keep one selected and type into the textarea
document.querySelectorAll('.numbers span').forEach(span => {
    span.addEventListener('dblclick', (event) => {
        isDoubleClick = true; // Set flag to prevent loop restart on single click

        // Stop the loop when a span is double-clicked
        stopLoop();

        // Remove 'active' class from all spans
        document.querySelectorAll('.numbers span').forEach(span => {
            span.classList.remove('active');
        });

        // Add 'active' class to the double-clicked span to keep it selected
        event.target.classList.add('active');

        // Get the content of the clicked span (e.g., the alphabet or character)
        const char = event.target.textContent.trim();

        // Insert the content into the textarea
        const textArea = document.getElementById('textArea');
        textArea.value += char; // Append the character to the textarea content
    });
});
