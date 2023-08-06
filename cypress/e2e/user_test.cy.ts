import { v4 as uuid } from 'uuid'

import adminClient from '../support/util/AdminClient'
import LoginPage from '../support/pages/LoginPage'
import { keycloakBefore } from '../support/util/keycloak_hooks'
import SidebarPage from '../support/pages/SidebarPage'
import CreateUserPage from '../support/pages/manage/users/CreateUserPage'
import Masthead from '../support/pages/Masthead'
import UserDetailsPage from '../support/pages/manage/users/user_details/UserDetailsPage'
import CredentialsPage from '../support/pages/manage/users/CredentialsPage'
import ListingPage from '../support/pages/ListingPage'
import AttributesTab from '../support/pages/manage/AttributesTab'
import UserGroupsPage from '../support/pages/manage/users/UserGroupsPage'

let groupsList: string[] = []
let itemId = 'user_crud'

describe('User Creation', () => {
  const loginPage = new LoginPage()
  const sidebarPage = new SidebarPage()
  const createUserPage = new CreateUserPage()
  const masthead = new Masthead()
  const userDetailsPage = new UserDetailsPage()
  const credentialsPage = new CredentialsPage()
  const listingPage = new ListingPage()
  const attributesTab = new AttributesTab()
  const userGroupsPage = new UserGroupsPage()

  let itemIdWithGroups = 'user_with_groups_crud'
  let itemIdWithCred = 'user_crud_cred'

  before(() => {
    cy.wrap(null).then(async () =>
      adminClient.loginUser('admin', 'admin', 'admin-cli'),
    )
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

  it('Go to create User page', () => {
    createUserPage.goToCreateUser()
    cy.url().should('include', 'users/add-user')

    // Verify Cancel button works
    createUserPage.cancel()
    cy.url().should('not.include', '/add-user')
  })

  it('Create user test', () => {
    itemId += '_' + uuid()
    // Create
    createUserPage.goToCreateUser()
    createUserPage.createUser(itemId)
    createUserPage.save()
    masthead.checkNotificationMessage(
      'The user has been created',
    )
  })

  it('Create user with groups test', () => {
    itemIdWithGroups += uuid()
    // Add user from search bar
    createUserPage.goToCreateUser()
    createUserPage.createUser(itemIdWithGroups)
    createUserPage.toggleAddGroupModal()
    const groupsListCopy = groupsList.slice(0, 1)

    groupsListCopy.forEach((element) => {
      cy.findByTestId(`${element}-check`).click()
    })

    createUserPage.joinGroups()
    createUserPage.save()
    masthead.checkNotificationMessage(
      'The user has been created',
    )
  })

  it('Create user with credentials test', () => {
    itemIdWithCred += '_' + uuid()

    // Add user from search bar
    createUserPage.goToCreateUser()

    createUserPage.createUser(itemIdWithCred)

    userDetailsPage.fillUserData()
    createUserPage.save()
    masthead.checkNotificationMessage(
      'The user has been created',
    )
    sidebarPage.waitForPageLoad()

    credentialsPage
      .goToCredentialsTab()
      .clickEmptyStatePasswordBtn()
      .fillPasswordForm()
      .clickConfirmationBtn()
      .clickSetPasswordBtn()
  })

  it('Search existing user test', () => {
    listingPage.searchItem(itemId).itemExist(itemId)
  })

  it('Search non-existing user test', () => {
    listingPage.searchItem('user_DNE')
    cy.findByTestId(listingPage.emptyState).should('exist')
  })

  it('User details test', () => {
    sidebarPage.waitForPageLoad()
    listingPage.searchItem(itemId).itemExist(itemId)
    listingPage.goToItemDetails(itemId)
    userDetailsPage.fillUserData().save()
    masthead.checkNotificationMessage('The user has been saved')
    sidebarPage.waitForPageLoad()
    sidebarPage.goToUsers()
    listingPage.searchItem(itemId).itemExist(itemId)
  })

  it('User attributes test', () => {
    listingPage.goToItemDetails(itemId)
    attributesTab
      .goToAttributesTab()
      .addAttribute('key', 'value')
      .save()
    masthead.checkNotificationMessage('The user has been saved')
  })

  it('User attributes with multiple values test', () => {
    listingPage.searchItem(itemId).itemExist(itemId)
    listingPage.goToItemDetails(itemId)
    cy.intercept('PUT', `/admin/realms/master/users/*`).as(
      'save-user',
    )

    const attributeKey = 'key-multiple'
    attributesTab
      .goToAttributesTab()
      .addAttribute(attributeKey, 'other value')
      .save()

    masthead.checkNotificationMessage('The user has been saved')

    cy.wait('@save-user').should(({ request, response }) => {
      expect(response?.statusCode).to.equal(204)
      expect(
        request.body.attributes,
        'response body',
      ).deep.equal({
        key: ['value'],
        'key-multiple': ['other value'],
      })
    })
  })

  it("Add user to groups test", () => {
    // Go to user groups
    listingPage.searchItem(itemId).itemExist(itemId);
    listingPage.goToItemDetails(itemId);

    userGroupsPage.goToGroupsTab();
    userGroupsPage.toggleAddGroupModal();

    const groupsListCopy = groupsList.slice(0, 3);

    groupsListCopy.forEach((element) => {
      cy.findByTestId(`${element}-check`).click();
    });

    userGroupsPage.joinGroups();
  });

})
