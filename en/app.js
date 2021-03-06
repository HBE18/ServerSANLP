const resultPage = document.querySelector("#result-page");
const register = document.querySelector("#reg-but");
const login = document.querySelector("#log-but");
const ul = document.querySelector(".ourDiv");
var isAuth;


const func = async () => {
    fetch("http://25.33.228.221:3000/auth",{
        method: "GET",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }).then(res => {
        return res.json();
    }).then(res=>{
        isAuth =  res.auth;
        if(isAuth)
        {
            let ourUl = document.querySelector("#nav-ul");
            let pricing = document.querySelector("#pricing");
            ourUl.removeChild(pricing);
            resultPage.style.visibility = "visible";
            ul.removeChild(login);
            register.setAttribute("href", "index.html");
            register.setAttribute("onClick","clk()");
            register.innerHTML = "Logout";
        }
    })
}

func();

async function clk() {
    if(isAuth){
        try {
            event.preventDefault();
            fetch('http://25.33.228.221:3000/logout', {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Access-Control-Allow-Origin" : "*"
                }
            }).then(response => {
                if(response.status === 200)
                {
                    return response.json();
                }
                else{
                    console.error("Alert Alert alert " + response.status);
                }
            }).then((res) => {
                isAuth = res.auth;
                window.location.reload();
            })
        } catch (error) {
            console.error(error);
        }
    }
}

