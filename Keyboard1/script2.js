const to = document.querySelector('.to')
const subject = document.querySelector('.subject')
const textArea = document.getElementById('textArea')
const send = document.querySelector('.send')
const spanClasses = document.querySelectorAll('span')
const controlButton = document.querySelector('.control')


controlButton.addEventListener('click', () =>{
    let delay = 0;
    const interval = 1000;   //1000ms delay between each span activity
    let previousIndex = -1;   //keep track of the previous span index
    let currentIndex = 0;

    // clear existing intervals to ensure only one loop runs at a time
    clearInterval(window.spanLoop);

    // set an interval to loop through the spans continously
    window.spanLoop = setInterval(() =>{
        
        // remove 'active' class form the previous span if it exists
        if(previousIndex >= 0){
            spanClasses[previousIndex].classList.remove('active')
        }

        // add 'active' class to the current span
        spanClasses[currentIndex].classList.add('active');

        // update previousIndex to the currentIndex;
        previousIndex = currentIndex;

        // move to the next span, and loop back to the 1st span
        currentIndex = (currentIndex + 1) % spanClasses.length;
    } , interval);      //the interval time to controls the speed of the loop

})
