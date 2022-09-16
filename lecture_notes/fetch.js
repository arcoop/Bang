async function getData(url = 'https://jsonplaceholder.typicode.com/users') {
    const response = await fetch(url)
    if (!response.ok){
        throw new Error('Network response was not ok')
    }

    const data = response.json();

    return data 
        
}

getData()
    .then(data => {
        console.log(data)
    })