// Función para hacer scroll
function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

// Función para extraer seguidores con "Te sigue"
function getMutualFollowers() {
    const mutuals = [...document.querySelectorAll('[data-testid="UserCell"]')]
        .filter(user => user.textContent.includes("Te sigue"))
        .map(user => {
            // Intentar obtener el nombre de usuario (@) de la etiqueta "a" con el atributo "href" que contiene "/"
            const usernameElement = user.querySelector('a[href^="/"][role="link"]');
            const username = usernameElement ? usernameElement.getAttribute('href').split('/')[1] : "Desconocido";

            // Intentar obtener el nombre completo visible
            const nameElement = user.querySelector('div[dir="auto"] > span');
            const name = nameElement ? nameElement.textContent.trim() : "Desconocido";
            
            return `${name} - @${username}`;
        });
    return mutuals;
}

// Función principal que ejecuta el scroll y captura seguidores
async function captureMutualFollowers() {
    let followersList = [];
    let prevLength = 0;

    while (true) {
        // Obtener seguidores actuales
        const currentFollowers = getMutualFollowers();
        followersList = [...new Set([...followersList, ...currentFollowers])];

        // Si no se añadieron nuevos seguidores, se ha cargado toda la lista
        if (followersList.length === prevLength) break;
        prevLength = followersList.length;

        // Hacer scroll y esperar un tiempo para que carguen más
        scrollToBottom();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar 2 segundos antes de continuar
    }

    console.log("Seguimiento mutuo:", followersList);
}

// Ejecutar la función para capturar los seguidores
captureMutualFollowers();
