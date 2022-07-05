const inputName = document.querySelector('#productName')
const inputPrice = document.querySelector('#productPrice')

const button = document.querySelector('button')
const pokeapi = 'https://pokeapi.co/api/v2/pokemon'

fetch(`${pokeapi}/charmander`)
    .then((res) => {
        return res.json()
    }).then(pokemon => {
        console.log({pokemon})
        const html =  `
        <h3>${pokemon.name}</h3>
        <img src="${pokemon.sprites.front_default}" alt="Esta es una imagen del pokemon ${pokemon.name}">
        <span>#${pokemon.id}</span>`

        const div = document.createElement('div')
        div.classList.add('poke-card')
        div.innerHTML = html

        document.querySelector('body').appendChild(div)
    })
    .catch()

button.addEventListener('click', (e) => {
    const name = inputName.value
    const price = inputPrice.value

    fetch('/api/v1/products', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            price,
        }),
    })
})