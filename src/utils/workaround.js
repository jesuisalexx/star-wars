
export const getIdFromLink = (link, moduleName) => {
  return link.replace(`https://swapi.dev/api/${moduleName}/`, '').replace('/', '')
}
