import * as cdk from "@aws-cdk/core";
import * as amplify from "@aws-cdk/aws-amplify";

export class RuuviStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Part 2 - Creation of the Amplify Application
    const amplifyApp = new amplify.App(this, "ruuvi", {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "laurinie",
        repository: "ruuvi",
        oauthToken: cdk.SecretValue.secretsManager("ruuvi-token", {
          jsonField: "GitHubPersonalAccessToken",
        }),
      }),
    });
    const masterBranch = amplifyApp.addBranch("main");
  }
}   