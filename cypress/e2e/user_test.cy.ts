import { v4 } from 'uuid';
import LoginPage from '../support/pages/LoginPage'
import KcAdminClient from '@keycloak/keycloak-admin-client';
const kcAdminClient = new KcAdminClient({
    baseUrl: "http://localhost:8080"
});

let groupName = "group"
let groupsList: string[] = [];

async function authClient(username: string, password: string) {
    await kcAdminClient.auth({
        username: username,
        password: password,
        grantType: 'password',
        clientId: 'admin-cli',
        totp: '123456', // optional Time-based One-time Password if OTP is required in authentication flow
    })
}

async function createGroups() {
    for (let i = 0; i <= 2; i++) {
        groupName += "_" + v4();
        await kcAdminClient.groups.create({
            realm: 'master',
            name: groupName
        })
        groupsList = [...groupsList, groupName];
    }
}

describe('auth keycloak api and create groups', () => {
    before(() => {
        cy.wrap(null).then(() => authClient('admin','admin'))
        cy.wrap(null).then(() => createGroups())
    })

    beforeEach(() => {
        const loginPage = new LoginPage()
        loginPage.logIn()
    })

    it('FINISHED LOGIN', () => {
        cy.log('hello there')
    })

})