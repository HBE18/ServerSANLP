function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

function addSourceToImage(img, src){
    img.src = 'data:image/jpeg;base64,' + hexToBase64(src);
    return img;
}

async function getUserId() {
    await fetch("http://25.33.228.221:3000/getuser", {
        method: "GET",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }).then((res) => {
        return res.json();
    }).then(async (res) => {
        await fetch(`http://25.33.228.221:3000/getresults:${res.id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((res) => {
            console.log("Done");
        })
    });
}

getUserId();