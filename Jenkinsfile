pipeline {

    agent any

    environment {
        DOCKER_IMAGE = "deepacode/project-hub"
        DOCKER_TAG   = "${BUILD_NUMBER}"

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
                      -t ${DOCKER_IMAGE}:${DOCKER_TAG} \
                      -t ${DOCKER_IMAGE}:latest .
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

                        echo "$DOCKER_PASS" | docker login \
                          -u "$DOCKER_USER" \
                          --password-stdin

                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker push ${DOCKER_IMAGE}:latest

                        docker logout
                    '''
                }
            }
        }

        stage('Test SSH Connection') {
            steps {

                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'ec2-key',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {

                    sh '''
                        set -e

                        echo "Testing SSH Connection..."

                        ssh -i "$SSH_KEY" \
                          -o StrictHostKeyChecking=no \
                          "$SSH_USER@$EC2_HOST" "hostname"

                        echo "SSH Connection Successful"
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {

                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'ec2-key',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {

                    sh """
                        set -e

                        ssh -i "$SSH_KEY" \
                        -o StrictHostKeyChecking=no \
                        "$SSH_USER@$EC2_HOST" << 'EOF'

sudo docker pull ${DOCKER_IMAGE}:latest

sudo docker stop project-hub || true
sudo docker rm project-hub || true

sudo docker run -d \
  --name project-hub \
  --restart always \
  -p 3000:3000 \
  ${DOCKER_IMAGE}:latest

sudo docker image prune -f

EOF
                    """
                }
            }
        }
    }

    post {

        success {
            echo "Build, Push & Deployment Successful 🚀"
        }

        failure {
            echo "Pipeline Failed ❌"
        }

        always {
            echo "Pipeline Finished"
        }
    }
}