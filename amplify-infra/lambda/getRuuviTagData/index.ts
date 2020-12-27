import { DynamoDB } from 'aws-sdk'
import { ScanInput } from 'aws-sdk/clients/dynamodb';

const docClient = new DynamoDB.DocumentClient();

exports.handler = async (event: any) => {
    const params = {
        TableName: process.env.TABLE_NAME
    } as ScanInput;

    // let records:any[] = []

    return await docClient.scan(params).promise()

    // function onScan(err: any, data: any) {
    //     if (err) {
    //         console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    //         return {
    //             status:400
    //         }
    //     } else {
    //         // print all the movies
    //         console.log("Scan succeeded.");
    //         records.concat(data.Items)

    //         // continue scanning if we have more movies, because
    //         // scan can retrieve a maximum of 1MB of data
    //         if (typeof data.LastEvaluatedKey != "undefined") {
    //             console.log("Scanning for more...");
    //             params.ExclusiveStartKey = data.LastEvaluatedKey;
    //             return docClient.scan(params, onScan);
    //         }else{
    //             return {
    //                 status:200,
    //                 body:records
    //             }
    //         }
    //     }
    // }
}