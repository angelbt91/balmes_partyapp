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
            if (response.ok && response !== null) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log(error);
            return error;
        })
}

export default get;