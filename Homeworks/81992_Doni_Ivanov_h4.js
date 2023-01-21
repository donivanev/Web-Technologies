function validateFields(username, name, email, password, street, city, postalCode) {

    let errorBox = document.getElementById('messageBox')
    errorBox.innerHTML = ' '
    errorBox.style.backgroundColor = '#A30000'

    if (username.length == 0 || name.length == 0 || email.length == 0 || password.length == 0) {
        errorBox.innerHTML = 'Полетата, означени със звездичка, не може да бъдат празни!'
    }
    else if (username.length < 3 || username.length > 10) {
        errorBox.innerHTML = 'Потребителското име трябва да бъде между 3 и 10 символа.'
    }
    else if (name.length > 50) {
        errorBox.innerHTML = 'Името и фамилията трябва да бъдат максимум 50 символа.'
    }
    else if (password.length < 6 || password.length > 10 || password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/) == null) {
        errorBox.innerHTML = 'Паролата трябва да бъде между 6 и 10 символа и да включва главни и малки букви и цифри.'
    }
    else if (street.length > 50) {
        errorBox.innerHTML = 'Улицата трябва да бъде максимум 50 символа.'
    }
    else if (city.length > 50) {
        errorBox.innerHTML = 'Градът трябва да бъде максимум 50 символа.'
    }
    else if (postalCode.match(/\d+(-\d+)?/) == null) {
        errorBox.innerHTML = 'Пощенският код трябва да бъде във формат 11111-1111 (само цифри) или формат 1111(само цифри).'
    }

    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
            for (const key in data) {
                if(data[key].username == username) {
                    errorBox.innerHTML = 'Вече съществува такъв потребител.'
                    errorBox.style.backgroundColor = '#FF9800'
                }
            }
        })

    return errorBox.innerHTML
}

function handleRequest() {

    let formData = document.getElementById('register-form').elements
    let errorBox = document.getElementById('messageBox')
    let dataArray = []

    for(let i = 0; i < formData.length; i++) {
        dataArray[formData[i].id] = formData[i].value
    }

    if(validateFields(dataArray.username, dataArray.name, dataArray.email, dataArray.password,
                      dataArray.street, dataArray.city, dataArray.postalCode) == ' ') {
        errorBox.innerHTML = 'Успешна регистрация!'
        errorBox.style.backgroundColor = '#04AA6D'

        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: dataArray.name, 
                username: dataArray.username,
                email: dataArray.email,
                address: [dataArray.street, dataArray.city, dataArray.postalCode]
            })
        });
    }
}