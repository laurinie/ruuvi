export async function apiGetData() {
    return fetch('https://gqeafe8uxg.execute-api.eu-west-1.amazonaws.com/tags', {
        method: 'GET'
    })
        .then(data => data.json())
}
