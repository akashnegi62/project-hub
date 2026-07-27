pipeline {

    agent any

    environment {
        DOCKER_IMAGE = "deepacode/project-hub"
        DOCKER_TAG = "${BUILD_NUMBER}"
    }


    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }


    stages {


        stage('Checkout') {
            steps {
                echo "Source code already checked out by Jenkins SCM"
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

                docker build \
                -t $DOCKER_IMAGE:$DOCKER_TAG \
                -t $DOCKER_IMAGE:latest .
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

                    docker push $DOCKER_IMAGE:latest


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

        success {
            echo "Build and Docker push completed successfully"
        }


        failure {
            echo "Pipeline failed"
        }


        always {
            echo "Pipeline finished"
        }
    }
}