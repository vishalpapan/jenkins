# MERN Task Manager Application DevOps CICD Pipeline

A full-stack MERN application designed for practicing DevOps CI/CD pipelines with Jenkins, Docker, and ArgoCD.

## Features

- **Frontend**: React.js with modern UI
- **Backend**: Node.js/Express with MongoDB
- **Authentication**: JWT-based user authentication
- **Task Management**: CRUD operations for tasks
- **DevOps Ready**: Containerized with Docker
- **CI/CD Pipeline**: Jenkins automation
- **Kubernetes**: Ready for K8s deployment
- **GitOps**: ArgoCD integration

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **DevOps**: Docker, Jenkins, Kubernetes, ArgoCD
- **Database**: MongoDB

## Prerequisites

- Node.js 18+
- MongoDB
- Docker & Docker Compose
- Jenkins
- Kubernetes cluster
- ArgoCD

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mern-stack-devops-cicd-pipeline
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:5000
   - Backend API: http://localhost:5000/api

### Manual Setup

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure your environment
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## DevOps Pipeline

### Jenkins CI/CD Pipeline

The Jenkinsfile includes:
- Code checkout
- Dependency installation
- Test execution
- Docker image building
- Push to Docker Hub
- Kubernetes manifest updates
- ArgoCD sync trigger

### Docker Configuration

- Multi-stage build for optimization
- Non-root user for security
- Health checks included
- Production-ready configuration

### Kubernetes Deployment

- Deployment with 3 replicas
- Service with LoadBalancer
- Secrets management
- Resource limits and requests
- Health probes

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
```

## Jenkins Setup

1. **Required Plugins**
   - Docker Pipeline
   - GitHub Integration
   - Kubernetes CLI

2. **Credentials Setup**
   - `docker-hub-credentials`: Docker Hub username/password
   - `github-credentials`: GitHub token

3. **Pipeline Configuration**
   - Point to your repository
   - Use the provided Jenkinsfile

## Kubernetes Deployment

1. **Apply manifests**
   ```bash
   kubectl apply -f k8s/
   ```

2. **Update secrets**
   ```bash
   # Encode your secrets
   echo -n "your-mongodb-uri" | base64
   echo -n "your-jwt-secret" | base64
   
   # Update k8s/secrets.yaml with encoded values
   kubectl apply -f k8s/secrets.yaml
   ```

## ArgoCD Setup

1. **Install ArgoCD**
   ```bash
   kubectl create namespace argocd
   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
   ```

2. **Create Application**
   ```yaml
   apiVersion: argoproj.io/v1alpha1
   kind: Application
   metadata:
     name: task-manager-app
   spec:
     project: default
     source:
       repoURL: <your-repo-url>
       targetRevision: HEAD
       path: k8s
     destination:
       server: https://kubernetes.default.svc
       namespace: default
     syncPolicy:
       automated:
         prune: true
         selfHeal: true
   ```

## Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## Monitoring

The application includes:
- Health check endpoint: `/health`
- Kubernetes probes
- Resource monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## DevOps Learning Objectives

This project helps you practice:
- MERN stack development
- Docker containerization
- Jenkins CI/CD pipelines
- Kubernetes deployments
- GitOps with ArgoCD
- Infrastructure as Code
- Automated testing
- Security best practices