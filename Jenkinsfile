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

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                // استخدام علامات التنصيص المزدوجة لتمرير المتغيرات بشكل صحيح
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
                 export KUBECONFIG=/var/lib/jenkins/.kube/config
                 kubectl config current-context
                 kubectl cluster-info
                 kubectl apply -f k8s/
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
               sh '''
                 export KUBECONFIG=/var/lib/jenkins/.kube/config
                 kubectl set image deployment/my-app \
                 react-app=${DOCKER_HUB_REPO}:${IMAGE_TAG}
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                   export KUBECONFIG=/var/lib/jenkins/.kube/config
                   kubectl rollout status deployment/my-app --timeout=60s
                 '''
            }
        }
    }

    post {
        always {
            echo "======== Cleaning up local images ========"
            sh "docker rmi ${DOCKER_HUB_REPO}:${IMAGE_TAG} ${DOCKER_HUB_REPO}:latest || true"
            sh "docker logout"
        }
        success {
            echo "======== Pipeline executed successfully ========"
        }
        failure {
            echo "======== Pipeline execution failed ========"
        }
    }
}
