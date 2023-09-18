const container = document.getElementById("container");
const previous = document.getElementById("btn-prev");
const next = document.getElementById("btn-next");
const gender  = document.getElementById("female");
const species = document.getElementById("species");
const male  = document.getElementById("male");
const numberPage = document.getElementById("currentPage")
let currentPage = 1;
let totalPages = 0;

const getCharacters = (pages) => {
    container.innerHTML = "";
    fetch(`https://rickandmortyapi.com/api/character?page=${pages}`,)
        .then(res => res.json())
        .then((data) => {
            renderCharacters(data)
    totalPages = data.info.pages;
        })
}
getCharacters(currentPage);
const renderCharacters = (data) => {
    container.innerHTML = ""
    data.results.forEach(character => {
        container.innerHTML +=
            `<div class="cards">
<h2><em>${character.name}<em></h2>
<img src="${character.image}" alt="">
<p><b>Descripcion<b></p>
<button class="button" onclick=verMás("${character.url}")>Detalles</button>
</div>`
    });
}
const verMás = (characterUrl) => {
    fetch(characterUrl)
        .then(res => res.json())
        .then((data) => {
            container.innerHTML = 
                `<div class="card"
    <h2><b>${data.name}<b></h2>
    <img src="${data.image}" alt="">
    <p><b>${data.gender}<b></p> 
    <p><b>${data.status}<b></p>
    <p><b>${data.locations}<b></p>
    <p><b>${data.species}<b></p>
    <button class="button" onClick=getCharacters()>Volver</button>
    </div>`
        });
}
next.addEventListener("click", () => {
    if (currentPage <= 1) {
        currentPage++;
    } else if (currentPage > 1 && currentPage < totalPages) {
        previous.removeAttribute("disabled", true)
        currentPage++;
    }
    else{
        next.setAttribute("disabled", true)
    }
    numberPage.textContent = currentPage;
    getCharacters(currentPage);
})
previous.addEventListener("click", () => {
    if (currentPage <= 1) {
        previous.setAttribute("disabled", true)
    } else if (currentPage > 1 && currentPage < totalPages) {
        currentPage--;
        next.removeAttribute("disabled", true)
    }
    else{
        next.setAttribute("disabled", true)
        currentPage--;
    }
    getCharacters(currentPage);
})
const filterFemale = (gender, female) => {
    fetch(`https://rickandmortyapi.com/api/character/?${gender}=${female}`)
    .then(res => res.json())
    .then(data => {renderCharacters(data)
    }) 
    
}
gender.addEventListener("click",() =>{
filterFemale("gender","female")
}) 
const filterSpecies = (species, alien) => {
    currentPage = 1;
    numberPage.textContent = currentPage;
fetch(`https://rickandmortyapi.com/api/character/?${species}=${alien}`)
.then(res => res.json())
.then(data => {renderCharacters(data)
 })
}
species.addEventListener("click",() => {
    filterSpecies("species", "alien")
})
const filterMale = (gender, male) => {
    currentPage = 1;
    numberPage.textContent = currentPage;
    fetch(`https://rickandmortyapi.com/api/character/?${gender}=${male}`)
    .then(res => res.json())
    .then(data => {renderCharacters(data)})
    }
    male.addEventListener("click",() => {
        filterSpecies("gender", "male")
    })
      

