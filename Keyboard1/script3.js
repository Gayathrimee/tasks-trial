const to = document.querySelector('.to')
// const subject = document.querySelector('.subject')
// const textArea = document.getElementById('textArea')
// const send = document.querySelector('.send')
// const spanClasses = document.querySelectorAll('span')
// const controlButton = document.querySelector('.control')

// let clickCount = 0;
// let spanLoop;
// let clickTimeout;

// controlButton.addEventListener('click', () =>{
//     clickCount++;

//     // reset 

// })
let clickCount = 0; // Track the number of clicks
let spanLoop; // To store the interval reference
let clickTimeout; // Timeout for detecting triple-clicks

document.querySelector('.control').addEventListener('click', () => {
    clickCount++;

    // Reset click count after 500ms if it's not a triple click
    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
        if (clickCount === 1) {
            // Single click: Start the loop from the beginning
            startLoop();
        } else if (clickCount === 3) {
            // Triple click: Stop the loop
            stopLoop();
        }
        clickCount = 0; // Reset click count
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
    spans.forEach(span =>{
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

    }, 500); // Adjust delay as needed
}

// Function to stop the loop
function stopLoop() {
    clearInterval(spanLoop); // Stop the loop by clearing the interval
}
