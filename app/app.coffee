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

App.responsive
  media:
    medium: "(min-width: 40.063em)"
    small: "(max-width: 40em)"

DS.RESTAdapter.reopen
  namespace: 'api'

DS.RESTSerializer.reopen
  primaryKey: '_id'


`export default App`
