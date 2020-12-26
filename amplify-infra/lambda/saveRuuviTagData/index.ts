import { DynamoDB } from 'aws-sdk'

const docClient = new DynamoDB.DocumentClient();

exports.handler = async (event: any) => {

    const message = JSON.parse(event.body)

    console.log(message)

    await Promise.all(message.tags.map((tag:any) => {
        console.log(tag)
        const params = {
            TableName: process.env.TABLE_NAME,
            Item: {
                'id': tag.id,
                'name': tag.name,
                'humidity': tag.humidity,
                'voltage': tag.voltage,
                'updated': tag.updateAt,
                'temperature': tag.temperature,
            }
        }
        //@ts-ignore
        return docClient.put(params).promise()
    }))
}