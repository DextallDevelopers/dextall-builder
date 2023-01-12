export const useMonday = () => {
  const config = useRuntimeConfig()

  const getDataFromTable = async (boardId: string) => {
    const graphQLRequest = `query { boards(ids: ${boardId}) { items() { name column_values {
      text
      title
      type
      id
    } }}}`
    try {
      const res = await fetch('https://api.monday.com/v2', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.MONDAY_KEY,
        },
        body: JSON.stringify({
          query: graphQLRequest,
        }),
      }).then(res => res.json())

      const data = res?.data?.boards[0]

      if (!data) {
        return null
      }
      let items = data.items

      console.log(items)

      if (items.length) {
        items = items.map(item => {
          const obj = {
            title: item.name,
          }
          item.column_values.forEach(column => {
            obj[column.title] = column.text
          })
          return obj
        })
      }

      return items
    } catch (error) {
      return error
    }
  }

  const postDataToTable = async (boardId: string, item: any) => {
    const columnObj = {
      email: `${item.Email} ${item.Email}`,
      text97: 'Our project',
    }
    const graphQLCreateItem = `mutation {
      create_item (
        board_id: ${boardId},
        item_name: ${item.Name},
        column_values: ${JSON.stringify(JSON.stringify(columnObj))}
        )
        {
          id
        }
    }`

    try {
      const res = await fetch('https://api.monday.com/v2', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.MONDAY_KEY,
        },
        body: JSON.stringify({
          query: graphQLCreateItem,
        }),
      }).then(res => res.json())

      if (res?.errors?.length) {
        res?.errors.forEach(err => {
          throw err
        })
        return
      }

      return res
    } catch (error) {
      throw error
    }
  }

  return { getDataFromTable, postDataToTable }
}
