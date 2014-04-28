Router = Ember.Router.extend()

Router.map ->
  @route 'component-test'
  @route 'helper-test'
  @resource 'treatises', path: '/t', ->
    @route 'index', path: '/'
    @resource 'treatise', path: ':treatise_key', ->
      @resource 'page', path: '/:page_id', ->
        @route 'section', path: ':section_id'

`export default Router`