`import BaseRoute from './_base'`

Route = BaseRoute.extend
  title: 'Sign in'
  beforeModel: ->
    unless @get 'session.isAnon'
      @transitionTo 'treatises'
  model: ->
    Ember.Object.create()

`export default Route`
