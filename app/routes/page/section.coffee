`import BaseRoute from '../_base'`

Route = BaseRoute.extend
  model: (params) ->
    page = @modelFor 'page'
    store = @get 'store'

    getSection = ->
      Em.RSVP.resolve page.get('sections').findProperty('sortOrder', parseInt(params.sort_order, 10))

    if Em.isEmpty(page.get('sections'))
      store.reloadRecord(page).then ->
        getSection()
    else
      getSection()
  afterModel: ->
    @set 'title', [@get('context.page.treatise.title'), @get('context.page.title'), "Section #{@get('context.sortOrder')}"].join ' - '

  setupController: (controller, model) ->
    @_super controller, model
    page = @modelFor 'page'
    controller.set 'page', page
    controller.set 'section', model
    controller.set 'controllers.page.section', model
    controller.set 'controllers.page.boundsRect', model.get('bounds')

`export default Route`
