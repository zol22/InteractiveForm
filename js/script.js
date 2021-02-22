let design = document.getElementById("design");
let color = document.getElementById("color"); // Color dropMenu was disabled in HTML File.
let optionColor = color.children;

let activities = document.getElementById("activities");
let activitiesBox = document.getElementById("activities-box");
let activitiesBoxChildren = activitiesBox.children;
let costPara = document.querySelector("#activities-cost")
let total = document.getElementById("activities-cost");
let totalCost = 0; // Initialize totalcost to 0.

let payment = document.getElementById("payment");
let creditCard = document.getElementById("credit-card");
let paypal = document.getElementById("paypal");
let bitcoin = document.getElementById("bitcoin");
paypal.hidden = true;
bitcoin.hidden = true;

let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let jobRole = document.getElementById('title');
let cardInput = document.getElementById('cc-num');
let zipInput = document.getElementById("zip");
let cvvInput = document.getElementById("cvv");
nameInput.focus();

let form = document.getElementById("form");

let inputCheckbox = document.querySelectorAll('input[type="checkbox"]');

// Event listener for jobs roles
jobRole.addEventListener('change', (e)=> {
    let jobSelected = e.target.value;
    if (jobSelected == 'other'){
        document.getElementById("other-job-role").style.display = "block";
    }
    else {
        document.getElementById("other-job-role").style.display = "none";
    }

})

//Event listener for T-shirt info
design.addEventListener('change', (e)=> {
    color.disabled = false;
    for (let i = 0; i < optionColor.length ; i++){
        let value = e.target.value; // get the selected value in the Design DropMenu.
        let data = optionColor[i].getAttribute('data-theme'); //Get the data-theme of each color option which are "js puns" or "heart js"
        //Compare if value and data are equal
        if (value === data){
            optionColor[i].hidden = false;
            optionColor[i].selected = true;
        } else {
           optionColor[i].hidden = true;
            optionColor[i].selected = false;

        }
    }

})

function  preventConflictingActivities(dayTime,eventName,checked){
  //loop over all of the activities
  for (let i = 0; i < inputCheckbox.length; i++){
    let selectedDayTime = inputCheckbox[i].getAttribute('data-day-and-time');
    let selectedEventName = inputCheckbox[i].getAttribute('name');
    //console.log('\nSelected:\n  '+ "S-daytime: " + selectedDayTime + " S-eventName: "+ selectedEventName);
    if (dayTime === selectedDayTime && eventName !== selectedEventName){
        if(checked){
            inputCheckbox[i].parentElement.classList.add('disabled');
            inputCheckbox[i].disabled = true;
        }
        else {
            inputCheckbox[i].disabled = false;
            inputCheckbox[i].parentElement.classList.remove('disabled');
            }
        }
    }
}

// Event Listener for activities section
activities.addEventListener("change", (e)=> {
    let activity = e.target;
    // Get the target daytime and name attributes
    let dayTime = activity.getAttribute('data-day-and-time');
    let eventName = activity.getAttribute('name');
    let checked = activity.checked;
    preventConflictingActivities(dayTime,eventName,checked);

    let cost = activity.getAttribute('data-cost');
    cost = parseInt(cost); // Convert the string cost to a number  
    let activityCheck = activity.checked; 
    if (activityCheck){
        totalCost +=cost;
        total.innerHTML = totalCost;
        
    }
    else{
        totalCost -=cost;
    }
    total.innerHTML = `Total: $${totalCost}`;
   

    //console.log('target:\n  '+ "daytime: " + dayTime + " eventName: "+ eventName);
    
    

});

// Event listener for payment
payment.addEventListener("change",(e)=> {
     let paymentMethod = e.target.value;

    if (paymentMethod == 'credit-card'){
        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;

    }
    if(paymentMethod == 'paypal'){
        paypal.hidden = false;
        creditCard.hidden = true;
        bitcoin.hidden = true;

    }
    if(paymentMethod == 'bitcoin'){
        bitcoin.hidden = false;
        creditCard.hidden = true;
        paypal.hidden = true;
   
    }

});


