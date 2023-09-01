console.log("js/phones.js");

const loadPhones = async(phoneName) =>{

   toggleHidden("loading-container", true);
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
};

const displayPhones = (phonesData) => {

    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.innerHTML = "";
    let showPhones = phonesData;
    // display first 10 phone
    if(phonesData.length > 12){
        console.log(showPhones.length);
        showPhones = phonesData.slice(0, 12);
        toggleHidden("show-btn-container", true);
    }
    else{
        toggleHidden("show-btn-container", false);
    }
    toggleHidden("loading-container", false);

        showPhones.forEach(phoneData => {
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

const handleSearch = () => {
    const inputField = document.getElementById("input-field");
    const searchPhone = inputField.value;
    loadPhones(searchPhone);
}

const toggleHidden = (elementId, remove) => {
    const element = document.getElementById(elementId);
    if(remove){
        element.classList.remove("hidden");
    }
    else{
        element.classList.add("hidden");
    }
};
loadPhones("iphone");