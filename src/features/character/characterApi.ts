export const  fetchJoke = async () => {
    var response = await fetch('https://icanhazdadjoke.com/', {
     headers: { Accept: 'application/json' },
   });
   return (response.json() as any);
 }
 