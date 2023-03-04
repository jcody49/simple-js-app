const pokemonList = [
    {name: "Bulbasaur", height: 7, types: ["grass","poison"]}, 
    {name: "Ivysaur", height: 1, types: ["grass","poison"]}, 
    {name: "Venusaur", height: 2, types: ["grass","poison"]}
]; 

pokemonList.forEach((element, index, array) => {
    document.write(element.name + ")" + " " + "Height: " + element.height + "," + " Types: " + element.types); 
    document.write("<br/>")
});



