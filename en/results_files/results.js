/* function hexToBase64(str) {
  return btoa(
    String.fromCharCode.apply(
      null,
      str
        .replace(/\r|\n/g, "")
        .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
        .replace(/ +$/, "")
        .split(" ")
    )
  );
} */

function addSourceToImage(img, src) {
  img.src = "data:image/png;base64," + src;
  return img;
}

async function getResults() {
  await fetch("http://25.33.228.221:3000/getuser", {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then(async (res) => {
      console.log(res.id);
      await fetch(`http://25.33.228.221:3000/getresults?id=${res.id}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }).then((res) => {
        return res.json();
      }).then((res) => {
        const events = document.querySelector(".events");
        const results = res.results;
        for(const result of results) {
          const myh1 = document.createElement("h1");
          let p = document.createElement("p");
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          p.textContent = new Date(result.timestamp).toLocaleDateString('en-US', options);
          const div1 = document.createElement("div");
          myh1.textContent = result.keyword;
          myh1.className = "resultKeyword";
          let img = document.createElement("img");
          img.alt = result.timestamp;
          img.title = Date(result.timestamp);
          img.src = "data:image/png;base64," + result.twitter;
          div1.appendChild(img);


          const div2 = document.createElement("div");
          let img2 = document.createElement("img");
          img2.alt = result.timestamp;
          img2.title = Date(result.timestamp);
          img2.src = "data:image/png;base64," + result.yt_comment;
          div2.appendChild(img2);


          const div3 = document.createElement("div");
          let img3 = document.createElement("img");
          img3.alt = result.timestamp;
          img3.title = Date(result.timestamp);
          img3.src = "data:image/png;base64," + result.yt_content;
          div3.appendChild(img3);

          events.appendChild(myh1);
          events.appendChild(document.createElement("hr"));
          events.appendChild(p);
          events.appendChild(img);
          events.appendChild(img2);
          events.appendChild(img3);

        }
      });
    });
}

getResults();
