/*
const form = document.getElementById("searchForm");
const keywordElement = document.querySelector("#searchKeyword");


form.addEventListener("submit",submitKeywords);

function submitKeywords(e){

    const keyword = keywordElement.value;

    if(keyword === ""){
        displayMessages("please enter a keyword","danger");
    }
    else{
        displayMessages(`keyword: ${keyword}`, "success");
    }


}

function displayMessages(message, type){

    const searchDiv = document.querySelector("#searchDiv");
    const div = document.createElement("div");
    
    div.className = `alert alert-${type}`;
    div.textContent = message;

    cardDiv.appendChild(div);

    setTimeout(function () {
        div.remove();
    },1000);
}

let paramString = urlString.split('?')[1];
let queryString = new URLSearchParams(paramString);

for (let pair of queryString.entries()) {
   console.log("Key is: " + pair[0]);
   console.log("Value is: " + pair[1]);
}
*/

let search = window.location.search.slice(1);
if (search === "") {

}

else {
    const searchKeyword = search.split("&");
    let x = {};
    let value = '';

    searchKeyword.forEach(keyword => {
        let aaa = keyword.split("=");
        let key = aaa[0];
        value = aaa[1];
        x[key] = value;

        console.log(x);

    });

    if (value === '') {
        console.log("enter keyword");
    }

    else {
        fetch(`http://25.33.228.221:3000/${value}`, {

            method: 'POST',

        })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error', error);
            });

    }
}
/*

fetch(`/http://25.33.228.221:3000/${x}`, {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(x),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});

*/