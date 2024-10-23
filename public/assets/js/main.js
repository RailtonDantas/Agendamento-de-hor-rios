const btnContact = document.querySelector('#btnContacts');
btnContact.addEventListener("click", () => {
    const listContacts = document.querySelector("ul");
    if(listContacts.classList.contains('hidden')){
        listContacts.classList.replace('hidden','block')
        return
    }
    listContacts.classList.replace('block','hidden')
})