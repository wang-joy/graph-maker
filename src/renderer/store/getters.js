import SvgManager from '@/svg/manager/svg-manager'
export default {
  getTabByFileName: state => (fileName) => state.list.find(el => el.filePath === fileName),
  svg: state => SvgManager.getById(state.active)
}