//Providing form validation error indications at the moment they occur better servers your user.
nameInput.addEventListener('keyup',(e)=> {
    nameValidator();
});
emailInput.addEventListener('keyup',(e)=> {
    emailValidator();
});
cardInput.addEventListener('keyup',(e)=> {
    cardValidator();
});
zipInput.addEventListener('keyup', (e)=> {
    zipValidator();
})
cvvInput.addEventListener('keyup', (e)=> {
    cvvValidator();
})



// When fields are valid, add class valid to the parent element
function passedValidation(element){
    let parentElement = element.parentElement;
    console.log("Parent Element is: "+ parentElement);
    let lastElementChild = parentElement.lastElementChild;
    parentElement.classList.remove('not-valid');
    parentElement.classList.add('valid');
    lastElementChild.style.display = "none";

}
// When fields are invalid,, add class not valid to the parent element
function failedValidation(element){
    let parentElement = element.parentElement;
    console.log("Failed Parent Element is: "+ parentElement);
    let lastElementChild = parentElement.lastElementChild;
    parentElement.classList.add('not-valid');
    parentElement.classList.remove('valid');
    lastElementChild.style.display = "block";

    
}
// Validators , regex
const nameValidator = () =>{
    let nameValue = nameInput.value;
    let nameIsValid = /^[a-z]+\s*[a-z]+$/i.test(nameValue);

    if (nameIsValid){
        passedValidation(nameInput);
    
    }
    else {
        failedValidation(nameInput);
        
    }

    console.log(nameIsValid);
    return nameIsValid;

}

const emailValidator = () => {
    let emailValue = emailInput.value;
    // If email field is empty
    if (emailValue.trim() === '' || emailValue ===  null){
        document.getElementById('email-hint').innerText = "Please enter an email address.";
    }
    // if email is not empty but formatted incorrectly.
    else {
        document.getElementById('email-hint').innerText = "Email adress must be formatted correctly."
    }

    let emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    
    if (emailIsValid){
        passedValidation(emailInput);
    }
    else {
        failedValidation(emailInput);
    }

    console.log(emailIsValid);
    return emailIsValid;
}

const activityValidator = () => {
    let activityValidator = totalCost > 0;

    if (activityValidator){
        passedValidation(costPara);
    }
    else {
        failedValidation(costPara);
    }

    console.log(activityValidator);
    return activityValidator;
}
const cardValidator = () => {   
    let cardValue = cardInput.value;
    let cardIsValid = /^\d{13,16}$/.test(parseInt(cardValue));

    if (cardIsValid){
        passedValidation(cardInput);
    }
    else {
        failedValidation(cardInput);
    }

    console.log(cardIsValid);
    return cardIsValid;
}

const zipValidator = () => {
    let zipValue = zipInput.value;
    let zipIsValid = /^\d{5}$/.test(parseInt(zipValue));

    if (zipIsValid){
        passedValidation(zipInput);
    }
    else {
        failedValidation(zipInput);
    }

    console.log(zipIsValid);
    return zipIsValid;
}
const cvvValidator = () => {
    let cvvValue = cvvInput.value;
    let cvvIsValid = /^\d{3}$/.test(parseInt(cvvValue));

    if (cvvIsValid){
        passedValidation(cvvInput);
    }
    else {
        failedValidation(cvvInput);
    }

    console.log(cvvIsValid)
    return cvvIsValid;
}

// if functions return false, it prevents the browser from reloading by e.preventDefault
form.addEventListener("submit", (e)=>{
    if (!nameValidator()){
        e.preventDefault();
    }
    if(!emailValidator()){
        e.preventDefault();
    }

    if (!activityValidator()){
        e.preventDefault();
    }

    // only when payment is credit card
    if(payment.value == 'credit-card'){
        if(!cardValidator()){
            e.preventDefault();
        }
        if (!zipValidator()){
            e.preventDefault();
        }
        if(!cvvValidator()){
            e.preventDefault();
        }
    }

});

//accessibility 
for (let i = 0; i < inputCheckbox.length ; i++){
    inputCheckbox[i].addEventListener('focus', (e) => {
        let checkbox = e.target;
        let parent = checkbox.parentElement;
        parent.classList.add('focus');
    })
    inputCheckbox[i].addEventListener('blur',(e)=> {
        let checkbox = e.target;
        let parent = checkbox.parentElement;
        parent.classList.remove("focus");
    })


}