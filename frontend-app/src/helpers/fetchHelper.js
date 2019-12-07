async function get(url) {

    const options = {
        method: 'GET',
        headers: new Headers({
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
        }),
        mode: 'cors'
    };

    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        })
        .then(response => {
            console.log("GET succesfully completed!");
            console.log(response);
            return response;
        })
        .catch(error => {
            console.log("Error on the GET request.");
            console.log(error.statusText);
            return error;
        })
}

export default get;