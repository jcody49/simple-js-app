let pokemonRepository = (function () {
      let pokemonList = [];
      let URL =  'https://pokeapi.co/api/v2/pokemon/?limit=150';

      // Adds pokémon to the list if it's an object with the right keys
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

      //Will create list items for each pokemon and turns them into buttons
      function addListItem(pokemon) {
            let pokemonList = document.querySelector('.pokemon-list'); 
            let listItem = document.createElement('li');
            listItem.classList.add('pokemonButton');
            
            let button = document.createElement('button');
            button.innerText = pokemon.name;

            listItem.appendChild(button);
            pokemonList.appendChild(listItem);

            button.addEventListener('click', function () {
                  showDetails(pokemon)
            });
      }









      function showDetails(pokemon) {
            loadDetails(pokemon).then(function(){
              showModal(pokemon);
            });
      }





      //Fetches pokémon list from api and adds them as objects
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



      //Gets data from detailsURL and returns specific details
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





      function showModal(item) {
            

            pokemonRepository.loadDetails(item).then(function () {

                  //Assigns pokemon details to their classes
                  let pokemonImage = document.querySelector('.pokemon-image');
                  pokemonImage.src = item.imageUrl;
                  
                  let pokemonId = document.querySelector('.pokemon-id');
                  pokemonId.innerText = '#' + item.id;
            
                  let pokemonName = document.querySelector('.pokemon-name');
                  pokemonName.innerText = item.name;
            
                  let pokemonHeight = document.querySelector('.pokemon-height');
                  pokemonHeight.innerText = '> ' + (item.height/10) + ' m';
            
                  let itemTypes = "";
                  item.types.forEach(function(types) {
                    itemTypes += ["<li>" + types.type.name + "</li>"];
                  });
                  let pokemonTypes = document.querySelector('.pokemon-types');
                  pokemonTypes.innerHTML = itemTypes;
            });

      }

      


      return{
            getAll: getAll,
            add: add,
            addListItem: addListItem,
            loadList: loadList,
            loadDetails: loadDetails,
            showModal: showModal
      }
})();


pokemonRepository.loadList().then(function() {
      pokemonRepository.getAll().forEach(function(pokemon) {
            pokemonRepository.addListItem(pokemon);
      });
});