import * as cdk from "@aws-cdk/core";
import * as amplify from "@aws-cdk/aws-amplify";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2";
import { AssetCode, Function, Runtime } from "@aws-cdk/aws-lambda";
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb'

export class RuuviStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyApp = new amplify.App(this, "ruuvi", {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "laurinie",
        repository: "ruuvi",
        oauthToken: cdk.SecretValue.secretsManager("ruuvi-token", {
          jsonField: "GitHubPersonalAccessToken",
        }),
      }),
    });
    amplifyApp.addBranch("main");

    const table = new Table(this, 'ruuvi-data', {
      partitionKey: { name: 'id', type: AttributeType.STRING },
      sortKey: { name: 'updated', type: AttributeType.STRING }
    })

    const saveTagDataFunction = new Function(this, 'saveRuuviTagData', {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: new AssetCode('./lambda/saveRuuviTagData'),
      environment: {
        TABLE_NAME: table.tableName
      }
    })

    const getTagDataFunction = new Function(this, 'getRuuviTagData', {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: new AssetCode('./lambda/getRuuviTagData'),
      environment: {
        TABLE_NAME: table.tableName
      }
    })


    const httpApi = new HttpApi(this, 'ruuviApi', {
      corsPreflight: { allowOrigins: ['*'] }
    })

    httpApi.addRoutes({
      path: '/tags',
      methods: [HttpMethod.POST],
      integration: new LambdaProxyIntegration({
        handler: saveTagDataFunction
      })
    })
    httpApi.addRoutes({
      path: '/tags',
      methods: [HttpMethod.GET],
      integration: new LambdaProxyIntegration({
        handler: getTagDataFunction
      })
    })


    table.grantWriteData(saveTagDataFunction)
    table.grantReadData(getTagDataFunction)
  }
}