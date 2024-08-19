// let currentIndex = 0; // Track the current index
// let currentInputField = 'to'; // Track which input field is currently active
// let clickTimeout = null; // Timeout for detecting single, double, or triple clicks
// let clickCount = 0; // To track the number of clicks

// const controlButton = document.querySelector('.control');
// const spans = document.querySelectorAll('span'); // Select spans within the .numbers class

// // Select input fields and send button
// const To = document.querySelector('.to');
// const Subject = document.querySelector('.subject');
// const Textarea = document.querySelector('#textArea');
// const SendButton = document.querySelector('.send button'); // Select the send button

// // Function to change focus on triple click when 'Enter' is active
// function changeFocusOnEnter() {
//     // Move focus from TO -> SUBJECT -> TEXTAREA -> SEND BUTTON
//     if (currentInputField === 'to') {
//         Subject.focus(); // Move to SUBJECT
//         currentInputField = 'subject'; // Update the active field
//     } else if (currentInputField === 'subject') {
//         Textarea.focus(); // Move to TEXTAREA
//         currentInputField = 'textarea'; // Update the active field
//     } else if (currentInputField === 'textarea') {
//         SendButton.focus(); // Move to SEND button
//         currentInputField = 'send'; // Update the active field
//         SendButton.style.backgroundColor = 'green';
//         console.log('send');
//     }
// }

// // Handle clicks on the control button
// controlButton.addEventListener('click', () => {
//     clickCount++; // Increment click count for each click

//     // If there's already a timeout, clear it to restart the timer for detecting multiple clicks
//     if (clickTimeout) clearTimeout(clickTimeout);

//     // Set a timeout to process the clicks after 400ms (so we can distinguish between single, double, and triple clicks)
//     clickTimeout = setTimeout(() => {
//         // Handle single click
//         if (clickCount === 1) {
//             // Remove 'active' class from the previous span if it exists
//             spans.forEach(span => span.classList.remove('active'));

//             // Add 'active' class to the current span
//             spans[currentIndex].classList.add('active');

//             // Move to the next span, loop back to the first when reaching the end
//             currentIndex = (currentIndex + 1) % spans.length;
//         }

//         // Handle double click
//         if (clickCount === 2) {
//             const activeSpan = spans[currentIndex]; // Get the current active span
//             const char = activeSpan.textContent.trim();

//             // Process special characters on double click
//             if (char === 'backspace') {
//                 // Remove the last character from the current input field
//                 if (currentInputField === 'to') {
//                     To.value = To.value.slice(0, -1);
//                 } else if (currentInputField === 'subject') {
//                     Subject.value = Subject.value.slice(0, -1);
//                 } else if (currentInputField === 'textarea') {
//                     Textarea.value = Textarea.value.slice(0, -1);
//                 }
//             } else if (char === 'spacebar') {
//                 // Insert a space into the current input field
//                 if (currentInputField === 'to') {
//                     To.value += ' ';
//                 } else if (currentInputField === 'subject') {
//                     Subject.value += ' ';
//                 } else if (currentInputField === 'textarea') {
//                     Textarea.value += ' ';
//                 }
//             }
//         }

//         // Handle triple click
//         if (clickCount === 3) {
//             const activeSpan = spans[currentIndex]; // Get the current active span
//             const char = activeSpan.textContent.trim();

//             // On triple click, if the active span is 'Enter', change focus
//             if (char === 'Enter') {
//                 changeFocusOnEnter();
//             }
//         }

//         // Reset click count and timeout after handling all clicks
//         clickCount = 0;
//         clickTimeout = null;
//     }, 400); // 400ms delay for detecting multiple clicks
// });

// // Initialize the first active span
// function initializeLoop() {
//     if (spans.length > 0) {
//         spans[currentIndex].classList.add('active');
//     }
// }

// // Call the function when the page loads
// initializeLoop();


let currentIndex = 0; // Track the current index
let isLoopRunning = true; // Flag to control the loop status
let currentInputField = 'to'; // Track which input field is currently active
let clickCount = 0; // Count the number of clicks
let clickTimeout = null; // Timeout for detecting clicks

const controlButton = document.querySelector('.control');
const spans = document.querySelectorAll('span'); // Select spans within the .numbers class

// Select input fields and send button
const To = document.querySelector('.to');
const Subject = document.querySelector('.subject');
const Textarea = document.querySelector('#textArea');
const SendButton = document.querySelector('.send button'); // Select the send button

// Handle clicks on the control button
controlButton.addEventListener('click', () => {
    clickCount++; // Increment click count

    if (clickTimeout) clearTimeout(clickTimeout); // Clear any existing timeout

    clickTimeout = setTimeout(() => {
        if (clickCount === 1) {
            // Handle single-click action
            if (spans.length === 0) return; // No spans to work with

            // Remove 'active' class from the previous span if it exists
            spans.forEach(span => span.classList.remove('active'));

            // Add 'active' class to the current span
            spans[currentIndex].classList.add('active');

            // Move to the next span, loop back to the first when reaching the end
            currentIndex = (currentIndex + 1) % spans.length;

            clickCount = 0; // Reset click count
        } else if (clickCount === 2) {
            // Handle double-click action (do nothing for now)
            clickCount = 0; // Reset click count
        } else if (clickCount === 3) {
            // Handle triple-click action
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

            clickCount = 0; // Reset click count
        }
    }, 300); // 300ms delay for detecting click types
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
