

**Introduction**

The book inventory application is a modern web application designed to manage a collection of books. It utilizes a microservices
architecture with components containerized using Docker, orchestrated by Kubernetes, and managed through Helm charts. The application is
composed of three primary services:

1. A PostgreSQL database for persistent storage of book and user data.
2. A Flask-based RESTful API server written in Python to handle business logic and data manipulation.
3. A front-end user interface (UI) using HTML, CSS, and JavaScript, served by an Nginx web server.

**User Roles and Application Logic**

The application supports three types of user roles with different levels of access:

- **User**: Can view all attributes of books except for the quantity.
- **Staff**: Can view all attributes of books including quantity.
- **Manager** : Can add or update book records.

These roles are enforced within the Flask API logic using decorators that restrict access to certain endpoints based on the role of the authenticated user.


**Application Architecture**


**Entity Diagram**

<img width="755" alt="entity" src="https://github.com/1047473086/Container_group17/assets/149539858/fb2f3506-1e18-4db7-91f0-d932dc5ec686">


**Sequence Diagram - Add new books to the database** 

<img width="656" alt="add books Sequence" src="https://github.com/1047473086/Container_group17/assets/149539858/19eac054-fad3-4db2-9361-01803a9a8f2e">



**Sequence Diagram - overall deployment**

![deployment diagram](https://github.com/1047473086/Container_group17/assets/149539858/25d76216-dc22-441c-b227-73144aa13b58)


**Docker Artifacts**

To build the Docker images for the application, several Dockerfiles and associated files are utilized:

1. Flask API Dockerfile: This Dockerfile starts with a Python 3.7 Alpine image, sets the working directory, installs dependencies
2.  from a `requirements.txt` file, exposes port 5000, and specifies the command to run the Flask application.
3. UI Dockerfile: This Dockerfile uses the Nginx Alpine image as a base, copies the UI files into the Nginx HTML directory, and exposes port 80.
4. `requirements.txt`: Lists all Python packages required by the Flask API.

These Docker artifacts ensure that each component of the application is isolated, consistent, and portable across different environments.

**Kubernetes Deployment Artifacts**

The Helm chart and its associated YAML files are the artifacts created to deploy the application to Kubernetes:

1. `flask-api-deployment.yaml`: Defines the desired state for the Flask API pods, including the Docker image to use,
 the number of replicas, and configuration like environment variables.
2. `flask-api-service.yaml`: Exposes the Flask API deployment as a service within the Kubernetes cluster to make it accessible.
3. `postgres-db-deployment.yaml` and `postgres-db-service.yaml`: Define the deployment and service for the PostgreSQL database.
4. `ui-deployment.yaml` and `ui-service.yaml`: Define the deployment and service for the UI component.
5. `Chart.yaml`: Provides metadata about the Helm chart itself.

These Kubernetes artifacts dictate how the application is deployed, managed, and scaled within a Kubernetes cluster, ensuring high availability and resilience.


**Conclusion**

The book inventory application is a robust system designed with modern architecture principles. 
It leverages containerization for deployment consistency and Kubernetes for orchestration. 
This ensures that the application can be easily scaled and maintained. The application's architecture
facilitates clear separation of concerns, making it modular and easy to update or extend.

