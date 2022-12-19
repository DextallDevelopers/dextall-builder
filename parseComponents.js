import path from 'path'
import fs from 'fs'
//joining path of directory

const directoryPath = path.join(__dirname, 'components')
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }

  const list = []
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    const camelToSnakeCase = str =>
      str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)

    const newFileName = camelToSnakeCase(file).slice(1).slice(0, -4)

    const finalStr = `
    case '${newFileName}':
      return defineAsyncComponent(
        () => import('~/components/${file}')
    )
    `
    console.log(finalStr)

    list.push(finalStr)
  })

  try {
    fs.writeFileSync(path.join(__dirname, 'components/list.js'), list.join(' '))
  } catch (err) {
    console.error(err)
  }
})
