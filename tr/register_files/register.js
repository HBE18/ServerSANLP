const user_email = document.querySelector("#exampleInputEmail1");
const user_password = document.querySelector("#exampleInputPassword1");
const pass_confirm = document.querySelector("#exampleInputPassword2");
const body = document.body;
const progressBar = document.querySelector("#progressbar");
const footer = document.getElementsByTagName("footer")[0];
const user = {
  email: "",
  password: "",
  plan: "",
  keywords: [],
};

async function firstComp() {
  event.preventDefault();
  if (user_password.value != pass_confirm.value) {
    alert("Şifreler uyuşmuyor!");
    return;
  }
  if (user_email.value === "" || user_password.value === "") {
    alert("E-posta ve şifre boş bırakılamaz!");
    return;
  }
  user.email = user_email.value;
  user.password = user_password.value;
  await fetch("http://25.33.228.221:3000/checkuser", {
    method: "POST",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user),
  }).then((res) => {
    stat = res.status;
    if (stat === 200) {
      const disDiv = document.createElement("div");
      const icDiv = document.createElement("div");
      disDiv.id = "Second";
      disDiv.style = "margin-left: 25%; margin-top: 10%;";
      const formElement = document.createElement("form");
      icDiv.className = "row row-cols-1 row-cols-md-3 mb-3 text-center";
      icDiv.innerHTML =
        '<div class="form-check form-check-inline">' +
        '<div class="col"><div class="card mb-4 rounded-3 shadow-sm"><div class="card-header py-3"><h4 class="my-0 fw-normal">Basit</h4></div><div class="card-body"><h1 class="card-title pricing-card-title">79,9₺9<small class="text-muted fw-light">/ay</small></h1><ul class="list-unstyled mt-3 mb-4"><li>1 kelime</li><li>E-posta desteği</li><li><input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" style="margin-left:48%; margin-top:5%;" checked></li></ul></div></div></div>' +
        "</div>" +
        '<div class="form-check form-check-inline">' +
        '<div class="col"><div class="card mb-4 rounded-3 shadow-sm"><div class="card-header py-3"><h4 class="my-0 fw-normal">Profesyonel</h4></div><div class="card-body"><h1 class="card-title pricing-card-title">199,99₺<small class="text-muted fw-light">/ay</small></h1><ul class="list-unstyled mt-3 mb-4"><li>5 kelime</li><li>Öncelikli e-posta desteği</li><li><input class="form-check-input" type="radio" name="inlineRadioOptions" style="margin-left:48%; margin-top:5%;" id="inlineRadio2" value="option2"></li></ul></div></div></div>' +
        "</div>";

      const button = document.createElement("a");
      button.style =
        "margin-top: 1%; margin-left: 24%; width: 240px; height: 40px;";
      button.className = "btn btn-primary";
      button.textContent = "İleri";
      button.addEventListener("click", secondComp);
      formElement.appendChild(icDiv);
      formElement.appendChild(button);
      disDiv.appendChild(formElement);
      const first = document.querySelector("#First");
      body.removeChild(first);
      body.removeChild(footer);
      body.appendChild(disDiv);
      body.appendChild(footer);
      progressBar.style.width = "50%";
      const list = progressBar.classList;
      list.remove("bg-danger");
      list.add("bg-warning");
    }
    else if(res.status === 400){
        if (confirm("Bu kullanıcı zaten mevcut. Giriş yapmak ister misiniz?")) {
          window.location.replace("login.html");
        }
    }
  });
}

