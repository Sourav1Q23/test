const loginForm = document.querySelector('.form--login')
const signForm = document.querySelector('.form--signup')
const logOutBtn = document.querySelector('.nav__el--logout')
const userDataForm = document.querySelector('.form-user-data')
const userPasswordForm = document.querySelector('.form-user-password')

const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};
  
  // type is 'success' or 'error'
const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
};

const login= async (email, password) =>{

    const result = await fetch('http://127.0.0.1:3000/api/v1/users/login',{
        method: 'POST',  // *GET, POST, PUT, DELETE, etc.
        mode: 'same-origin',                    
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({email,password})
    })
    const res= await result.json()

    if (res.status==='success'){
        showAlert("success", "Logged in successfully")
        window.setTimeout(()=>{
            location.assign('/'),
            1500
        })
    }
    if (res.status==='fail'){
        showAlert('error', `${res.message}`)
    }
}

const signup= async (name, email, password, passwordConfirm ) =>{

    const result = await fetch('http://127.0.0.1:3000/api/v1/users/signup',{
        method: 'POST',  // *GET, POST, PUT, DELETE, etc.
        mode: 'same-origin',                    
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({name, email, password, passwordConfirm})
    })
    const res= await result.json()

    if (res.status==='success'){
        showAlert("success", "Congratulations")
        window.setTimeout(()=>{
            location.assign('/'),
            1500
        })
    }
    if (res.status==='fail'){
        showAlert('error', `${res.message}`)
    }
}

const logout = async () => {
    const result = await fetch('http://127.0.0.1:3000/api/v1/users/logout',{
        method: 'GET',  // *GET, POST, PUT, DELETE, etc.
        mode: 'same-origin',                    

    })
    const res= await result.json()

    if (res.status==='success'){
        window.location.assign('/');
    }
    if (res.status==='fail'){
        showAlert('error', `${res.message}`)
    } 
};
const updateSettings = async (data, type) => {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updatePassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    console.log(url)
    const result = await fetch(url,{
        method: 'PATCH',  // *GET, POST, PUT, DELETE, etc.
        mode: 'same-origin',                    
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(data)
    })
    console.log(result)
    const res= await result.json()
    console.log(res)

    if (res.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
    if (res.status === 'fail') {
        showAlert('error', `${type.toUpperCase()} failed to update!`);
      } 
}

if (loginForm){
    loginForm.addEventListener('submit', e =>{
        e.preventDefault()
        const email  = document.getElementById('email').value
        const password = document.getElementById('password').value
        login(email,password)
    })
}


if (logOutBtn){
    logOutBtn.addEventListener('click', logout)
}

if(userDataForm){
    userDataForm.addEventListener('submit',  e=>{
        e.preventDefault()
        const email  = document.getElementById('email').value
        const name  = document.getElementById('name').value

        updateSettings({name,email},'data' )
    })
}

if(userPasswordForm){
    userPasswordForm.addEventListener('submit', async e=>{
        e.preventDefault()
        document.querySelector('.btn--save-password').textContent='Updating...';
        const passwordCurrent = document.getElementById('password-current').value
        const password = document.getElementById('password').value
        const passwordConfirm = document.getElementById('password-confirm').value

        await updateSettings({passwordCurrent, password, passwordConfirm}, 'password')
        document.querySelector('.btn--save-password').textContent='Save Password';
        document.getElementById('password-current').value='';
        document.getElementById('password').value='';
        document.getElementById('password-confirm').value='';
    })
}

if (signForm){
    signForm.addEventListener('submit', e =>{
        e.preventDefault()
        const name  = document.getElementById('name').value
        const email  = document.getElementById('email').value
        const password = document.getElementById('password').value
        const passwordConfirm = document.getElementById('password-confirm').value

        signup(name, email, password, passwordConfirm)
    })
}
