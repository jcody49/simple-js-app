let pokemonRepository = (function () {

      let pokemonList = [
      {name: "Bulbasaur", height: "7 m", types: ["grass"," poison"]}, 
      {name: "Ivysaur", height: "1 m", types: ["grass"," poison"]}, 
      {name: "Venusaur", height: "2 m", types: ["grass"," poison"]}
      ]; 

      function getAll () {
            return pokemonList;
      }


      function add (pokemon) {
            pokemonList.push(pokemon);  
      }

      /*function add (pokemon) {
            console.log(object.keys(pokemon));
            if (typeof pokemon === Object && Object.keys(pokemon.includes('name', 'height', 'types'))) {
                  pokemonList.push(pokemon);
            } 
      }*/

      function addListItem(pokemon) {
            let pokemonList = document.querySelector('.pokemon-list'); 
            let listItem = document.createElement('li');
            let button = document.createElement('button');
            button.innerText = pokemon.name;
            button.classList.add('pokemonButtons')
            listItem.appendChild(button);
            pokemonList.appendChild(listItem);
            button.addEventListener('click', function () {
                  showDetails(pokemon)
            });
      }

      function showDetails(pokemon) {
            console.log(pokemon)
      }


      return{
            getAll: getAll,
            add: add,
            addListItem: addListItem
      }
})();
console.log(pokemonRepository.getAll()); // []
pokemonRepository.add({ name: 'Pikachu', height: ".4 m", types: ["electric"] });
console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } ]
//pokemonRepository.addListItem(pokemon);

pokemonRepository.getAll().forEach((pokemon) => {
      pokemonRepository.addListItem(pokemon);
});