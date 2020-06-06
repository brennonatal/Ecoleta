function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then( res => res.json() )
    .then( states => {

        for (state of states) {
            ufSelect.innerHTML += `<option value='${state.id}'>${state.nome}</option>`
        }
        
    })
}

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`
    
    citySelect.innerHTML = "`<option value>Selecione a cidade</option>`"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for (city of cities) {
            citySelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>`
        }
        
        citySelect.disabled = false
    })
    
}

document
    .querySelector('select[name=uf]')
    .addEventListener("change", getCities)

// Itens de coleta
// pegar todos os li's
const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


let collectedItems = document.querySelector('input[name=items]')

let selectedItems = []

function handleSelectedItem(event) {

    itemLi = event.target
    
    // adicionar ou remover classes pelo javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId 
        return itemFound
    })

    // se já estiver selecionado, tirar da selecao
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
             const itemIsDifferent = item != itemId
             return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se nao estiver selecionado, adicionar à selecao
        selectedItems.push(itemId)

    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}