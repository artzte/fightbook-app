`import Ember from 'ember'`
`import Resolver from 'ember/resolver'`
`import loadInitializers from 'ember/load-initializers'`

Ember.MODEL_FACTORY_INJECTIONS = true;

# This method sizes elements that are required to be of a certain height.
Em.Application.reopenClass
  doResize: ->
    $innerWrap = $('.inner-wrap')
    headerHeight = $('nav').height() + $('header').height()
    height = $innerWrap.height() - headerHeight

    # get height-targeted containers - those with a sizeWhen data attribute
    # are conditionally sized based on responsive media query. if the query
    # does not match it removes the forced height attribute
    containers = $('.size-to-height')
    containers.each (index, container) =>
      el = $(container)
      sizeWhen = el.data 'sizeWhen'
      if !sizeWhen? || @get "media.#{sizeWhen}"
        el.height height
      else
        el.css 'height', ''

App = Ember.Application.extend
  modulePrefix: 'fightbook-ui'        # TODO: loaded via config
  Resolver: Resolver
  customEvents: ['resize']

  # init the foundation JS
  ready: ->
    $(document).foundation()


# Make the resize method available in views
Em.Application.initializer
  name: 'doResizeInitializer'
  initialize: (container, app) ->
    app.register 'doResizeInitializer:doResize', app.constructor.doResize,
      instantiate: false
    app.inject 'view', 'doResize', 'doResizeInitializer:doResize'
    app.Session = Ember.Object.extend()
    app.register('session:current', app.Session, {singleton: true})
    app.inject('controller', 'session', 'session:current')
    app.inject('route', 'session', 'session:current')

    app.Settings = Ember.Object.extend()
    app.register('settings:current', app.Settings, {singleton: true})
    app.inject('controller', 'settings', 'settings:current')
    app.inject('route', 'settings', 'settings:current')

    app.register('updateQueue:current', Em.ArrayProxy, {singleton: true})
    app.inject('controller', 'updateQueue', 'updateQueue:current')
    app.inject('route', 'updateQueue', 'updateQueue:current')

App.responsive
  media:
    medium: "(min-width: 40.063em)"
    small: "(max-width: 40em)"

loadInitializers(App, 'fightbook-ui')

DS.RESTAdapter.reopen
  namespace: 'api'

DS.RESTSerializer.reopen
  primaryKey: '_id'

`export default App`
