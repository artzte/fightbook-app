Route = Ember.Route.extend
  model: (params) ->
    page = @modelFor 'page'
    store = @get 'store'

    getSection = ->
      Em.RSVP.resolve page.get('sections').findProperty('id', params.section_id)

    if Em.isEmpty(page.get('sections'))
      store.reloadRecord(page).then ->
        getSection()
    else
      getSection()

  setupController: (controller, model) ->
    @_super controller, model
    page = @modelFor 'page'
    controller.set 'page', page
    controller.set 'section', model
    controller.set 'controllers.page.bounds', model.get('bounds')

  renderTemplate: ->
    @_super()

    @render 'page/section-controls',
      into: 'page'
      outlet: 'section-controls'

`export default Route`