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

    fetch(url, options)
        .then(response => {
            if (response.ok && response !== null) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        })
        .catch(error => {
            console.log(error);
            return error;
        })
}

export default get;