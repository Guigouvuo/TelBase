const numInput = document.getElementById("numInput");
const description = document.getElementById("description");
const login = document.getElementById("login");

const loginStatus = () => {
    if (window.sessionStorage.getItem('token')) {
        login.innerHTML = `Connecté en tant que ${window.sessionStorage.getItem('displayName') || 'Utilisateur'}  | <a id="logoutLink" href="#" onclick="logout()">Déconnexion</a>`;
    } else if (window.localStorage.getItem('savedCredentials')) {
        window.location.href = "login.html";
    } else {
        login.innerHTML = "<a href='login.html'>Se connecter</a>";
    }
}

const updateDescription = () => description.innerHTML = `Obtient le nom associé au numéro ${numInput.value}`;
const getNum = () => {
    if (numInput.value && window.sessionStorage.getItem('token')) {
        fetch(`https://telbase9f74e-default-rtdb.europe-west1.firebasedatabase.app/${numInput.value}.json?auth=${window.sessionStorage.getItem('token') || ''}`)
            .then(response => {
                if (!response.ok) throw new Error('Erreur réseau');
                    return response.json();
                })
            .then(data => {
                if (data) {
                    window.alert(`Numéro : ${numInput.value || 'Non indiqué'}
Nom associé : ${data.Nom || 'Non trouvé'}`);
                } else {
                    window.alert('Aucun résultat trouvé pour ce numéro');
                }
                })
            .catch(error => {
                console.error('Erreur:', error);
                window.alert('Erreur lors de la récupération des données');
            });
    } else if (numInput.value) {
        window.alert('Vous devez être connecté pour effectuer cette action');
    } else{
        window.alert('Veuillez saisir un numéro');
    }
};

numInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getNum();
    }
});

const logout = () => {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('loginDataJSON');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('password');
    window.localStorage.removeItem('savedCredentials');
    loginStatus();
    window.alert('Déconnexion réussie');
};

loginStatus();