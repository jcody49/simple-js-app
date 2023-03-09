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

      return{
            getAll: getAll,
            add: add
      }

})();
console.log(pokemonRepository.getAll()); // []
pokemonRepository.add({ name: 'Pikachu', height: ".4 m", types: ["electric"] });
console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } ]

/*pokemonRepository.getAll().forEach((pokemon) => {
      document.write(pokemon.name + ")" + " " + "Height: " + pokemon.height + "," + " Types: " + pokemon.types); 
            document.write("<br/>")
})*/


pokemonRepository.getAll().forEach((pokemon) => {
      let pokemon = document.querySelector('.pokemon-list'); 
      let listItem = document.createElement('li')
      let button = document.createElement(button.classList.add(pokemonButtons))
})






//let element = document.querySelector('.pokemon-list'); 