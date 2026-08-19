pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'hessen2del/ecommerce-frontend'
        IMAGE_TAG = "${BUILD_NUMBER}"
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
        K8S_NAMESPACE = 'production'
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

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login \
                        -u "$DOCKER_USER" \
                        --password-stdin
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_HUB_REPO}:${IMAGE_TAG} ."
                sh "docker tag ${DOCKER_HUB_REPO}:${IMAGE_TAG} ${DOCKER_HUB_REPO}:latest"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh "docker push ${DOCKER_HUB_REPO}:${IMAGE_TAG}"
                sh "docker push ${DOCKER_HUB_REPO}:latest"
            }
        }

        stage('Apply Kubernetes Manifests') {
            steps {
                sh '''
                    kubectl apply \
                    -f k8s/ \
                    -n ${K8S_NAMESPACE}
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl set image \
                    deployment/my-app \
                    react-app=${DOCKER_HUB_REPO}:${IMAGE_TAG} \
                    -n ${K8S_NAMESPACE}
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    kubectl rollout status \
                    deployment/my-app \
                    -n ${K8S_NAMESPACE} \
                    --timeout=60s
                '''
            }
        }
    }

    post {

        always {
            echo "======== Cleaning up local images ========"

            sh """
                docker rmi \
                ${DOCKER_HUB_REPO}:${IMAGE_TAG} \
                ${DOCKER_HUB_REPO}:latest || true
            """

            sh 'docker logout || true'
        }

        success {
            echo "======== Pipeline executed successfully ========"
        }

        failure {
            echo "======== Pipeline execution failed ========"
        }
    }
}
