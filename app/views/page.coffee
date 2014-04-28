PageView = Em.View.extend
  didInsertElement: ->
    view = @
    dbContext =
      name: 'debouncePageResize'
    doResize = =>
      $dzOuter = view.$().find('.dz-outer')
      $innerWrap = $('.inner-wrap')
      $dzOuter.height $innerWrap.height()-85

    Em.run.scheduleOnce 'afterRender', =>
      doResize()

      $(window).on 'resize', =>
        Em.run.debounce dbContext, doResize, 200

`export default PageView`