const resultPage = document.querySelector("#result-page");
const register = document.querySelector("#reg-but");
const login = document.querySelector("#log-but");
const ul = document.querySelector(".ourDiv");

var isAuth = true;

//TODO: User Authentication

if (isAuth) {
    resultPage.style.visibility = "visible";
    ul.removeChild(login);
    register.setAttribute("href", "index.html");
    register.innerHTML = "Logout";
}

async function clk() {
    if(isAuth){
        try {
            const res = await fetch('http://25.33.228.221:3000/logout', { method: 'POST' });
            console.log(res);
        } catch (error) {
            console.error(error);
        }
        isAuth = false
    }
}
