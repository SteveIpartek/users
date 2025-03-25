document.addEventListener('DOMContentLoaded', () => {
    const capListaUser = document.getElementById("listaUsuarios");
    
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error(`¡Error HTTP! estado: ${response.status}`);
            }
            return response.json(); // Convertir respuesta en JSON
        })
        .then(users => {
            // Mapear los usuarios y añadir las nuevas propiedades
            const userCopy = users.map(user => {
                return {
                    ...user,  // Mantener todas las propiedades originales del usuario
                    age: Math.floor(Math.random() * 100) + 1,  // Añadir la edad aleatoria
                    img: user.id  // Usar el id del usuario como imagen
                };
            });
            
            // Recorremos el array de usuarios
            userCopy.forEach(user => {
                const { name, age, username, img, phone, email, company, address } = user;
                console.log({ name, age, username, img, phone, email, company, address });

                // Creamos un bloque HTML para mostrar cada usuario
                const userCard = document.createElement('div');
                userCard.id="cajadatos";
                userCard.innerHTML = `
                <div id=cajaficha>
                    <div id=cajaImg>
                        <li><img src="../assets/img/${img}.jpeg" alt="Imagen de ${name}" /></li>
                    </div>
                    <div id="flashCard">
                        <li><strong>Nombre:</strong>${name}</li>
                        <li><strong>Edad:</strong> ${age}</li>  
                        <li><strong>Username:</strong>${username}</li>
                        <li><strong>Teléfono:</strong> ${phone}</li>
                        <li><strong>Email:</strong> ${email}</li>
                    </div>
                    <div id=baja>
                    <li><strong>Empresa:</strong> ${company.name}</li>
                    <li><strong>Dirección:</strong> ${address.street}, ${address.suite}, ${address.city}</li>
                    </div>
                </div>
                    
                `;

                capListaUser.appendChild(userCard);
            });
        })
        .catch(error => {
            console.error('Error al obtener los usuarios:', error);
            capListaUser.innerHTML = `<p>Hubo un error al cargar los datos de los usuarios.</p>`;
        });
});

