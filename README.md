 Project Name

Short description of your project.

## Description

Briefly describe the purpose and scope of your project. Mention the main features and functionalities.

## Installation

1. Clone the repository from GitHub:

git clone https://github.com/mersile-atti/mourtallahProject.git
cd your-repo


2. Install the Node.js dependencies:

npm install


3. Set up and configure your MongoDB database. Make sure to set the appropriate connection string in the application.

4. Build Docker images for the frontend and backend:

docker build -t your-frontend-image ./frontend
docker build -t your-backend-image ./backend


5. Set up and configure Prometheus, Grafana, and AlertManager as described in the Monitoring and Alerting section.

## Usage

To start the application using Docker Compose, run the following command:

docker-compose up


The application, along with Prometheus, Grafana, and AlertManager, will be started and can be accessed at the respective URLs.

- Application: http://localhost:3000
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000 (credentials: admin/admin)
- AlertManager: http://localhost:9093

## API Endpoints

List all the available API endpoints here, along with a brief description of each.

- `GET /api/servers`: Retrieve a list of servers.
- `POST /api/servers`: Create a new server.
- `PUT /api/servers/:id`: Update an existing server by ID.
- `DELETE /api/servers/:id`: Delete a server by ID.

## Monitoring and Alerting

This section describes how to set up and use Prometheus, Grafana, and AlertManager for monitoring and alerting purposes.




# Installation et configuration de Prometheus :
Téléchargez Prometheus sur le site officiel (https://prometheus.io/download/) basé sur le système d’exploitation de votre serveur.
Extraire le paquet téléchargé et naviguer vers le répertoire Prometheus.
Créez un fichier de configuration prometheus.yml.

Exécuter Prometheus avec la commande suivante :

prometheus --config.file=prometheus.yml

# Instrument Votre application Node.js :

Installez la bibliothèque prom-client dans votre projet Node.js en utilisant npm:

npm install prom-client
Dans votre code d’application Node.js, importez et utilisez la librairie prom-client pour instrumenter votre application avec des métriques personnalisées. Vous pouvez définir et exposer des métriques pour différents aspects de votre application, tels que les requêtes HTTP, les requêtes de base de données ou la logique métier personnalisée.

# Installation et configuration de Grafana :

Téléchargez Grafana sur le site officiel (https://grafana.com/grafana/download)
Installez et exécutez Grafana en suivant les instructions de votre plateforme.
Accédez à l’interface web de Grafana (généralement disponible sur http://localhost:3000) et connectez-vous avec les identifiants par défaut (admin/admin).
Configurez la source de données pour connecter Grafana à Prometheus. Dans Grafana, allez dans "Configuration" > "Sources de données" > "Ajouter une source de données." Sélectionnez "Prometheus" comme type de source de données, et spécifiez l’URL de votre serveur Prometheus.

# Installer et configurer AlertManager :

Téléchargez AlertManager à partir du site officiel (https://prometheus.io/download/).
Extraire le paquet téléchargé et accéder au répertoire AlertManager.
Créez un fichier de configuration alertmanager.yml. Dans ce fichier, vous définirez les règles d’alerte et les canaux de notification.

Exécuter AlertManager avec la commande suivante :

alertmanager --config.file=alertmanager.yml

Configurer les alertes et les canaux de notification :
Dans votre fichier de configuration prometheus.yml, définissez les règles d’alerte. Ces règles spécifient les conditions de génération d’alertes en fonction des métriques collectées.

# Créez un fichier alert.rules.yml et définissez vos règles d’alerte

# Tester la pile :
Vérifiez que Prometheus gratte correctement les métriques de votre application Node.js en accédant à l’interface web de Prometheus (habituellement disponible à http://localhost:9090) et en interrogeant les métriques.
Créez des exemples de tableaux de bord et de panneaux dans Grafana pour visualiser les mesures recueillies. Vous pouvez ajouter des visualisations et configurer des alertes dans Grafana en fonction des données métriques.
Tester les règles d’alerte et les canaux de notification en déclenchant des alertes en fonction des conditions prédéfinies. Vous pouvez le faire en créant intentionnellement des conditions qui violent les règles