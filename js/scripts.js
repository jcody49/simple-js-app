let pokemonRepository = (function () {

      let pokemonList = [
      {name: "Bulbasaur", height: "7 m", types: ["grass","poison"]}, 
      {name: "Ivysaur", height: "1 m", types: ["grass","poison"]}, 
      {name: "Venusaur", height: "2 m", types: ["grass","poison"]}
      ]; 

      /*pokemonList.forEach((element, index, array) => {
      document.write(element.name + ")" + " " + "Height: " + element.height + "," + " Types: " + element.types); 
      document.write("<br/>")
      });

      pokemonList.forEach(function(pokemon) {
            document.write(pokemon.name + ")" + " " + "Height: " + pokemon.height + "," + " Types: " + pokemon.types); 
            document.write("<br/>")
      });*/

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


pokemonRepository.getAll(pokemon); 
pokemonList.forEach((pokemon) => {
      document.write(pokemon.name + ")" + " " + "Height: " + pokemon.height + "," + " Types: " + pokemon.types);
      document.write("<br/>");
});