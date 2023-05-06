let pokemonRepository = (function () {
      let pokemonList = [];
      let URL =  'https://pokeapi.co/api/v2/pokemon/?limit=150';

      // Adds pokémon to the list if it's an object with the right keys
      function add(pokemon){ 
            if (typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon /*&& 'item.types' in pokemon*/) {
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
            listItem.classList.add('pokemon-button');
            
            
            let button = document.createElement('button');
            button.innerText= pokemon.name;
            button.classList.add('btn-block');
            button.classList.add('btn-primary');
            button.classList.add('pokemon-button');
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#exampleModal');
            listItem.classList.add('col-xl-3');
            listItem.classList.add('col-lg-4');
            listItem.classList.add('col-md-6');
            listItem.appendChild(button);
            pokemonList.appendChild(listItem);
            button.addEventListener('click', function () {
              showDetails(pokemon);
            });
      }

      let searchButton = document.getElementById('searchButton');
      searchButton.addEventListener('click', function() {
      let searchBar = document.getElementById('searchBar');
      let query = searchBar.value;
      let filteredPokemon = pokemonRepository.getAll().filter(function(pokemon){
      return pokemon.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      if (filteredPokemon.length === 1) {
            showDetails(filteredPokemon[0]);
      } else {
      alert('Please enter a valid Pokemon name.');
      }
      });



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
            item.id = details.id;
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.height = details.height;
            item.types = details.types;
            }).catch(function(e){
            console.error(e);
            });
      }


      function showModal(item) {
            
            let modalBody = $('.modal-body');
            let modalTitle = $('.modal-title');
            
      
            modalTitle.empty();
            modalBody.empty();
      
            let pokemonName = $('<h1>' + item.name + '</h1>')
            let pokemonImage = $('<img class="modal-img" style="width:50%">');
            pokemonImage.attr('src', item.imageUrl);
            let pokemonHeight = $('<p>' + 'Height : ' + item.height + 'm' + '</p>');
            let pokemonTypes = $('<p>Types:</p><ul>'+item.types.map(item => '<li>'+item.type.name+'</li>')+'</ul>');

            modalTitle.append(pokemonName);
            modalBody.append(pokemonImage);
            modalBody.append(pokemonHeight);
            modalBody.append(pokemonTypes);
            

            $('#pokemon-modal').modal('show');
                   
      };
      

      function searchPokemon(query) {
            
            return pokemonRepository.getAll().filter(function(pokemon) {
              return pokemon.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            });
            
      }

      return {
            getAll: getAll,
            add: add,
            addListItem: addListItem,
            loadList: loadList,
            loadDetails: loadDetails,
            showModal: showModal,
            showDetails: showDetails
      };
})();


pokemonRepository.loadList().then(function() {
      pokemonRepository.getAll().forEach(function(pokemon) {
            pokemonRepository.addListItem(pokemon);
      });
});

function displayPokemonList(pokemonList) {
      let pokemonListElement = document.querySelector('.pokemon-list');
      pokemonListElement.innerHTML = '';
      pokemonList.forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
}

