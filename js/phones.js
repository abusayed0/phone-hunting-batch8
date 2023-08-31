console.log("js/phones.js");

const loadPhones = async() =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
};

const displayPhones = (phonesData) => {
    const phonesContainer = document.getElementById("phones-container");
    phonesData.forEach(phoneData => {
        console.log(phoneData);
        const {phone_name, image, brand} = phoneData;
        const newDiv = document.createElement("div");
        newDiv.classList.add("card", "bg-gray-100", "shadow-xl");
        newDiv.innerHTML = `
        <figure><img src="${image}" alt="phone" /></figure>
        <div class="card-body items-center">
            <h2 class="card-title">${phone_name}</h2>
            <p>Brand : ${brand}</p>
            <div class="card-actions">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(newDiv);
    })
   
};


loadPhones();