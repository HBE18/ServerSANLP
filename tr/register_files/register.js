const user_email = document.querySelector("#exampleInputEmail1");
const user_password = document.querySelector("#exampleInputPassword1");
const confirm = document.querySelector("#exampleInputPassword2");


addEventListener("submit", async (ev) => {
    ev.preventDefault();

    if (user_password.value === confirm.value) {
        await fetch(`http://25.33.228.221:3000/register?email=${user_email.value}&password=${user_password.value}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then(res => {
            if (res.status === 200) {
                window.location.replace("/login.html");
            }
            else if (res.status === 400) {
                if (res.error) {
                    console.error(res.error);
                }
                else {
                    answer = window.confirm("That user exists. Do you want to login?");
                    if (answer) {
                        window.location.replace("/login.html");
                    }
                }

            }
            else if (res.status === 500)
            {
                console.error(res.error);
            }
        })
    }
    else {
        alert("Passwords are different");
    }
})