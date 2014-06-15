Route = Ember.Route.extend
  model: (params) ->
    store = @get 'store'
    treatise = @modelFor 'treatise'
    store.find 'page', "#{treatise.get('id')}-#{params.page_id}"

  setupController: (controller, model) ->
    @_super controller, model
    controller.set 'page', model

  renderTemplate: ->
    @_super()
    @render 'page/menu',
      into: 'application'
      outlet: 'leftMenu'
      controller: @get 'controller'

  actions:
    sectionClicked: (section) ->
      @transitionTo 'page.section', @get('currentModel'), section.get('sortOrder')
    willTransition: ->
      @send 'flushUpdateQueue'

`export default Route`
