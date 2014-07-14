`import BaseRoute from './_base'`
`import ajax from 'ic-ajax'`

Route = BaseRoute.extend
  model: ->
    mePath = '/api/me'

    # return the current user as the model if authenticated, otherwise a blank object
    new Ember.RSVP.Promise (resolve, reject) =>
      ajax
          url: mePath
          dataType: 'json'
        .then (result) =>
            user = Ember.Object.create(result)
            if result.isAnon
              @set 'session.isAnon', true
              @set 'session.currentUser', null
            else
              @set 'session.isAnon', false
              @set 'session.currentUser', user
              ajax
                url: mePath
                method: 'post'
            resolve(user)
          ,
            (result) ->
              reject()
  clearSession: ->
    @set 'session.currentUser', undefined
    @set 'session.isAnon', true
    @set 'settings.editMode', false
  actions:
    toggleEditMode: ->
      @toggleProperty 'settings.editMode'
      @send 'flushUpdateQueue'
    flushUpdateQueue: ->
      return unless @get('session.currentUser.isAdmin')
      updateQueue = @get('updateQueue')
      while updateQueue.get('length')
        section = updateQueue.popObject()
        section.save()
    error: (result, transition) ->
      if result.status is 403
        @clearSession()
        @transitionTo 'signout'
        return false
      else
        return true
`export default Route`
