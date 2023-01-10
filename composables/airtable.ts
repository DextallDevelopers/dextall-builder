import Airtable from 'airtable'

interface iTableItem {
  fields: {
    [any: string]: any
  }
}

type tGetData = (arg0: string) => Promise<iTableItem[]>

export const useAirtable = () => {
  Airtable.configure({ apiKey: 'keyRNI0YuRgsWpni5' })

  const base = Airtable.base('appI0otCiP6OAAEMe')

  const getDataFromTable: tGetData = baseName => {
    const data: iTableItem[] = []
    return new Promise((resolve, reject) => {
      base(baseName)
        .select()
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach(function (record: any) {
              data.push(record.fields)
            })
            fetchNextPage()
          },
          function done(err) {
            resolve(data)
            if (err) {
              reject(err)
              return
            }
          }
        )
    })
  }

  const postDataToTable = (baseName, items: iTableItem[]) => {
    return new Promise((resolve, reject) => {
      base(baseName).create(items, function (err, records) {
        resolve(records)
        if (err) {
          reject(err)
          return
        }
      })
    })
  }

  return { Airtable, base, getDataFromTable, postDataToTable }
}
