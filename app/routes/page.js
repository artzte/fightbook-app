`import BaseRoute from './_base'`

Route = BaseRoute.extend
  model: (params) ->
    store = @get 'store'
    treatise = @modelFor 'treatise'
    page = treatise.get('pages').findProperty('slug', params.page_id)
    new Ember.RSVP.Promise (resolve, reject) ->
      if Em.isEmpty(page.get('sections'))
        store.reloadRecord(page).then ->
          resolve(page)
      else
        resolve(page)

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
