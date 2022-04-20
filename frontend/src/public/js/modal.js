// let myModal = document.getElementById('myModal')
// let myInput = document.getElementById('myInput')

// const { text } = require("express");

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })
tempId = JSON.parse(localStorage.getItem("tempId"))
todoUserId = JSON.parse(localStorage.getItem("todoUserId"))
let id = JSON.parse(localStorage.getItem("tempId"));
async function getData() {
  let data = await fetch("http://localhost:9595/todos/" + id);
  data = await data.json();
  todo.innerHTML = null
  doing.innerHTML = null
  done.innerHTML = null
  let users = await fetch("http://localhost:9595/users")
  users = await users.json()
  ID = data[0].userId
  ankir.addEventListener('click', () => {
    localStorage.setItem("todoUserId", '')
  })
  for(let i of users) {
    if(i.userId == ID) {
      h1.innerText = i.username
    }
  }
  for(let i of data) {
    let li = document.createElement('li')
    li.className = 'li'
    let span = document.createElement('span')
    span.className = 'title'
    let h3 = document.createElement('h3')
    span.append(h3)
    h3.innerText = i.title
    let textarea = document.createElement('textarea')
    textarea.className = 'texts'
    textarea.value = i.text
    li.id = i.todoId
    li.append(span, textarea)
    let select = document.createElement('select')
    let option1 = document.createElement('option')
    option1.value = 'todo'
    option1.innerText = 'Todo'
    let option2 = document.createElement('option')
    option2.value = 'doing'
    option2.innerText = 'Doing'
    let option3 = document.createElement('option')
    option3.value = 'done'
    option3.innerText = 'Done'
    if(i.status == 'todo'){
      option1.setAttribute('selected', 'selected')
    } else if(i.status == 'doing') {
      option2.setAttribute('selected', 'selected')
    } else if(i.status == 'done') {
      option3.setAttribute('selected', 'selected')
    }
    select.append(option1, option2, option3)
    select.addEventListener('click', async() => {
      let response = await fetch("http://localhost:9595/todos/" + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          'status' : select.value,
          'todoId' : li.id,
          "title": h3.innerText,
          "text": textarea.value
        })
      })
      response = await response.json();
      getData()
    })
    if(tempId == todoUserId) {
      if(i.status == 'todo'){
        todo.append(li, select)
      } else if(i.status == 'doing') {
        doing.append(li, select)
      } else if(i.status == 'done') {
        done.append(li, select)
      }
    } else {
      if(i.status == 'todo'){
        todo.append(li)
      } else if(i.status == 'doing') {
        doing.append(li)
      } else if(i.status == 'done') {
        done.append(li)
      }
    }

    
    
  }
}

save.addEventListener('click', async () => {
  try{
    if(input.value.length>0 && textarea17.value.length>0) {
      let response = await fetch("http://localhost:9595/todos/" + id, {
        method:'POST',
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({
          "title": input.value,
          "text": textarea17.value
        })
      })
      response = await response.json()
      console.log(response);
    } else {
      return alert('Input title and text!')
    }
  } catch(err) {
    getData()
  }
  getData()
})

getData();