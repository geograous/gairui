function getFirstResouce(resouceTypeFn) {
  const firstResource = window.performance.getEntries()
    .find((entry) => resouceTypeFn(entry))
  console.log('first resource entry:', firstResource)
}

function tsResource(resource) {
  if (resource.entryType !== 'resource') {
    return false
  }
  const rTS = /\.ts\?/i
  return rTS.test(resource.name)
}

getFirstResouce(tsResource)
