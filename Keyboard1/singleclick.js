let currentIndex = 0;
let previousIndex = -1;
let isLoopRunning = true;

const controlButton = document.querySelector('.control')
const spans = document.querySelectorAll('span')

// handle clicks on the control btn
controlButton.addEventListener('click', ()=>{
    
    if(spans.length === 0) return;      //no span to work with
    
    // remove active class from the previous span if it exists
    if(previousIndex >= 0){
        spans[previousIndex].classList.remove('active')
    }

    // add active class to the current span
    spans[currentIndex].classList.add('active');

    // update previousIndex to currentIndex
    previousIndex = currentIndex;

    // move to the next span, loop back to the first when reaching the end
    currentIndex = (currentIndex + 1) % spans.length;

    isLoopRunning = true;   //ensure the loop is running
})

// handle double-click on the control button to append active span content to the textarea
controlButton.addEventListener('dblclick', ()=>{

    // stop the loop when control is double-clicked
    isLoopRunning = false;

    // get the active span
    const activeSpan = document.querySelector('.numbers span.active');
    if(activeSpan){
        // get the text content of the active span
        const char = activeSpan.textContent.trim();

        // insert the content into the textarea
        const textArea =   document.getElementById('textArea');
        textArea.value += char;

        console.log('appended to textArea:', char)
    }
});

// initialize the fiest active span
function initializeLoop(){
    if (spans.length > 0){
        spans[currentIndex].classList.add('active')
    }
}

// call the fn when the page loads
// initializeLoop();