let pokemonRepository = (function () {
      let pokemonList = [];
      let URL =  'https://poke.co//v2/pokemon/?limit=150';

      /*let pokemonList = [
      {name: "Bulbasaur", height: "7 m", types: ["grass"," poison"]}, 
      {name: "Ivysaur", height: "1 m", types: ["grass"," poison"]}, 
      {name: "Venusaur", height: "2 m", types: ["grass"," poison"]}
      ];*/ 

      /*function add (pokemon) {
            pokemonList.push(pokemon);  
      }*/

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

            button.appendChild(button);
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
            return fetch(Url).then(function (response) {
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
//pokemonRepository.addListItem(pokemon);

pokemonRepository.getAll().forEach((pokemon) => {
      pokemonRepository.addListItem(pokemon);
});

/*fetch('https://poke.co//v2/pokemon/').then(function(response) {
      return response.json();//this returns a promise
      }).then(function (pokemonList) {
      console.log(pokemonList);
      document.write(pokemonList);//the actual JSON response
      }).catch(function () {
      //error
});*/


/*fetch('https://poke.co//v2/pokemon/').then(function(response) {
      return response.json(pokemon);//this returns a promise
      }).then(function (pokemonList) {
      console.log(pokemonList);//the actual JSON response
      function addListItem(pokemon)
      }).catch(function () {
      //error
});*/

//test