`import Resolver from 'resolver'`

App = Ember.Application.extend
  LOG_ACTIVE_GENERATION: true
  LOG_MODULE_RESOLVER: true
  LOG_TRANSITIONS: true
  LOG_TRANSITIONS_INTERNAL: true
  LOG_VIEW_LOOKUPS: true
  modulePrefix: 'appkit' # TODO: loaded via config
  Resolver: Resolver['default']
  customEvents: ['resize']

  # init the foundation JS
  ready: ->
    $(document).foundation()

DS.RESTAdapter.reopen
  namespace: 'api'

DS.RESTSerializer.reopen
  primaryKey: '_id'

`export default App`
