const user_email = document.querySelector("#exampleInputEmail1");
const user_password = document.querySelector("#exampleInputPassword1");

addEventListener("submit", async (ev) => {
    ev.preventDefault();
    await fetch(`http://25.33.228.221:3000/login?email=${user_email.value}&password=${user_password.value}`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }).then(res => {
        if (res.status === 200) {
            window.location.replace("/index.html");
        }
    })
})