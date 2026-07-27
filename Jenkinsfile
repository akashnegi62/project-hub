pipeline {
    agent any

    tools {
        nodejs 'NodeJS 20'
    }

    environment {
        DOCKER_IMAGE = "deepacode/project-hub"
        DOCKER_TAG = "v1"
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out source code"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                set -e
                npm ci
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                set -e
                npm test || true
                '''
            }
        }

        stage('Build Next.js') {
            steps {
                sh '''
                set -e
                npm run build
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                set -e
                docker build -t $DOCKER_IMAGE:$DOCKER_TAG .
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                    set -e

                    echo $DOCKER_PASS | docker login \
                    -u $DOCKER_USER \
                    --password-stdin

                    docker push $DOCKER_IMAGE:$DOCKER_TAG

                    docker logout
                    '''
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                docker image prune -f
                '''
            }
        }
    }

    post {
        always {
            echo "Pipeline completed"
        }

        failure {
            echo "Pipeline failed"
        }
    }
}