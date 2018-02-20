import reducer from './'

describe('checkout reduceres', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      disableFooterButton: true,
      pageInfo: {},
      screenSize: {
        isBigScreen: true,
      },
      showFooterButton: true,
    })
  })

  it('should handle CHANGE_SCREEN_SIZE', () => {
    expect(
      reducer({}, {
        type: 'CHANGE_SCREEN_SIZE',
        size: 500,
      })
    ).toHaveProperty('screenSize', {
      isBigScreen: false,
    })

    expect(
      reducer({}, {
        type: 'CHANGE_SCREEN_SIZE',
        size: 1000,
      })
    ).toHaveProperty('screenSize', {
      isBigScreen: true,
    })
  })

  it('should handle ADD_PAGE_INFO', () => {
    expect(
      reducer({}, {
        type: 'ADD_PAGE_INFO',
        payload: {
          page: 'main_page',
          pageInfo: {
            isCheckout: true,
            haveAnAwesomeTeam: true,
          },
        },
      })
    ).toHaveProperty('pageInfo', {
      main_page: {
        isCheckout: true,
        haveAnAwesomeTeam: true,
      },
    })

    expect(
      reducer({
        pageInfo: {
          main_page: {
            isCheckout: true,
            haveAnAwesomeTeam: true,
          },
        },
      }, {
        type: 'ADD_PAGE_INFO',
        payload: {
          page: 'second_page',
          pageInfo: {
            currentPage: 2,
            ruleThemAll: true,
          },
        },
      })
    ).toHaveProperty('pageInfo', {
      main_page: {
        isCheckout: true,
        haveAnAwesomeTeam: true,
      },
      second_page: {
        currentPage: 2,
        ruleThemAll: true,
      },
    })

    expect(
      reducer({}, {
        type: 'ADD_PAGE_INFO',
      })
    ).toHaveProperty('pageInfo', {})

    expect(
      reducer({
        pageInfo: {
          defaultPage: 'just a test',
        },
      }, {
        type: 'ADD_PAGE_INFO',
      })
    ).toHaveProperty('pageInfo', {
      defaultPage: 'just a test',
    })
  })

  it('should handle SHOW_FOOTER_BUTTON', () => {
    expect(
      reducer({}, {
        type: 'SHOW_FOOTER_BUTTON',
        isVisible: true,
      })
    ).toHaveProperty('showFooterButton', true)

    expect(
      reducer({
        showFooterButton: false,
      }, {
        type: 'SHOW_FOOTER_BUTTON',
      })
    ).toHaveProperty('showFooterButton', false)

    expect(
      reducer({}, {
        type: 'SHOW_FOOTER_BUTTON',
      })
    ).toHaveProperty('showFooterButton', true)
  })
})
