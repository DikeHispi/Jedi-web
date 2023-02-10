const loginContainer = document.getElementById("login-container");
const API_URL = "http://localhost:3000/users";
const Redireccio_URL = "./home.html";

const form = document.createElement("form");
form.id = "login-form";

const h2 = document.createElement("h2");
h2.textContent = "Inicio de Sesión";
form.appendChild(h2);

const usernameGroup = document.createElement("div");
usernameGroup.className = "form-group";

const usernameLabel = document.createElement("label");
usernameLabel.htmlFor = "username";
usernameLabel.textContent = "Usuario:";
usernameGroup.appendChild(usernameLabel);

const usernameInput = document.createElement("input");
usernameInput.type = "text";
usernameInput.id = "username";
usernameInput.name = "username";
usernameGroup.appendChild(usernameInput);

form.appendChild(usernameGroup);

const passwordGroup = document.createElement("div");
passwordGroup.className = "form-group";

const passwordLabel = document.createElement("label");
passwordLabel.htmlFor = "password";
passwordLabel.textContent = "Contraseña:";
passwordGroup.appendChild(passwordLabel);

const passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.id = "password";
passwordInput.name = "password";
passwordGroup.appendChild(passwordInput);

form.appendChild(passwordGroup);

const submitInput = document.createElement("input");
submitInput.type = "submit";
submitInput.value = "Iniciar Sesión";
form.appendChild(submitInput);

const registerButton = document.createElement("button");
registerButton.textContent = "Registrarse";
form.appendChild(registerButton);

const errorMessage = document.createElement("div");
errorMessage.id = "error-message";
errorMessage.textContent = "Usuario o contraseña incorrectos.";
form.appendChild(errorMessage);

loginContainer.appendChild(form);


form.addEventListener("submit", event => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    axios
      .get(API_URL)
      .then(response => {
        const users = response.data;
        const userExists = users.some(user => {
          return user.username === username && user.password === password;
        });
        if (userExists) {
          alert(`Bienvenido ${username}`);
          window.location.href = Redireccio_URL;
        } else {
          document.getElementById("error-message").style.display = "block";
        }
      });
  });

function createUUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

registerButton.addEventListener("click", event => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const id = createUUID();
    axios
      .get(API_URL)
      .then(response => {
        const existingUser = response.data.find(user => {
          return user.username === username;
        });
        if (existingUser) {
          document.getElementById("error-message").textContent = "Este usuario ya existe.";
          document.getElementById("error-message").style.display = "block";
        } else if (!username || !password) {
          document.getElementById("error-message").textContent = "No introducir campos vacíos";
          document.getElementById("error-message").style.display = "block";
        } else {
          axios
            .post(API_URL, {
              id,
              username,
              password
            })
            .then(response => {
              console.log(response);
              if (response.data) {
                window.location.href = Redireccio_URL;
              } else {
                document.getElementById("error-message").textContent = "Ocurrió un error al registrarse.";
                document.getElementById("error-message").style.display = "block";
              }
            });
        }
      });
});
