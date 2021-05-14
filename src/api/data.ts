import { Tag } from "../types/dataTypes"

export async function apiGetData(id:string) {

    return fetch('https://7anygy1d2d.execute-api.eu-west-1.amazonaws.com/getTagData', {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            start: new Date(Date.now() - 86400 * 1000).toISOString()
        })
    })
        .then(data => data.json())
}

export async function apiGetTags(): Promise<Tag[]> {

    return fetch('https://7anygy1d2d.execute-api.eu-west-1.amazonaws.com/getTags', {
        method: 'GET',
    })
        .then(data => data.json())
}

export async function apiAddTag(tag: Tag): Promise<Response> {

    return fetch('https://7anygy1d2d.execute-api.eu-west-1.amazonaws.com/addTag', {
        method: 'POST',
        body: JSON.stringify({tag:tag})
    })
        .then(data => data.json())
}