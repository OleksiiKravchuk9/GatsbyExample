const fetch = require("node-fetch")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const ru = require("convert-layout/ru")
  const ua = require("convert-layout/uk")

  const { createNode } = actions
  delete configOptions.plugins

  const processRate = (data) => {
    console.log(data.name)
    for (let i = 0; i < data.multiLanguageData.length; i++) {
      const nodeId = createNodeId(`umbraco-node-${i}`)
      const nodeContent = JSON.stringify(data)
      const nodeData = Object.assign({}, data.multiLanguageData[i], {
        id: nodeId,
        parent: null,
        children: [],
        internal: {
          type: data.name,
          content: nodeContent,
          contentDigest: createContentDigest(data.multiLanguageData[i])
        }
      })
      createNode(nodeData)
    }
  }

  const getPageData = async (lng, segment) => {
    const url = configOptions.url + "/" + lng + segment
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

  const getUrlFromNode = (node, result) => {
    if (!!node.root && node.root.children.length != 0) {
      for (let item of node.root.children) {
        getUrlFromNode(item, result)
      }
    } else if (!!node.children && node.children.length != 0) {
      for (let item of node.children) {
        getUrlFromNode(item, result)
      }
    }
    if (!!node.root)
      result.push({ url: node.root.url, name: node.root.name })
    else
      result.push({ url: node.url, name: node.name })
    return result
  }

  const getSearchArray = (data, lang, result) => {
    if (!!data.children && data.children.length !== 0) {
      data.children.forEach(x => {
        getSearchArray(x, lang, result)
      })
    }
    result.push({
      data: {
        searchTitle: translate(lang, data.searchTitle),
        searchDescription: translate(lang, data.searchDescription),
        path: data.path !== undefined ? data.path : null,
        id: data.id !== undefined ? data.id : null
      },
      locale: lang
    })
    return result
  }

  const translate = (lang, data) => {
    if (lang === "ru") {
      return ru.toEn(data)
    } else if (lang === "ua") {
      return ua.toEn(data)
    }
    return data
  }

  const getSiteMap = async () => {
    const url = configOptions.url + "/sitemap"
    const response = await fetch(url)
    const data = await response.json()
    return getUrlFromNode(data, [])
  }

  const searchData = { name: "SearchData", multiLanguageData: [] }
  for (const x of configOptions.endpoints) {
    const multilangData = { name: "Event", multiLanguageData: [] }
    for (const y of configOptions.lng) {
      await getPageData(y, x).then(data => {
        multilangData.multiLanguageData.push({
          locale: y,
          data
        })
        searchData.multiLanguageData = searchData.multiLanguageData.concat(getSearchArray(data, y, []))
      })
    }

    processRate(multilangData)
  }
  processRate(searchData)

}
