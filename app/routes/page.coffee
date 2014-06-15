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
    flushUpdateQueue: ->
      return unless @get('session.currentUser.isAdmin')
      updateQueue = @get('updateQueue')
      while updateQueue.get('length')
        section = updateQueue.popObject()
        section.save()
    willTransition: ->
      @send 'flushUpdateQueue'
    sectionClicked: (section) ->
      @transitionTo 'page.section', @get('currentModel'), section.get('sortOrder')

`export default Route`
