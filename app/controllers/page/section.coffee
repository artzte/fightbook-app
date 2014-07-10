Controller = Ember.ObjectController.extend
  needs: ['page']

  adminEditLink: (->
    FbENV.APP.keystonePath + "/sections/#{@get('id')}"
  ).property('content.id')

  actions:
    setActive: ->
      @content.get('page.sections')
        .setEach('isActive', false)
      @content.toggleProperty 'isActive'
      false

    getBounds: ->
      @set 'bounds', @get('controllers.page.sdBounds')
      false

    saveBounds: ->
      section = @get 'content'
      section.set 'bounds', @get('controllers.page.sdBounds')
      section.save()
      false

`export default Controller`
