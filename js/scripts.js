let pokemonRepository = (function () {
      let pokemonList = [];
      let URL =  'https://pokeapi.co/api/v2/pokemon/?limit=150';

      // Adds pokémon to the list if it's an object with specific keys
      function add(pokemon){ 
            if (typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon) {
            pokemonList.push(pokemon);
            } else {
            console.log('Invalid Pokémon');
            }
      }

      //gets the list
      function getAll () {
            return pokemonList;
      }

      //Will create list items for each pokemon and turn them into buttons
      function addListItem(pokemon) {
            let pokemonList = document.querySelector('.pokemon-list'); 
            let listItem = document.createElement('li');
            listItem.classList.add('pokemonButton')
            
            let button = document.createElement('button');
            button.innerText = pokemon.name;

            listItem.appendChild(button);
            pokemonList.appendChild(listItem);

            button.addEventListener('click', function () {
                  showDetails(pokemon)
            });
      }

      //Logs pokémon details in the modal
      function showDetails(pokemon) {
            loadDetails(pokemon).then(function(){
            showModal(pokemon);
            });
      }

      //Fetches pokémon list from  and adds pokémons as objects
      function loadList() {
            return fetch(URL).then(function (response) {
                  return response.json();
            }).then(function (json) {
                  json.results.forEach(function (item) {
                        let pokemon = {
                              name: item.name,
                              detailsUrl: item.url
                        };
                        add(pokemon);
                  });
            }).catch(function (e) {
            console.error(e);
            })
      }

      //Gets data from detailsURL and returns specific pokémon details
      function loadDetails(item) {
            let url = item.detailsUrl;
            return fetch(url).then(function(response) {
                  return response.json();
            }).then(function(details) {
            // Adds pokémon details to item 
            item.id = details.id;
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.height = details.height;
            item.types = details.types;
            }).catch(function(e){
            console.error(e);
            });
      }

      function showDetails(pokemon) {
            console.log(pokemon)
      }

      return{
            getAll: getAll,
            add: add,
            addListItem: addListItem,
            loadList: loadList,
            loadDetails: loadDetails,
            showDetails: showDetails
      }
})();
console.log(pokemonRepository.getAll()); // []
pokemonRepository.add({ name: 'Pikachu', height: ".4 m", types: ["electric"] });
console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } ]


pokemonRepository.loadList().then(function() {
      pokemonRepository.getAll().forEach(function(pokemon) {
            pokemonRepository.addListItem(pokemon);
      });
});