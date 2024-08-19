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

    spanClasses.forEach((span,index) =>{
        setTimeout(() =>{

            // remove 'active' class from the previous span if it exists
            if(previousIndex >= 0){
                spanClasses[previousIndex].classList.remove('active')
            } 

            span.classList.add('active');           //add the 'active' class to each span

            previousIndex = index;          //update the previousIndex to the current Index
        }, delay);
        delay += interval;          //increase delay for the next span
    })
    // turnOff()

})


// function turnOff(){
//     let currentActive = 0;

//     if(currentActive > 0){
//         spanClasses.forEach(span => span.classList.remove('active'))
//     }
// }