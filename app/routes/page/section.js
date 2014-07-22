`import BaseRoute from '../_base'`

Route = BaseRoute.extend
  model: (params) ->
    page = @modelFor 'page'
    store = @get 'store'
    page.get('sections').findProperty('sortOrder', parseInt(params.sort_order, 10))

  setupController: (controller, section) ->
    @_super controller, section
    page = @modelFor 'page'
    @set 'title', [page.get('treatise.title'), page.get('title'), "Section #{section.get('sortOrder')}"].join ' - '
    controller.set 'page', page
    controller.set 'section', section
    controller.set 'controllers.page.section', section
    controller.set 'controllers.page.boundsRect', section.get('bounds')

`export default Route`
