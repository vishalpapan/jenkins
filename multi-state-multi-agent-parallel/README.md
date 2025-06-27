Jenkins Parallel Build Pipeline Demo
This repository contains a simple Jenkins Declarative Pipeline that demonstrates how to execute multiple build stages in parallel. This approach is highly beneficial for optimizing CI/CD times, especially in projects with independent components (like a separate backend and frontend).

Pipeline Overview
The Jenkinsfile in this repository defines a single stage named 'Build All'. Within this stage, two sub-stages are executed concurrently:

'Build Back-end': Simulates building a backend application using Maven and an OpenJDK 11 Docker image.

'Build Front-end': Simulates building a frontend application using Node.js and an Alpine Node 16 Docker image.

The pipeline will wait for both parallel stages to complete before marking the 'Build All' stage as finished.