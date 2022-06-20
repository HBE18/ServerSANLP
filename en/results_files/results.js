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
      await fetch(`http://25.33.228.221:3000/getresults:${res.id}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
      }).then((res) => {
        return res.json();
      }).then((res) => {
        const events = document.querySelector(".events");
        const results = res.results;
        results.forEach(result => {
          const myh1 = document.createElement("h1");
          h1.textContent = result.keyword;
          h1.className = "resultKeyword";
          let img = document.createElement("img");
          img.alt = result.timestamp;
          img = addSourceToImage(img, result.twitter);

          let img2 = document.createElement("img");
          img2.alt = result.timestamp;
          img2 = addSourceToImage(img, result.yt_comment);

          let img3 = document.createElement("img");
          img3.alt = result.timestamp;
          img3 = addSourceToImage(img, result.yt_content);

          events.appendChild(myh1);
          events.appendChild(img);
          events.appendChild(img2);
          events.appendChild(img3);

        });
      });
    });
}

getResults();
