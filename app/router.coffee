`import Ember from 'ember'`;

Router = Ember.Router.extend
  location: FbENV.locationType

Router.map ->
  @route 'signin'
  @route 'signout'
  @resource 'treatises', path: '/t', ->
    @route 'index', path: '/'
    @resource 'treatise', path: ':treatise_key', ->
      @resource 'page', path: '/:page_id', ->
        @route 'section', path: '/sec/:sort_order'

`export default Router`
