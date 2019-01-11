export default {
  getTabByFileName: state => (fileName) => state.list.find(el => el.filePath === fileName)
}
