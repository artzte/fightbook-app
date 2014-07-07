# via Jonathon Evans / http://jrhe.co.uk/setting-the-document-title-in-ember-js-apps/

Mixin = Ember.Mixin.create
  actions:
    _setupTitle: ->
      title = @get 'title'
      if title
        document.title = FbENV.APP.title.concat(" - ", title)
      else
        document.title = FbENV.APP.title
        return true
    didTransition: ->
      this.send '_setupTitle'

`export default Mixin`