function secondComp() {
  const basicPlan = document.querySelector("#inlineRadio1").checked;
  const second = document.querySelector("#Second");
  body.removeChild(second);
  body.removeChild(footer);
  const disDiv = document.createElement("div");
  const icDiv = document.createElement("div");
  disDiv.id = "Third";
  disDiv.style = "margin-left: 35%; margin-top: 5%; padding-right: 35%;";
  const formElement = document.createElement("form");
  icDiv.className = "row row-cols-1 row-cols-md-3 mb-3 text-center";
  if (basicPlan) {
    user.plan = "Basic";
    icDiv.innerHTML =
      '<div class="input-group flex-nowrap"><span class="input-group-text" id="addon-wrapping">#</span><input type="text" class="form-control keyword" placeholder="Kelime" aria-describedby="addon-wrapping" required></div>';
  } else {
    user.plan = "Pro";
    icDiv.innerHTML =
      '<div class="input-group flex-nowrap"><span class="input-group-text" id="addon-wrapping">#</span><input type="text" class="form-control keyword" placeholder="Kelime #1" aria-describedby="addon-wrapping" required></div>' +
      '<div class="input-group flex-nowrap" style= "margin-top: 3%;"><span class="input-group-text" id="addon-wrapping">#</span><input type="text" class="form-control keyword" placeholder="Kelime #2" aria-describedby="addon-wrapping" required></div>' +
      '<div class="input-group flex-nowrap" style= "margin-top: 3%;"><span class="input-group-text" id="addon-wrapping">#</span><input type="text" class="form-control keyword" placeholder="Kelime #3" aria-describedby="addon-wrapping" required></div>' +
      '<div class="input-group flex-nowrap" style= "margin-top: 3%;"><span class="input-group-text" id="addon-wrapping">#</span><input type="text" class="form-control keyword" placeholder="Kelime #4" aria-describedby="addon-wrapping" required></div>' +
      '<div class="input-group flex-nowrap" style= "margin-top: 3%;"><span class="input-group-text" id="addon-wrapping">#</span><input type="text" class="form-control keyword" placeholder="Kelime #5" aria-describedby="addon-wrapping" required></div>';
  }

  const button = document.createElement("a");
  button.style =
    "margin-top: 3%; margin-left: 24%; width: 240px; height: 40px;";
  button.className = "btn btn-primary";
  button.textContent = "İleri";
  button.addEventListener("click", thirdComp);
  formElement.appendChild(icDiv);
  formElement.appendChild(button);
  disDiv.appendChild(formElement);
  body.appendChild(disDiv);
  body.appendChild(footer);
  progressBar.style.width = "75%";
  const list = progressBar.classList;
  list.remove("bg-warning");
  list.add("bg-info");
}

function thirdComp() {
  const keyw = document.getElementsByClassName("keyword");
  let empty = true;
  for (let element of keyw) {
    if (element.value != "") {
      empty = false;
      user.keywords.push(element.value);
    }
  }
  if (empty) {
    alert("Kelime(ler) boş olamaz");
    return;
  }
  const third = document.querySelector("#Third");
  body.removeChild(third);
  body.removeChild(footer);
  const disDiv = document.createElement("div");
  const icDiv = document.createElement("div");
  disDiv.id = "Fourth";
  disDiv.style = "margin-left: 40%; margin-top: 5%;";
  const formElement = document.createElement("form");
  icDiv.className = "row row-cols-1 row-cols-md-3 mb-3 text-center";
  // icDiv.innerHTML = '<div class="mb-3"><label for="card-num" class="form-label">Kart Numarası</label><input type="tel" maxlength=16 class="form-control" id="card-num" required><label style= "margin-top: 3%;" for="card-name" class="form-label">Kart üzerindeki isim</label><input type="text" class="form-control" id="card-name" required></input><label style= "margin-top: 3%;" for="card-exp" class="form-label">Son Kullanım Tarihi</label><input type="text" pattern="(?:0[1-9]|1[0-2])/[0-9]{2}" class="form-control" id="card-exp" required></input><label style= "margin-top: 3%;" for="card-cvv" class="form-label">CVC</label><input type="tel" maxlength=3 class="form-control" id="card-cvv" required></input></div>';
  const buyBut = document.createElement("a");
  buyBut.style = "margin-top: 3%; margin-left: 5%; width: 240px; height: 40px;";
  buyBut.className = "btn btn-success";
  buyBut.textContent = "Satın Al";
  buyBut.addEventListener("click", () => {
    alert("Ödeme başarılı.");
  });
  icDiv.appendChild(buyBut);
  const button = document.createElement("a");
  button.addEventListener("click", registerUser);
  button.style = "margin-top: 3%; margin-left: 5%; width: 240px; height: 40px;";
  button.className = "btn btn-primary";
  button.textContent = "Kayıt Ol";
  formElement.appendChild(icDiv);
  formElement.appendChild(button);
  disDiv.appendChild(formElement);
  body.appendChild(disDiv);
  body.appendChild(footer);
  progressBar.style.width = "100%";
  const list = progressBar.classList;
  list.remove("bg-info");
  list.add("bg-success");
}

async function registerUser(ev) {
  ev.preventDefault();
  await fetch("http://25.33.228.221:3000/register", {
    method: "POST",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(reqBody),
  }).then((res) => {
    if (res.status === 200) {
      window.location.replace("login.html");
    } else if (res.status === 400) {
      if (res.error) {
        console.error(res.error);
      } else {
        answer = confirm("Bu kullanıcı zaten mevcut. Giriş yapmak ister misiniz?");
        if (answer) {
          window.location.replace("login.html");
        }
      }
    } else if (res.status === 500) {
      console.error(res.error);
    }
  });
}
