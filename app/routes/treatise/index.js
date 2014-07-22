`import BaseRoute from '../_base'`

Route = BaseRoute.extend
  model: ->
    @modelFor 'treatise'

  afterModel: ->
    @set 'title', @get('context.title')


`export default Route`
