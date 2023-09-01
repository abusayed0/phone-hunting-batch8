console.log("js/phones.js");

let presentSearch;

const loadPhones = async(phoneName, showAll) =>{
    presentSearch = phoneName;
   toggleHidden("loading-container", true);
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, showAll);
};

const displayPhones = (phonesData, showAll) => {

    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.innerHTML = "";
    let showPhones = phonesData;
    // display first 10 phone
    if(phonesData.length > 12 && !showAll){
        showPhones = phonesData.slice(0, 12);
        toggleHidden("show-btn-container", true);
    }
    else{
        toggleHidden("show-btn-container", false);
    }

    toggleHidden("loading-container", false);

        showPhones.forEach(phoneData => {
        const {phone_name, image, brand, slug} = phoneData;
        const newDiv = document.createElement("div");
        newDiv.classList.add("card", "bg-gray-100", "shadow-xl");
        newDiv.innerHTML = `
        <figure><img src="${image}" alt="phone" /></figure>
        <div class="card-body items-center">
            <h2 class="card-title">${phone_name}</h2>
            <p>Brand : ${brand}</p>
            <div class="card-actions">
                <button class="btn btn-primary" onclick="loadPhoneDetails('${slug}')">Show Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(newDiv);
    })
   
};

const handleSearch = () => {
    const inputField = document.getElementById("input-field");
    const searchPhone = inputField.value;
    loadPhones(searchPhone, false);
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

const handleShowAll = () => {
    loadPhones(presentSearch, true);
}

const loadPhoneDetails = async(phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    const res = await fetch(url);
    const data = await res.json();
    showPhoneDetails(data.data);
};
const showPhoneDetails = (phoneData) => {
    console.log(phoneData);
    const {name,brand, image, mainFeatures : {storage, memory, displaySize, chipSet}} = phoneData;
    const phoneDetailsModalBody = document.getElementById("phone-details-modal-body");
    phoneDetailsModalBody.innerHTML = `
  
    <figure>
        <img src="${image}" alt="phone" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${name}</h2>
      <p>Brand : ${brand}</p>
      <p>Storage : ${storage}</p>
      <p>Memory : ${memory}</p>
      <p>Display size : ${displaySize}</p>
      <p>Chip set : ${chipSet}</p>
    </div>
    `;
    my_modal.showModal()
};
loadPhones("iphone", false);
