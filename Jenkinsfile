pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'hessen2del/ecommerce-frontend'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/7ussen2del/E-commerce_Project-1'
            }
        }

        stage('Test & Validate') {
            steps {
                sh 'npm ci'
                sh 'npm test -- --watchAll=false'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_HUB_REPO:$IMAGE_TAG .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh 'docker login -u "$DOCKER_USER" -p "$DOCKER_PASS"'
                    sh 'docker push $DOCKER_HUB_REPO:$IMAGE_TAG'
                }
            }
        }

        stage('Deploy to Kubernetes'){
            steps {
                sh 'kubectl set image deployment/my-app react-app=$DOCKER_HUB_REPO:$IMAGE_TAG'
            }
        }

        stage('Verify Deployment'){
            steps{
                sh 'kubectl rollout status deployment/my-app'
            }
        }
    }
        post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}

