const form = document.getElementsByTagName("form")[0]
const button = document.getElementsByTagName("button")[0]
const resultsMonthly = document.getElementById("monthlyRepayment")
const totalResults = document.getElementById("totalRepayment")
const radioButtons = [...document.getElementsByClassName("radioContainer")]
const radioInputs = [...document.getElementsByClassName("radioButton")]
const radioLabel = [...document.getElementsByClassName("radioLabel")]

const results = document.getElementsByClassName("results")[0]
const sucessState = [...document.getElementsByClassName("uncompletedResults")]
const failState = [...document.getElementsByClassName("uncomplete")]

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


let mortgageType = "none"
let numberSucess = false
let typeSucess = false

button.addEventListener("click",()=>{
    for(let i=0; i<3; i++){
        if(form[i].value.trim() === ""){
            console.log("hey >:(")
            numberSucess = false
        }else{
            numberSucess = true
            console.log("bien")
        }
    }
    for(let i=0; i<radioInputs.length; i++){
        if (radioInputs[i].checked){
            typeSucess = true
            mortgageType = radioLabel[i].innerHTML
        }
    }
    switch(mortgageType){
        case "Repayment":
            resultsMonthly.innerHTML = `€${calculateRepayment(amount, term, interest).toFixed(2)}`
            console.log("Hola")
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