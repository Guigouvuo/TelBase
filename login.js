const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("loginButton");
const stayLoggedIn = document.getElementById("stayLoggedIn");

const loginAction = () => {
    const loginData = fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBP1_PQHZhjF4WAWshXjYro8NaaDFYWd4Q", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": emailInput.value,
            "password": passwordInput.value,
            "returnSecureToken": true
        })
    }).then(response => {
        if (!response.ok) throw new Error('Erreur lors de la connexion');
        return response.json();
    }).then(data => {
        window.sessionStorage.setItem('loginDataJSON', data);
        window.sessionStorage.setItem('token', data.idToken);
        if (stayLoggedIn.checked) {
            window.localStorage.setItem('email', emailInput.value);
            window.localStorage.setItem('password', passwordInput.value);
            window.localStorage.setItem('savedCredentials', true);
        }
        window.alert('Connexion réussie');
        window.location.href = "index.html";
    }).catch(error => {
        console.error('Erreur:', error);
        window.alert('Erreur lors de la connexion');
    });
};

const autoLogin = () => {
    if (window.localStorage.getItem('savedCredentials')) {
        emailInput.value = window.localStorage.getItem('email');
        passwordInput.value = window.localStorage.getItem('password');
        loginAction();
    }
};

passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        loginAction();
    }
});

autoLogin();