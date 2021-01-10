export async function apiGetData() {

    return fetch('https://gqeafe8uxg.execute-api.eu-west-1.amazonaws.com/getTagData', {
        method: 'POST',
        body:JSON.stringify({
            id:"E0:BB:84:87:D2:40",
            start:new Date(Date.now() - 86400 * 1000).toISOString()
        })
    })
        .then(data => data.json())
}
