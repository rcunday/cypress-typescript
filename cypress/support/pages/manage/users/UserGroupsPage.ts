import ModalUtils from '../../../../support/util/ModalUtils'

const modalUtils = new ModalUtils()

export default class UserGroupsPage {
  private userGroupsTab = 'user-groups-tab'
  private noGroupsAddGroupButton = 'no-groups-empty-action'
  private addGroupButton = 'add-group-button'
  private joinGroupButton = 'users:join-button'
  private leaveGroupButton = 'leave-group-button'

  goToGroupsTab() {
    cy.findByTestId(this.userGroupsTab).click()
    return this
  }

  toggleAddGroupModal() {
    // This is dumb, but it's what Cypress wants, so we'll do it 🤷
    // See: https://docs.cypress.io/guides/core-concepts/conditional-testing#Element-existence
    cy.get('body')
      .then(($body) => {
        if (
          $body.find(
            `[data-testid="${this.noGroupsAddGroupButton}"]`,
          ).length
        ) {
          return this.noGroupsAddGroupButton
        }

        return this.addGroupButton
      })
      .then((buttonTestId) => {
        cy.findByTestId(buttonTestId).click({ force: true })
      })

    return this
  }

  joinGroups() {
    cy.findByTestId(this.joinGroupButton).click()
  }

  leaveGroup() {
    cy.findByTestId(this.leaveGroupButton).click()
    modalUtils.confirmModal()
    return this
  }

  leaveGroupButtonDisabled() {
    cy.findByTestId(this.leaveGroupButton).should('be.disabled')
    return this
  }

  leaveGroupButtonEnabled() {
    cy.findByTestId(this.leaveGroupButton).should(
      'not.be.disabled',
    )
    return this
  }
}
