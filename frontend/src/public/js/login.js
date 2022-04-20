const backendApi = 'http://192.168.0.103:9595'
let userId = window.localStorage.getItem('todoUserId')
userId ? window.location.replace('/') : null

form.onsubmit = async (event) => {
    event.preventDefault()
    const username = document.querySelector("#username").value
    const password = document.querySelector("#psw-repeat").value

    
    if (!(username.length >= 8)) return alert('The username must be 8 length!')
    if ((/[A-Z]/).test(username)) return alert('The username dont must include uppercase letters!')
    if (username.includes(' ')) return alert('The username dont must include space letters!')
    if (!(password.length >= 8)) return alert('The password must be 8 length!')
    if (!(/[A-Z]/).test(password)) return alert('The password must include uppercase letters!')
    if (!(/[a-z]/).test(password)) return alert('The password must include lowercase letters!')
    if (!(/[0-9]/).test(password)) return alert('The password must include numbers!')
    if (!(/[!@#$%&()><?]/).test(password)) return alert('The password must include special characters!')
    
    let data = await fetch('http://localhost:9595/users',)
    data = await data.json()

    if(data){
        k = 0 
        for(let i of data) {
        if(i.username == username) {
            if(i.password == password){
                window.location.replace('/')
            } else {
                return alert('Correct password!')
            }
            k += 1
        }
        if(!k) {
            return alert('Username not found!')
        }
        }
    }
    

}