console.log("js/phones.js");

const loadPhones = async() =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
};

const displayPhones = (phonesData) => {
    console.log(phonesData);
};

loadPhones();