const inputChecks = document.querySelectorAll("input");
document.addEventListener("input", (e) => {
    const target = e.target;
    if(target.type == 'checkbox' && target.checked){
       const container = target.parentNode.parentNode;
       if(container.getElementsByTagName("input").length >= 2){
        return
       }
       const inputNewPrice = createInput(target);
       appendNewInput(target,inputNewPrice)
       createAndAppendButton()
       removeInput(target)
    }
})
document.addEventListener("change",(e) => {
    const target = e.target;
    if(target.type == 'checkbox'){
       removeInput(target)
    }
})

const formLazyDays = document.querySelector("#formLazyDays");
formLazyDays.addEventListener('submit',(e) => {
   const inputLazyDay = document.querySelector("#not-work-in-that-day");
   if(inputLazyDay.value == ''){
        e.preventDefault()
        alert("Insira uma data")
   }
})


function createInput(target){
    const inputNewPrice = document.createElement('input');
    inputNewPrice.type = 'number';
    inputNewPrice.name = target.name.replace('check','newPrice')
    inputNewPrice.classList.add("w-4/5",'h-fit','p-px','outline-none','rounded','border','border-black')
    return inputNewPrice
}
function appendNewInput(target,inputNewPrice){
    const container = target.parentNode.parentNode;
    container.appendChild(inputNewPrice)
}

function createAndAppendButton(){
    const formOfPrices = document.querySelector("#formOfPrices");
    const allButtonsInForm = formOfPrices.getElementsByTagName("button").length 
    if(allButtonsInForm >= 1){
        return
    }
    const btn_Submit = document.createElement("button");
    btn_Submit.type = 'submit';
    btn_Submit.innerHTML = 'Atualizar preços <i class="bi bi-tag-fill"></i>';
    btn_Submit.classList.add('bg-slate-900','border','border-white','rounded','m-auto','w-fit','h-5','p-2','font-semibold','tracking-wider','text-white');
    btn_Submit.classList.add('hover:text-sky-400')
    btn_Submit.classList.add('duration-300')
    formOfPrices.appendChild(btn_Submit)
}

function removeInput(target){
    const container = target.parentNode.parentNode
    if(!target.checked){
        container.removeChild(container.lastElementChild)
    }
}