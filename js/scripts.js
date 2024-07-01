const form = document.getElementsByTagName("form")[0]

const resultsMonthly = document.getElementById("monthlyRepayment")
const totalResults = document.getElementById("totalRepayment")

const numberInputContainer = [...document.getElementsByClassName("numberInputContainer")]
const numberInput = [...document.getElementsByClassName("numberInput")]

const radioButtons = [...document.getElementsByClassName("radioContainer")]
const radioInputs = [...document.getElementsByClassName("radioButton")]
const radioLabel = [...document.getElementsByClassName("radioLabel")]
const radioContainers = document.getElementsByClassName("Mortgage")[0] 

const button = document.getElementsByTagName("button")[0]

const results = document.getElementsByClassName("results")[0]
const sucessState = [...document.getElementsByClassName("uncompletedResults")]
const failState = [...document.getElementsByClassName("uncomplete")]

const textRequired = [...document.getElementsByClassName("textRequired")]
const containerRequiredState = document.getElementsByClassName("container")[0]
const InputRequiredState = [...document.getElementsByClassName("numberInputContainer")]


let amount = form[0].value
let term = form[1].value
let interest = form[2].value


function calculateRepayment(amount, term, interest){
    return amount*(((interest/12/100)*(1+(interest/12/100))**(term*12))/(((1+(interest/12/100))**(term*12))-1))
}
function calculateInterest(amount, interest){
    return amount * (interest/100)
}
function totalMortgage(term){
    return calculateRepayment(amount, term, interest) * (term*12)
}
function totalInterest(term){
    return calculateInterest(amount, term, interest)*(term*12)
}

for(let i=0; i<3; i++){
    form[i].addEventListener("input", ()=>{
        amount = form[0].value
        term = form[1].value
        interest = form[2].value
    })
}

for (let i=0; i<numberInputContainer.length; i++){
    numberInput[i].addEventListener("focus", ()=>{
        numberInputContainer[i].classList.add("focused")
    })
    numberInput[i].addEventListener("blur", ()=>{
        numberInputContainer[i].classList.remove("focused")
    })
}

for (let i=0; i<radioInputs.length; i++){
    radioInputs[i].addEventListener("focus", ()=>{
        radioLabel[i].classList.add("radioFocused")
    })
    radioInputs[i].addEventListener("blur", ()=>{
        radioLabel[i].classList.remove("radioFocused")
    })
}

let mortgageType = "none"
let numberSucess = false
let typeSucess = false

button.addEventListener("click",()=>{
    for(let i=0; i<3; i++){
        if(form[i].value.trim() === ""){
            numberSucess = false
            containerRequiredState.classList.add("containerRequired")
            textRequired[i].classList.remove("filled")
            InputRequiredState[i].classList.add("required")
        }else{
            numberSucess = true
            containerRequiredState.classList.remove("containerRequired")
            textRequired[i].classList.add("filled")
            InputRequiredState[i].classList.remove("required")
        }
    }
    for(let i=0; i<radioInputs.length; i++){
        if (radioInputs[i].checked){
            typeSucess = true
            mortgageType = radioLabel[i].innerHTML
        }else{
        }
    }
    if (typeSucess){
        textRequired[3].classList.add("filled")
    }else{
        textRequired[3].classList.remove("filled")
    }
    switch(mortgageType){
        case "Repayment":
            resultsMonthly.innerHTML = `€${calculateRepayment(amount, term, interest).toFixed(2)}`
            totalResults.innerHTML = `€${totalMortgage(term).toFixed(2)}`
        break
        case "Interest Only":
            resultsMonthly.innerHTML = `€${calculateInterest(amount, interest)}`
            totalResults.innerHTML = `€${totalInterest(term)}`
        break
        default:
            console.log("oye >:(")
    }
    if (mortgageType !== "none" && numberSucess && typeSucess){
        if(results.classList.contains("uncompleteSection")){
            results.classList.remove("uncompleteSection")
            results.classList.add("completeSection")
        }
    }
})