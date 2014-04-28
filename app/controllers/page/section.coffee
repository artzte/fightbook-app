Controller = Ember.ObjectController.extend
  needs: ['page']

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
