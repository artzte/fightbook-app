# todo - see page route for better approach for ensuring full record
`import BaseRoute from './_base'`

Route = BaseRoute.extend
  model: (params) ->
    store = @get 'store'
    treatise = store.all('treatise').findProperty('key', params.treatise_key)

    @set 'title', treatise.get('title')
    if treatise.get('pages.length')
      return treatise
    else
      return treatise.reload()

`export default Route`
