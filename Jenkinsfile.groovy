pipeline {
    agent any
    stages {
        stage('Create Zip File') {
            steps {
                script{
                    zip dir: '', exclude: '', glob: '', zipFile: 'deploymentFile.zip'
                } 
            }
        }

        stage('Deploy Lambda Function') {
            steps {
                deployLambda([alias: '', artifactLocation: 'deploymentFile.zip', awsAccessKeyId: 'AKIAW27ZI5T5JZ63WEJR', awsRegion: 'us-east-1', awsSecretKey: '{AQAAABAAAAAwH+3M+fGs5DNakErRLQRVYf+mJ65MjGI9KZekqEctXPLYxFDIfL1I/9ZwOgc0Oweh/boGG4ubZ1ChumcK+M70SA==}', deadLetterQueueArn: '', description: 'managed by Jenkins', environmentConfiguration: [kmsArn: ''], functionName: 'processContactFormRequest', handler: 'index.handler', memorySize: '1024', role: 'arn:aws:iam::470284823802:role/service-role/processContactFormRequest-role-3av0qgm9', runtime: 'node.js14.x', securityGroups: '', subnets: '', timeout: '300', updateMode: 'code'])
            }
        }
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
    }
}
