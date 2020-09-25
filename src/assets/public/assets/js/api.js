/* eslint-disable */

document.querySelector(".spinner-border").classList.add("hidden");
document
    .querySelector("#timechanger")
    .addEventListener("submit", async (evt) => {
        evt.preventDefault();
        console.log(evt);
        document.querySelector(".spinner-border").classList.remove("hidden");
        await fetch(evt.target.action, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                seconds: document.querySelector(".border")[
                    document.querySelector(".border").selectedIndex
                ].value,
            }),
        });
        document.querySelector(".spinner-border").classList.add("hidden");
    });

document.addEventListener("DOMContentLoaded", async () => {
    const apiArray = await fetch("/bitcoin/get", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((json) => json.json());
    const tablebody = document.querySelector("#table");
    apiArray.forEach((item) => {
        const elemTr = document.createElement("tr");
        const timeTd = document.createElement("td");
        timeTd.textContent = moment(item.time).format("YYYY-MM-DD hh:mm:ss");
        elemTr.appendChild(timeTd);
        const priceTd = document.createElement("td");
        priceTd.textContent = item.price;
        elemTr.appendChild(priceTd);
        tablebody.appendChild(elemTr);
    });
});
