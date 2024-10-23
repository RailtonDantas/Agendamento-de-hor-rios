const btnRegister = document.querySelector("#btn-register");
document.addEventListener('load',() => {
    const inputs = [...document.querySelectorAll('input')]
    inputs.forEach((e) => {
        e.value = ''
        e.checked = false
    })
})
document.addEventListener('click', (evt) => {
    const target = evt.target;
    if(target.classList.contains('availableTime')){
       const chosenTime = target.textContent;
       const inputScheduleHour = document.querySelector("#inputScheduleHour");
       if(chosenTime.split(' ')[0] == 'Acabaram')return
       if(chosenTime.split(' ')[0] == 'Aos') return
       inputScheduleHour.value = chosenTime;
    }
})
document.addEventListener("input", (evt) => {
    const target = evt.target;
    if(target.type == 'checkbox' && target.checked){
        const container = target.parentNode;
        const typeOfService = container.textContent.trim().replace(":",'');
        target.value = typeOfService;
    }else if(target.type == 'checkbox'){
        target.removeAttribute("value")
    }
})
btnRegister.addEventListener('click',(e) => {
    const inputsCheck = [...document.querySelectorAll('input[type=checkbox]')]
    const inputs = [...document.querySelectorAll('input[type=text]')]
    const isChecked = inputsCheck.filter((e) => e.checked)
    if(isChecked.length == 0){
        e.preventDefault()
        alert("Você precisa selecionar ao menos 1 serviço")
        return
    }
    if(!/[0-9][0-9]9[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.test(inputs[1].value)){
        e.preventDefault()
        alert("Whatsapp inválido")
        return
    }
    if(!validData(inputs,e)){
        return
    }
    const form = document.querySelector("#form-register")
    form.submit()

})
const inputDate = document.querySelector('#inputDate');
inputDate.addEventListener('input', () => {
    const allTimetables = document.querySelectorAll(".availableTime");
 
    const inputScheduleDate = document.querySelector("#inputScheduleDate");
    inputScheduleDate.value = prepareDate(inputDate.value);

    const dateForm = document.querySelector("#formDate");
    dateForm.submit()
})
document.addEventListener('DOMContentLoaded',() => {
    const allTimetables = document.querySelectorAll(".availableTime");
    allTimetables.forEach((currentInput) => {
        if(currentInput.textContent.startsWith("Aos")){
           currentInput.classList.replace("h-6",'h-fit');
           currentInput.classList.add("bg-sky-500","text-white");
           currentInput.classList.remove("hover:bg-black",'hover:text-white');
        }
    })
})
function prepareDate(data){
    const dataSplit = data.split("-");
    const dateFormat = `${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}`
    return dateFormat
}
function clearInputs(checkbox,inputText){
    checkbox.forEach((input) => {
        input.checked = false
     })
    inputText.forEach((input) => {
        input.removeAttribute('value')
    })
}
function validData(inputs,evt){
    for(let index  = 0; index < inputs.length; index++){
        if(inputs[index].value.trim() == ''){
            evt.preventDefault()
            alert('Preencha os dados de forma correta!')
            return false
        }
    }
    return true
}