pipeline {

    agent any

    environment {
        DOCKER_IMAGE = "deepacode/project-hub"
        DOCKER_TAG = "${BUILD_NUMBER}"

        EC2_USER = "ubuntu"
        EC2_HOST = "15.207.180.8"
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


        stage('Deploy to EC2') {

            steps {

                sh '''
                set -e

                echo "Deploying application to EC2"


                ssh -o StrictHostKeyChecking=no \
                $EC2_USER@$EC2_HOST << EOF


                echo "Pulling latest Docker image"

                docker pull $DOCKER_IMAGE:latest


                echo "Stopping old container"

                docker stop project-hub || true


                echo "Removing old container"

                docker rm project-hub || true


                echo "Starting new container"

                docker run -d \
                --name project-hub \
                --restart always \
                -p 3000:3000 \
                $DOCKER_IMAGE:latest


                echo "Deployment completed successfully"


                EOF
                '''
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
            echo "Build, Docker push and EC2 deployment completed successfully"
        }


        failure {
            echo "Pipeline failed"
        }


        always {
            echo "Pipeline finished"
        }
    }
}