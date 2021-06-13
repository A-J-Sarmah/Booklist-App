// a new book
class book{
    constructor(name,author,isbn){
        this.name = name
        this.author = author
        this.isbn = isbn
    }
}


// reteieving data
class data{
    static retrieve(){
        let arr = []
        if(localStorage.length === 0){
            arr = []
        }
        else{
            for(let i=0; i<localStorage.length; i++){
                const store = localStorage.getItem(i)
                arr.push(JSON.parse(store))
            }
        }
        return arr
    }
    static addBook(){
        let name = document.getElementById('name').value
        let author = document.getElementById('author').value
        let isbn = document.getElementById('ISBN').value
        const Book = new book(name,author,isbn)
        const array = data.retrieve()
        array.push(Book)
        for(let i=0; i<array.length; i++){
            localStorage.setItem(i,JSON.stringify(array[i]))
        }
        document.getElementById('name').value = ""
        document.getElementById('author').value = ""
        document.getElementById('ISBN').value = ""
        UI.displayBook()
    }
}

// Handling UI events
class UI{
    static displayBook(){
        const array = data.retrieve()
        const display = document.querySelector('.display-card')
        for(let i=0; i<array.length; i++){
            const name = array[i].name
            const author = array[i].author
            const isbn = array[i].isbn
            if(i>=display.childElementCount){
                if(name != "" && author != "" && isbn != ""){
                    display.innerHTML += `<div id = "card${i}" class="card">
                    <h3 class="card-details">${name}</h3>
                    <h3 class="card-details">${author}</h3>
                    <h3 class="card-details">${isbn}</h3>
                    <button class="card-details del-btn" id="${i}" onclick="UI.deleteBook(this.id)">Delete</button>
                    </div>`
                }
                else{
                    localStorage.removeItem(i)
                }
            }
        }
    }
    static showAlert(status){
        const message = document.querySelector('.message')
        if(status === true){
            message.innerHTML += `<div class="prompt" id="prompt-success"><h3>Booklist updated Successfully</h3></div>`
            const element = document.getElementById('prompt-success')
            setTimeout(()=>{message.removeChild(element)},3000)
        }
        else{
            message.innerHTML += `<div class="prompt" id="prompt-danger"><h3>Booklist updated Failed</h3></div>`
            const element = document.getElementById('prompt-danger')
            setTimeout(()=>{message.removeChild(element)},3000)
        }
    }
    static deleteBook(id){
        const display = document.querySelector(`#card${id}`)
        const array = data.retrieve()
        array.splice(id,1) 
        localStorage.clear()
        for(let i=0; i<array.length; i++){
            localStorage.setItem(i,JSON.stringify(array[i]))
        }
        display.parentElement.removeChild(display)
    }
}


// Validation
const submit = document.querySelector('.submit-btn')
submit.addEventListener('click',()=>{
    const array = data.retrieve()
    data.addBook()
    if(localStorage.length>array.length){
        UI.showAlert(true)
    }
    else{
        UI.showAlert(false)
    }
})

document.addEventListener('DOMContentLoaded',UI.displayBook)