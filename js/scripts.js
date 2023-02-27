let pokemonList = [
    {name: "Bulbasaur", height: 7, types: ["grass","poison"]}, 
    {name: "Ivysaur", height: 1, types: ["grass","poison"]}, 
    {name: "Venusaur", height: 2, types: ["grass","poison"]}
]; 

for (let i=0; i < pokemonList.length; i++){
  if (pokemonList[i].height >1){ 
        document.write(pokemonList[i].name +" "+"(Height: "+pokemonList[i].height+") "+"wow, that's big");  
  } else if(pokemonList[i].height < 2){
        document.write(pokemonList[i].name +" "+"(Height: "+pokemonList[i].height+") ");
  }
}