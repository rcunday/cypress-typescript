import Masthead from './Masthead'
import SidebarPage from './SidebarPage'
import TabUtils from './components/TabPage'
import FormUtils from './components/FormPage'
import ModalUtils from '../util/ModalUtils'
import ActionToolbarUtils from './components/ActionToolbarPage'
import TableToolbarUtils from './components/TableToolbarPage'
import TableUtils from './components/TablePage'
import EmptyStatePage from './components/EmptyStatePage'

export default class CommonPage {
  private mastheadPage = new Masthead()
  private sidebarPage = new SidebarPage()
  private tabUtilsObj = new TabUtils()
  private formUtilsObj = new FormUtils()
  private modalUtilsObj = new ModalUtils()
  private actionToolbarUtilsObj = new ActionToolbarUtils()
  private tableUtilsObj = new TableUtils()
  private tableToolbarUtilsObj = new TableToolbarUtils()
  private emptyStatePage = new EmptyStatePage()

  masthead() {
    return this.mastheadPage
  }

  sidebar() {
    return this.sidebarPage
  }

  tabUtils() {
    return this.tabUtilsObj
  }

  formUtils() {
    return this.formUtilsObj
  }

  modalUtils() {
    return this.modalUtilsObj
  }

  actionToolbarUtils() {
    return this.actionToolbarUtilsObj
  }

  tableUtils() {
    return this.tableUtilsObj
  }

  tableToolbarUtils() {
    return this.tableToolbarUtilsObj
  }

  emptyState() {
    return this.emptyStatePage
  }
}
