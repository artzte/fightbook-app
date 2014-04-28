Component = Ember.Component.extend
  classNameBindings: 'isActive'
  tagName: 'li'

  isActive: (->
      'active' if @get('section') is @get('current-section')
    ).property('section', 'current-section')

  iconClass: (->
      "icon-" + switch @get 'section.sortOrder'
        when 1
          'top-left'
        when 2
          'top-right'
        when 3
          'bottom-left'
        when 4
          'bottom-right'
        else
          'bottom-right'
    ).property('section.sortOrder')

  actions: 
    select: ->
      if @get 'isActive' 
        @sendAction 'sdBounds', @get('section.bounds')
      else
        $(@get('element')).find('a:first-child').click()


`export default Component`