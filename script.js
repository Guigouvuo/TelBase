const numInput = document.getElementById("numInput");
const description = document.getElementById("description");

const updateDescription = () => description.innerHTML = `Obtient le nom associé au numéro ${numInput.value}`;
const getNum = () => {
    if (numInput.value) {
        fetch(`https://telbase9f74e-default-rtdb.europe-west1.firebasedatabase.app/${numInput.value}.json`)
            .then(response => {
                if (!response.ok) throw new Error('Erreur réseau');
                    return response.json();
                })
            .then(data => {
                if (data) {
                    window.alert(`Nom associé : ${data.Nom || 'Non trouvé'}`);
                } else {
                    window.alert('Aucun résultat trouvé pour ce numéro');
                }
                })
            .catch(error => {
                console.error('Erreur:', error);
                window.alert('Erreur lors de la récupération des données');
            });
    } else {
        window.alert('Veuillez saisir un numéro');
    }
};
