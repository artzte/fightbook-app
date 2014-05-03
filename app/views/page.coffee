PageView = Em.View.extend
  didInsertElement: ->
    view = @
    dbContext =
      name: 'debouncePageResize'
    doResize = =>
      $innerWrap = $('.inner-wrap')
      headerHeight = $('nav').height() + $('header').height()
      height = $innerWrap.height() - headerHeight

      # always set .dz-outer, the seadragon container, to the height
      $('.dz-outer').height height

      # the section column is only set to height if we are in the medium
      # media query - this is a hard value from _foundation_default.scss
      if @get 'media.isMedium'
        $('.section-column').height height
      else
        $('.section-column').css 'height', ''

    Em.run.scheduleOnce 'afterRender', =>
      doResize()

      $(window).on 'resize', =>
        Em.run.debounce dbContext, doResize, 200

`export default PageView`