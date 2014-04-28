Route = Ember.Route.extend
  model: (params) ->
    store = @get 'store'
    store.find('page', params.page_id)

  setupController: (controller, model) ->
    @_super controller, model
    controller.set 'page', model

  renderTemplate: ->
    @_super()
    @render 'page/menu',
      into: 'application'
      outlet: 'leftMenu'
      controller: @get 'controller'

`export default Route`