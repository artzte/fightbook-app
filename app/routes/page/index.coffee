`import BaseRoute from '../_base'`

Route = BaseRoute.extend
  model: (params) ->
    @modelFor 'page'

  setupController: (controller, page) ->
    treatise = page.get 'treatise'
    @set 'title', [page.get('treatise.title'), page.get('title')].join ' - '
    #controller.set 'treatises', @modelFor 'treatises'
    #controller.set 'treatise', treatise

    ##TODO - doc these
    #controller.set 'controllers.page/section.content', {}
    #controller.set 'controllers.page/section.page', model
    controller.set 'controllers.page.boundsRect', page.get('bounds')
    #controller.set 'controllers.page.section', undefined
    @_super controller, page

`export default Route`
