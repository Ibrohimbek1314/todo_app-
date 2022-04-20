const backendApi = 'http://192.168.0.103:9595'


form.onsubmit = async (event) => {
    event.preventDefault()
    const username = document.querySelector("#email").value
    const password = document.querySelector("#psw-repeat").value
    const brithday = document.querySelector("#brithday").value
    const gender = document.querySelector("#gender").value

    let user = {
        username,
        password,
        gender,
        brithday
    }

    let response = await request('/registration', 'POST', user)
    let result = await response

    if (result.message == 'user is added') {
        window.localStorage.setItem('todoUserId', result.data.userId)
        return window.location.replace('/')
    } 
    
    alert(result.message)

    // let date = brithday.split('-')
    // const response  = await fetch(backendApi + '/users')
    // let users = await response.json()
    // let thisYear = new Date().getFullYear()
    // console.log(thisYear)
}