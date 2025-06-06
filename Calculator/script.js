class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
        this.clear()
    }
    clear(){
        this.currentOperand=''
        this.previousOperand=''
        this.operation=undefined
    }
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)
        //to delete from current num to second last num
    }
    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return
        //to check for existance of single decimal point
        this.currentOperand=this.currentOperand.toString()+number.toString()
        //to append the clicked number to existing number
    }
    /*this is used if the input number is not a single digit number*/
    chooseOperation(operation){
        if(this.currentOperand==='') return
        //if no operand then Display nothing
        if(this.previousOperand !==''){
            this.compute();
        }
        //if currentOperand has a value then call compute function
        this.operation = operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''
    }
    compute(){
        let computation
        //variable to store result
        const prev=parseFloat(this.previousOperand)
        const curr=parseFloat(this.currentOperand)
        if(isNaN(prev)||isNaN(curr)) return
        //so that code does not run if = is pressed with no given input
        //isNaN checks for not a number case and return true or false
        //if cannot refer a number it returns true else false
        //eg ''=0," "=0,true=1,false=0,123FA=cannot refer a number
        switch(this.operation){
            case '+':
                computation=prev+curr    
                break
            case '-':
                computation=prev-curr
                break
            case '×':
                computation=prev*curr
                break
            case '÷':
                computation=prev/curr
                break
            default:
                return    
        }
        this.currentOperand=computation
        this.operation=undefined
        this.previousOperand=''
    }
    getDisplayNumber(number){
        //to delimit the numbers with ','
        const stringNum=number.toString()
        const int=parseFloat(stringNum.split('.')[0])
        //parsefloat will split and create array with values before decimal at [0] and after decimal at[1]
        //to get values before the decimal
        const dec=stringNum.split('.')[1]
        let intDisplay
        if(isNaN(int)){
            intDisplay=''
        }
        else{
            intDisplay=int.toLocaleString('en',{maximumFractionDigits:0})
            //toLocaleString returns the language sensitive representation of the given input
            //here it is in english(en)
            //
        }
        if(dec!=null){
            return `${intDisplay}.${dec}`
        }
        else{
            return intDisplay
        }
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText=this.getDisplayNumber(this.currentOperand)
        if(this.operation!=null){
            this.previousOperandTextElement.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            //to display operator and operand in the prev-operand space
        }
        else{
            this.previousOperandTextElement.innerText=''
            //to clear the prev-operand if operation is completed
        }
    }
}
/*this constructor is used to conduct all the operations of the calculator by referencing the operand*/
const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const allclearButton=document.querySelector('[data-allclear]')
const deleteButton=document.querySelector('[data-delete]')
const equalsButton=document.querySelector('[data-equals]')
const previousOperandTextElement=document.querySelector('[data-prev-operand]')
const currentOperandTextElement=document.querySelector('[data-curr-operand]')

const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement)
//create object called calculator
 
numberButtons.forEach(button => {
    //selecting all the number buttons
    button.addEventListener('click',()=>{
        //reading the value if clicked usin eventlistener
        calculator.appendNumber(button.innerText)
        //appendin the number present in the button if pressed usin appendNumber fn
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    //selecting all the number buttons
    button.addEventListener('click',()=>{
        //reading the value if clicked using eventlistener
        calculator.chooseOperation(button.innerText)
        //appendin the number present in the button if pressed usin appendNumber fn
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})

allclearButton.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})