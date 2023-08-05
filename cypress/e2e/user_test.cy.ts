import { v4 as uuid } from "uuid";

import adminClient from '../support/util/AdminClient'
import LoginPage from '../support/pages/LoginPage'
import { keycloakBefore } from '../support/util/keycloak_hooks'
import SidebarPage from '../support/pages/SidebarPage'
import CreateUserPage from '../support/pages/manage/users/CreateUserPage'

let groupsList: string[] = []
let itemId = "user_crud";

describe('User Creation', () => {
  const loginPage = new LoginPage()
  const sidebarPage = new SidebarPage()
  const createUserPage = new CreateUserPage()
  before(() => {
    cy.wrap(null).then(async () => adminClient.loginUser('admin', 'admin', 'admin-cli'))
    cy.wrap(null).then(async () => {
      groupsList = await adminClient.createUniqueGroups(2)
    })
  })

  beforeEach(() => {
    loginPage.logIn('admin', 'admin')
    keycloakBefore()
    sidebarPage.goToUsers()
  })

  after(() => adminClient.deleteGroups())

  it("Go to create User page", () => {
    createUserPage.goToCreateUser()
    cy.url().should("include", "users/add-user")

    // Verify Cancel button works
    createUserPage.cancel();
    cy.url().should("not.include", "/add-user")
  })


  it("Create user test", () => {
    itemId += "_" + uuid();
    // Create
    createUserPage.goToCreateUser()
    createUserPage.createUser(itemId)
    createUserPage.save()
  });


  it('FINISHED LOGIN', () => {
    cy.log('hello there')
  })
})
