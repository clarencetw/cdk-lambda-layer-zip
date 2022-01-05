const { awscdk, Gitpod } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'clarencetw',
  authorAddress: 'mr.lin.clarence@gmail.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-lambda-layer-zip',
  repositoryUrl: 'https://github.com/clarencetw/cdk-lambda-layer-zip.git',
  description: 'Lambda Layer for tar gz 7z',
  keywords: ['aws', 'cdk', 'tar', 'gz', '7z'],

  /**
   * we default release the main branch(cdkv2) with major version 2.
   */
  majorVersion: 2,
  defaultReleaseBranch: 'main',
  /**
    * we also release the cdkv1 branch with major version 1.
    */
  releaseBranches: {
    cdkv1: { npmDistTag: 'cdkv1', majorVersion: 1 },
  },

  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['clarencetw'],
  },
  autoApproveUpgrades: true,

  catalog: {
    twitter: 'Clarence_Lin',
    announce: false,
  },

  publishToPypi: {
    distName: 'cdk-lambda-layer-zip',
    module: 'cdk_lambda_layer_zip',
  },
});

new Gitpod(project, {
  prebuilds: {
    addCheck: true,
    addBadge: true,
    addLabel: true,
    branches: true,
    pullRequests: true,
    pullRequestsFromForks: true,
  },
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log'];
project.gitignore.exclude(...common_exclude);

project.synth();
