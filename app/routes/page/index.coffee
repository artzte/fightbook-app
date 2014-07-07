`import BaseRoute from '../_base'`

Route = BaseRoute.extend
  model: (params) ->
    store = @get 'store'
    page = @modelFor 'page'

    if Em.isEmpty(page.get('sections'))
      store.reloadRecord(page)
    else
      page
    treatise = page.get 'treatise'
    @set 'title', [page.get('treatise.title'), page.get('title')].join ' - '

  setupController: (controller, model) ->
    @_super controller, model
    controller.set 'treatises', @modelFor 'treatises'
    controller.set 'treatise', model.get 'treatise'
    controller.set 'controllers.page/section.content', {}
    controller.set 'controllers.page/section.page', model
    controller.set 'controllers.page.boundsRect', model.get('bounds')
    controller.set 'controllers.page.section', undefined

`export default Route`
