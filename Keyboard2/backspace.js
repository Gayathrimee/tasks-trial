let currentIndex = 0;
let previousIndex = -1;
let isLoopRunning = true;
const spans = document.querySelectorAll('span'); // Update the spans collection as needed

// Handle clicks on the control button
document.querySelector('.control').addEventListener('click', () => {
    if (spans.length === 0) return; // No span to work with

    // Remove the 'active' class from the previous span if it exists
    if (previousIndex >= 0) {
        spans[previousIndex].classList.remove('active');
    }

    // Add the 'active' class to the current span
    spans[currentIndex].classList.add('active');

    // Update previousIndex to currentIndex
    previousIndex = currentIndex;

    // Move to the next span, loop back to the first when reaching the end
    currentIndex = (currentIndex + 1) % spans.length;

    // Ensure the loop is running
    isLoopRunning = true;
});

// Handle double-click on the control button to process the active span's content
document.querySelector('.control').addEventListener('dblclick', () => {
    if (!isLoopRunning) return; // Do nothing if the loop is not running

    // Get the active span
    const activeSpan = document.querySelector('span.active');
    if (activeSpan) {
        const char = activeSpan.textContent.trim();
        const textArea = document.getElementById('textArea');

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

        console.log('appended to textArea:', char);
    }
});
