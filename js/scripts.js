let pokemonRepository = (function () {
      let pokemonList = [];
      let URL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
      let itemsPerPage = 20;
      let currentPage = 1;
    
      // Adds pokémon to the list if it's an object with the right keys
      function add(pokemon) {
        if (
          typeof pokemon === 'object' &&
          'name' in pokemon &&
          'detailsUrl' in pokemon
        ) {
          pokemonList.push(pokemon);
        } else {
          console.log('Invalid Pokémon');
        }
      }
    
      // Gets the list of pokémon
      function getAll() {
        return pokemonList;
      }
    
      // Will create list items for each pokemon and turn them into buttons
      function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('pokemon-button');
    
        let button = document.createElement('button');
        button.innerText = pokemon.name;
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
    
      function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          showModal(pokemon);
        });
      }
    
      function showModal(item) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
    
        modalTitle.empty();
        modalBody.empty();
    
        let pokemonName = $('<h1>' + item.name + '</h1>');
        let pokemonImage = $('<img class="modal-img" style="width:50%">');
        pokemonImage.attr('src', item.imageUrl);
        let pokemonHeight = $('<p>' + 'Height : ' + item.height + 'm' + '</p>');
        let pokemonTypes = $(
          '<p>Types:</p><ul>' +
            item.types.map((item) => '<li>' + item.type.name + '</li>') +
            '</ul>'
        );
    
        modalTitle.append(pokemonName);
        modalBody.append(pokemonImage);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonTypes);
    
        $('#pokemon-modal').modal('show');
      }
    
      // Renders the Pokémon buttons for the current page
      function renderPokemonList() {
            let startIndex = (currentPage - 1) * itemsPerPage;
            let endIndex = startIndex + itemsPerPage;
            let currentPokemonList = pokemonList.slice(startIndex, endIndex);
          
            let pokemonListElement = document.querySelector('.pokemon-list');
            pokemonListElement.innerHTML = '';
          
            currentPokemonList.forEach(function (pokemon) {
              addListItem(pokemon);
            });
          
            addPaginationButtons(); // Render the pagination buttons after rendering the Pokémon list
      }
          
    
      // Adds pagination buttons
      function addPaginationButtons() {
        let totalPages = Math.ceil(pokemonList.length / itemsPerPage);
    
        let paginationElement = document.querySelector('.pagination');
        paginationElement.innerHTML = '';
    
        for (let i = 1; i <= totalPages; i++) {
          let listItem = document.createElement('li');
          listItem.classList.add('page-item');
          let button = document.createElement('button');
          button.innerText = i;
          button.classList.add('page-link');
          if (i === currentPage) {
            listItem.classList.add('active');
            button.classList.add('btn-primary');
          }
          listItem.appendChild(button);
          paginationElement.appendChild(listItem);
        }
    
        // Add event listener for pagination buttons
        paginationElement.addEventListener('click', function (event) {
          let target = event.target;
          if (target.tagName === 'BUTTON') {
            currentPage = parseInt(target.innerText);
            renderPokemonList();
            addPaginationButtons();
          }
        });
      }
    
      // Sorts the Pokémon list alphabetically
      function sortPokemonList() {
        pokemonList.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
      }
    
      // Fetches the pokémon list from the API and adds them as objects
      function loadList() {
        return fetch(URL)
          .then(function (response) {
            return response.json();
          })
          .then(function (json) {
            json.results.forEach(function (item) {
              let pokemon = {
                name: item.name,
                detailsUrl: item.url,
              };
              add(pokemon);
            });
          })
          .then(function () {
            sortPokemonList();
          
            currentPage = 1; // Set current page to 1
            renderPokemonList(); // Render the first page of Pokémon
            addPaginationButtons(); // Update pagination buttons
          })
          .catch(function (e) {
            console.error(e);
          });
      }
    
      // Gets data from detailsURL and returns specific details
      function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
          .then(function (response) {
            return response.json();
          })
          .then(function (details) {
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.height = details.height;
            item.types = details.types;
          })
          .catch(function (e) {
            console.error(e);
          });
      }
    
      return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        showDetails: showDetails,
        showModal: showModal,
      };
})();
    
pokemonRepository.loadList().then(function () {
pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
});
});
    
    

