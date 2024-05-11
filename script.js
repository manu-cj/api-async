const body = document.querySelector('body');
let section = document.createElement('section');
let h4 = document.createElement("h4");
h4.style.color = "tomato";
h4.textContent = "Press space or click for change";
section.appendChild(h4);


async function fetchApi(params) {
    const response = await fetch(
		'https://thatsthespir.it/api',
		{
			method: 'GET',
		}
	);
	const data = await response.json();
    console.log(data);

    getAge(data.author);
    
    let divImg = document.createElement('div');
    let quote = document.createElement('quotes');
    let author = document.createElement('h3');


    divImg.style.width = "300px";
    divImg.style.height = "300px";
    if (data.photo === "") {
        divImg.style.backgroundImage = `url(https://thatsthespir.it/uploads/greyscale_anonymous.png)`;
    }else {
        divImg.style.backgroundImage = `url(${data.photo})`;
    }
    divImg.style.borderRadius = '50%';
    divImg.style.backgroundSize = 'cover';
    divImg.style.backgroundPosition = 'center';

    quote.style.backgroundColor = 'tomato';
    quote.style.borderRadius = '15px';
    quote.style.padding = '10px 20px 10px 20px';
    quote.style.display = 'block';
    quote.style.maxWidth = '60%';
    quote.style.textAlign = 'center';

    author.style.color = 'tomato';

    quote.textContent = stripTag(data.quote);
    author.textContent = stripTag(data.author);
    
    body.appendChild(section);
    section.appendChild(divImg);
    section.appendChild(quote);
    section.appendChild(author); 
}


fetchApi();
document.addEventListener('keyup', (e) => {
    if (e.code === "Space") {
        section.innerHTML = "";
        fetchApi()

        let h4 =document.createElement('h4');
        h4.style.color = 'tomato';
        h4.textContent = "Press space or click for change";
        section.appendChild(h4);
    }
    
})

document.addEventListener("click", (e) => {
  section.innerHTML = "";
  fetchApi();

  let h4 = document.createElement("h4");
  h4.style.color = "tomato";
  h4.textContent = "Press space or click for change";
  section.appendChild(h4);
});


function stripTag(texte) {
    return texte.replace(/<[^>]*>/g, '');
}

async function getAge(name) {
    try {
        const response = await fetch(`https://api.agify.io/?name=${name}`);

        if (!response.ok) {
            throw new Error('La requête a échoué avec le statut : ' + response.status);
        }

        const data = await response.json();

        console.log(data);
        let h5 = document.createElement('h5');

        h5.textContent = `${data.age} ans`;

        section.appendChild(h5);
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
}
