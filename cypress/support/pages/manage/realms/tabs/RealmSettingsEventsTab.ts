import CommonPage from '../../../CommonPage'
import AdminEventsSettingsTab from './subtabs/AdminEventsSettingsTab'
import EventListenersTab from './subtabs/EventListenersTab'
import UserEventsSettingsTab from './subtabs/UserEventsSettingsTab'

enum RealmSettingsEventsSubTab {
  EventListeners = 'Event listeners',
  UserEventsSettings = 'User events settings',
  AdminEventsSettings = 'Admin events settings',
}

export default class RealmSettingsEventsTab extends CommonPage {
  private eventListenersTab = new EventListenersTab()
  private userEventsSettingsTab = new UserEventsSettingsTab()
  private adminEventsSettingsTab = new AdminEventsSettingsTab()

  goToEventListenersSubTab() {
    this.tabUtils().clickTab(
      RealmSettingsEventsSubTab.EventListeners,
      1,
    )
    return this.eventListenersTab
  }

  goToUserEventsSettingsSubTab() {
    this.tabUtils().clickTab(
      RealmSettingsEventsSubTab.UserEventsSettings,
      1,
    )
    return this.userEventsSettingsTab
  }

  goToAdminEventsSettingsSubTab() {
    this.tabUtils().clickTab(
      RealmSettingsEventsSubTab.AdminEventsSettings,
      1,
    )
    return this.adminEventsSettingsTab
  }
}
