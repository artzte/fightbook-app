`import BaseRoute from './_base'`

Route = BaseRoute.extend
  title: 'Treatises'
  model: ->
    @get('store').find 'treatise'

`export default Route`
