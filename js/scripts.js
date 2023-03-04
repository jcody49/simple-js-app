const pokemonList = [
    {name: "Bulbasaur", height: 7, types: ["grass","poison"]}, 
    {name: "Ivysaur", height: 1, types: ["grass","poison"]}, 
    {name: "Venusaur", height: 2, types: ["grass","poison"]}
]; 

/*pokemonList.forEach((element, index, array) => {
    document.write(element.name + ")" + " " + "Height: " + element.height + "," + " Types: " + element.types); 
    document.write("<br/>")
});*/

pokemonList.forEach(function(pokemon) {
      //document.write(pokemon.name + ' is ' + pokemon.height + ' years old.');
      document.write(pokemon.name + ")" + " " + "Height: " + pokemon.height + "," + " Types: " + pokemon.types); 
    document.write("<br/>")
    });