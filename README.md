# Using Keycloak (Application Under Test (AUT))

Keycloak is an Open Source Identity and Access Management solution for modern Applications and Services.
This is a Cypress typescript simple example using the keycloak admin API and basic keycloak UI login automation.

## Getting started

Install Docker: https://docs.docker.com/engine/install/

Spin up Keycloak running in a docker container (locally)

docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:22.0.1 start-dev

Clone this repository into a local directory

git clone https://github.com/rcunday/cypress-typescript.git

Install Cypress Test and test tool dependencies
npm install

Start the Cypress Test Tool
npm run cy:open
