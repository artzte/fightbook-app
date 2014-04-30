PageView = Em.View.extend
  didInsertElement: ->
    view = @
    dbContext =
      name: 'debouncePageResize'
    doResize = =>
      $innerWrap = $('.inner-wrap')
      headerHeight = $('nav').height() + $('header').height()
      height = $innerWrap.height() - headerHeight
      $('.size-to').height height
    Em.run.scheduleOnce 'afterRender', =>
      doResize()

      $(window).on 'resize', =>
        Em.run.debounce dbContext, doResize, 200

`export default PageView`