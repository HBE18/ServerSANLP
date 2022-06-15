const user_email = document.querySelector("#exampleInputEmail1");
const user_password = document.querySelector("#exampleInputPassword1");
const confirm = document.querySelector("#exampleInputPassword2");
const body = document.body;

// addEventListener("submit", async (ev) => {
//   ev.preventDefault();

//   if (user_password.value === confirm.value) {
//     await fetch(
//       `http://25.33.228.221:3000/register?email=${user_email.value}&password=${user_password.value}`,
//       {
//         method: "POST",
//         mode: "cors",
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//         },
//       }
//     ).then((res) => {
//       if (res.status === 200) {
//         window.location.replace("/login.html");
//       } else if (res.status === 400) {
//         if (res.error) {
//           console.error(res.error);
//         } else {
//           answer = window.confirm("That user exists. Do you want to login?");
//           if (answer) {
//             window.location.replace("/login.html");
//           }
//         }
//       } else if (res.status === 500) {
//         console.error(res.error);
//       }
//     });
//   } else {
//     alert("Passwords are different");
//   }
// });

function firstComp() {
  const disDiv = document.createElement("div");
  const icDiv = document.createElement("div");
  disDiv.id = "Second";
  disDiv.style = "margin-left: 25%; margin-top: 10%;";
  const formElement = document.createElement("form");
  icDiv.className = "row row-cols-1 row-cols-md-3 mb-3 text-center";
  icDiv.innerHTML =
    '<div class="form-check form-check-inline">' +
    '<div class="col"><div class="card mb-4 rounded-3 shadow-sm"><div class="card-header py-3"><h4 class="my-0 fw-normal">Basic</h4></div><div class="card-body"><h1 class="card-title pricing-card-title">$5<small class="text-muted fw-light">/mo</small></h1><ul class="list-unstyled mt-3 mb-4"><li>1 keyword</li><li>Email support</li><li><input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" style="margin-left:48%; margin-top:5%;" checked></li></ul></div></div></div>' +
    "</div>" +
    '<div class="form-check form-check-inline">' +
    '<div class="col"><div class="card mb-4 rounded-3 shadow-sm"><div class="card-header py-3"><h4 class="my-0 fw-normal">Pro</h4></div><div class="card-body"><h1 class="card-title pricing-card-title">$15<small class="text-muted fw-light">/mo</small></h1><ul class="list-unstyled mt-3 mb-4"><li>5 keywords</li><li>Priority email support</li><li><input class="form-check-input" type="radio" name="inlineRadioOptions" style="margin-left:48%; margin-top:5%;" id="inlineRadio1" value="option2"></li></ul></div></div></div>' +
    "</div>";

  const button = document.createElement("button");
  button.type = "submit";
  button.style = "margin-top: 1%; margin-left: 24%; width: 240px; height: 40px;";
  button.className = "btn btn-primary";
  button.textContent = "Next";
  formElement.appendChild(icDiv);
  formElement.appendChild(button);
  disDiv.appendChild(formElement);
  const first = document.querySelector("#First");
  const footer = document.getElementsByTagName("footer")[0];
  body.removeChild(first);
  body.removeChild(footer);
  body.appendChild(disDiv);
  body.appendChild(footer);
}
