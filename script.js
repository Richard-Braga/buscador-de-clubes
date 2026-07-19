const inputTeam = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const teamCard = document.getElementById('teamCard');



async function searchTeam(teamName) {
    const apiUrl = `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${teamName.toLowerCase()}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            showError('Time não encontrado. Por favor, certifique-se de que o time inserido é válido.');
        }

        const teamData = await response.json();
        showTeamData(teamData.teams[0]);
    } catch (error) {
        showError('Erro ao buscar dados: ', error);
    }
}

function showTeamData(teamData) {    
    let teamColour = 'var(--secondary-color)';
    if (teamData.strColour1){
        teamColour = teamData.strColour1.startsWith('#') ? teamData.strColour1: `#${teamData.strColour1}`;
    }        

    teamCard.innerHTML = `
        <div class="teamCard">
            <div class="team-header">
                <div class="logo-container">
                    <img id="teamLogo" src="${teamData.strBadge}" alt="escudo do ${teamData.strTeam}">
                </div>
                <div class="title-container">
                    <h2>${teamData.strTeam}</h2>
                    <span class="badge" style="background-color: ${teamColour};">${teamData.strCountry}</span>
                </div>
            </div>

            <div class=team-info>
                <h3>Informações do Clube</h3>
                <ul class="info-list">
                    <li><ion-icon name="calendar-outline"></ion-icon><strong>Formação:</strong> ${teamData.intFormedYear}</li>
                    <li><ion-icon name="home-outline"></ion-icon><strong>Estádio:</strong> ${teamData.strStadium}</li> 
                    <li><ion-icon name="people-outline"></ion-icon><strong>Capacidade:</strong> ${teamData.intStadiumCapacity}</li>
                    <li><ion-icon name="pin-outline"></ion-icon><strong>Cidade:</strong> ${teamData.strLocation}</li>
                </ul>
                <details class="team-socials">
                    <summary>Ver as Redes Sociais do Time</summary>
                    <ul class="info-list">
                        <li>
                            <ion-icon name="logo-facebook"></ion-icon>
                            <strong>Facebook:</strong>
                            <a href="https://${teamData.strFacebook}" target="_blank">Acesse aqui</a>
                        </li>
                        <li>
                            <ion-icon name="logo-instagram"></ion-icon>
                            <strong>Instagram:</strong>
                            <a href="https://${teamData.strInstagram}" target="_blank">Acesse aqui</a>
                        </li>
                        <li>
                            <ion-icon name="logo-x"></ion-icon>
                            <strong>Twitter:</strong>
                            <a href="https://${teamData.strTwitter}" target="_blank">Acesse aqui</a>
                        </li>
                        <li>
                            <ion-icon name="globe"></ion-icon>
                            <strong>Website:</strong>
                            <a href="https://${teamData.strWebsite}" target="_blank">Acesse aqui</a>
                        </li>
                    </ul
            </div>
        </div>
    `;
}

function showError(message) {
    teamCard.innerHTML = `<p class="error-message">${message}</p>`;
}

searchButton.addEventListener('click', ()=> {
    const teamName = inputTeam.value.trim();

    if (teamName) {
        searchTeam(teamName); 
    } else {
        alert('Por favor, insira o nome do Time!');
    }
});

inputTeam.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});