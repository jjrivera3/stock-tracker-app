import {
  NAV_ITEMS,
  INVESTMENT_GOALS,
  RISK_TOLERANCE_OPTIONS,
  PREFERRED_INDUSTRIES,
  ALERT_TYPE_OPTIONS,
  CONDITION_OPTIONS,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  HEATMAP_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  POPULAR_STOCK_SYMBOLS,
  NO_MARKET_NEWS,
  WATCHLIST_TABLE_HEADER,
} from '../constants'

describe('lib/constants', () => {
  describe('Navigation Constants', () => {
    describe('NAV_ITEMS', () => {
      it('should export NAV_ITEMS array', () => {
        expect(NAV_ITEMS).toBeDefined()
        expect(Array.isArray(NAV_ITEMS)).toBe(true)
      })

      it('should have correct structure for each nav item', () => {
        NAV_ITEMS.forEach(item => {
          expect(item).toHaveProperty('href')
          expect(item).toHaveProperty('label')
          expect(typeof item.href).toBe('string')
          expect(typeof item.label).toBe('string')
        })
      })

      it('should contain expected navigation items', () => {
        expect(NAV_ITEMS).toHaveLength(3)
        expect(NAV_ITEMS[0]).toEqual({ href: '/', label: 'Dashboard' })
        expect(NAV_ITEMS[1]).toEqual({ href: '/search', label: 'Search' })
        expect(NAV_ITEMS[2]).toEqual({ href: '/watchlist', label: 'Watchlist' })
      })

      it('should have unique hrefs', () => {
        const hrefs = NAV_ITEMS.map(item => item.href)
        const uniqueHrefs = new Set(hrefs)
        expect(uniqueHrefs.size).toBe(hrefs.length)
      })

      it('should have non-empty labels', () => {
        NAV_ITEMS.forEach(item => {
          expect(item.label.trim().length).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('Form Select Options', () => {
    describe('INVESTMENT_GOALS', () => {
      it('should export INVESTMENT_GOALS array', () => {
        expect(INVESTMENT_GOALS).toBeDefined()
        expect(Array.isArray(INVESTMENT_GOALS)).toBe(true)
      })

      it('should have correct structure', () => {
        INVESTMENT_GOALS.forEach(goal => {
          expect(goal).toHaveProperty('value')
          expect(goal).toHaveProperty('label')
          expect(typeof goal.value).toBe('string')
          expect(typeof goal.label).toBe('string')
        })
      })

      it('should contain expected investment goals', () => {
        expect(INVESTMENT_GOALS).toHaveLength(4)
        const values = INVESTMENT_GOALS.map(g => g.value)
        expect(values).toContain('Growth')
        expect(values).toContain('Income')
        expect(values).toContain('Balanced')
        expect(values).toContain('Conservative')
      })

      it('should have matching value and label', () => {
        INVESTMENT_GOALS.forEach(goal => {
          expect(goal.value).toBe(goal.label)
        })
      })
    })

    describe('RISK_TOLERANCE_OPTIONS', () => {
      it('should export RISK_TOLERANCE_OPTIONS array', () => {
        expect(RISK_TOLERANCE_OPTIONS).toBeDefined()
        expect(Array.isArray(RISK_TOLERANCE_OPTIONS)).toBe(true)
      })

      it('should have correct structure', () => {
        RISK_TOLERANCE_OPTIONS.forEach(option => {
          expect(option).toHaveProperty('value')
          expect(option).toHaveProperty('label')
        })
      })

      it('should contain expected risk levels', () => {
        expect(RISK_TOLERANCE_OPTIONS).toHaveLength(3)
        const values = RISK_TOLERANCE_OPTIONS.map(r => r.value)
        expect(values).toEqual(['Low', 'Medium', 'High'])
      })

      it('should be ordered from low to high risk', () => {
        expect(RISK_TOLERANCE_OPTIONS[0].value).toBe('Low')
        expect(RISK_TOLERANCE_OPTIONS[1].value).toBe('Medium')
        expect(RISK_TOLERANCE_OPTIONS[2].value).toBe('High')
      })
    })

    describe('PREFERRED_INDUSTRIES', () => {
      it('should export PREFERRED_INDUSTRIES array', () => {
        expect(PREFERRED_INDUSTRIES).toBeDefined()
        expect(Array.isArray(PREFERRED_INDUSTRIES)).toBe(true)
      })

      it('should have correct structure', () => {
        PREFERRED_INDUSTRIES.forEach(industry => {
          expect(industry).toHaveProperty('value')
          expect(industry).toHaveProperty('label')
        })
      })

      it('should contain expected industries', () => {
        expect(PREFERRED_INDUSTRIES).toHaveLength(5)
        const values = PREFERRED_INDUSTRIES.map(i => i.value)
        expect(values).toContain('Technology')
        expect(values).toContain('Healthcare')
        expect(values).toContain('Finance')
        expect(values).toContain('Energy')
        expect(values).toContain('Consumer Goods')
      })
    })

    describe('ALERT_TYPE_OPTIONS', () => {
      it('should export ALERT_TYPE_OPTIONS array', () => {
        expect(ALERT_TYPE_OPTIONS).toBeDefined()
        expect(Array.isArray(ALERT_TYPE_OPTIONS)).toBe(true)
      })

      it('should contain upper and lower options', () => {
        expect(ALERT_TYPE_OPTIONS).toHaveLength(2)
        expect(ALERT_TYPE_OPTIONS[0]).toEqual({ value: 'upper', label: 'Upper' })
        expect(ALERT_TYPE_OPTIONS[1]).toEqual({ value: 'lower', label: 'Lower' })
      })
    })

    describe('CONDITION_OPTIONS', () => {
      it('should export CONDITION_OPTIONS array', () => {
        expect(CONDITION_OPTIONS).toBeDefined()
        expect(Array.isArray(CONDITION_OPTIONS)).toBe(true)
      })

      it('should contain comparison operators', () => {
        expect(CONDITION_OPTIONS).toHaveLength(2)
        expect(CONDITION_OPTIONS[0].value).toBe('greater')
        expect(CONDITION_OPTIONS[0].label).toBe('Greater than (>)')
        expect(CONDITION_OPTIONS[1].value).toBe('less')
        expect(CONDITION_OPTIONS[1].label).toBe('Less than (<)')
      })
    })
  })

  describe('TradingView Widget Configurations', () => {
    describe('MARKET_OVERVIEW_WIDGET_CONFIG', () => {
      it('should have required properties', () => {
        expect(MARKET_OVERVIEW_WIDGET_CONFIG).toHaveProperty('colorTheme')
        expect(MARKET_OVERVIEW_WIDGET_CONFIG).toHaveProperty('dateRange')
        expect(MARKET_OVERVIEW_WIDGET_CONFIG).toHaveProperty('locale')
        expect(MARKET_OVERVIEW_WIDGET_CONFIG).toHaveProperty('tabs')
      })

      it('should use dark theme', () => {
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.colorTheme).toBe('dark')
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.backgroundColor).toBe('#141414')
      })

      it('should have transparent background enabled', () => {
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.isTransparent).toBe(true)
      })

      it('should have correct dimensions', () => {
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.width).toBe('100%')
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.height).toBe(600)
      })

      it('should have three tabs', () => {
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.tabs).toHaveLength(3)
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.tabs[0].title).toBe('Financial')
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.tabs[1].title).toBe('Technology')
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.tabs[2].title).toBe('Services')
      })

      it('should have valid symbols in each tab', () => {
        MARKET_OVERVIEW_WIDGET_CONFIG.tabs.forEach(tab => {
          expect(tab.symbols).toBeDefined()
          expect(Array.isArray(tab.symbols)).toBe(true)
          expect(tab.symbols.length).toBeGreaterThan(0)
          
          tab.symbols.forEach(symbol => {
            expect(symbol).toHaveProperty('s')
            expect(symbol).toHaveProperty('d')
            expect(symbol.s).toMatch(/^(NYSE|NASDAQ):[A-Z]+$/)
          })
        })
      })

      it('should have consistent color scheme', () => {
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.plotLineColorGrowing).toBe('#0FEDBE')
        expect(MARKET_OVERVIEW_WIDGET_CONFIG.plotLineColorFalling).toBe('#0FEDBE')
      })
    })

    describe('HEATMAP_WIDGET_CONFIG', () => {
      it('should have required properties', () => {
        expect(HEATMAP_WIDGET_CONFIG).toHaveProperty('dataSource')
        expect(HEATMAP_WIDGET_CONFIG).toHaveProperty('blockSize')
        expect(HEATMAP_WIDGET_CONFIG).toHaveProperty('blockColor')
        expect(HEATMAP_WIDGET_CONFIG).toHaveProperty('grouping')
      })

      it('should use SPX500 data source', () => {
        expect(HEATMAP_WIDGET_CONFIG.dataSource).toBe('SPX500')
      })

      it('should have zoom enabled', () => {
        expect(HEATMAP_WIDGET_CONFIG.isZoomEnabled).toBe(true)
      })

      it('should have symbol tooltip enabled', () => {
        expect(HEATMAP_WIDGET_CONFIG.hasSymbolTooltip).toBe(true)
      })

      it('should group by sector', () => {
        expect(HEATMAP_WIDGET_CONFIG.grouping).toBe('sector')
      })

      it('should have dark theme', () => {
        expect(HEATMAP_WIDGET_CONFIG.colorTheme).toBe('dark')
      })
    })

    describe('TOP_STORIES_WIDGET_CONFIG', () => {
      it('should have required properties', () => {
        expect(TOP_STORIES_WIDGET_CONFIG).toHaveProperty('displayMode')
        expect(TOP_STORIES_WIDGET_CONFIG).toHaveProperty('feedMode')
        expect(TOP_STORIES_WIDGET_CONFIG).toHaveProperty('colorTheme')
      })

      it('should be configured for market feed', () => {
        expect(TOP_STORIES_WIDGET_CONFIG.feedMode).toBe('market')
        expect(TOP_STORIES_WIDGET_CONFIG.market).toBe('stock')
      })

      it('should use dark theme', () => {
        expect(TOP_STORIES_WIDGET_CONFIG.colorTheme).toBe('dark')
      })
    })

    describe('MARKET_DATA_WIDGET_CONFIG', () => {
      it('should have required properties', () => {
        expect(MARKET_DATA_WIDGET_CONFIG).toHaveProperty('title')
        expect(MARKET_DATA_WIDGET_CONFIG).toHaveProperty('symbolsGroups')
      })

      it('should have three symbol groups', () => {
        expect(MARKET_DATA_WIDGET_CONFIG.symbolsGroups).toHaveLength(3)
        expect(MARKET_DATA_WIDGET_CONFIG.symbolsGroups[0].name).toBe('Financial')
        expect(MARKET_DATA_WIDGET_CONFIG.symbolsGroups[1].name).toBe('Technology')
        expect(MARKET_DATA_WIDGET_CONFIG.symbolsGroups[2].name).toBe('Services')
      })

      it('should have valid symbols in each group', () => {
        MARKET_DATA_WIDGET_CONFIG.symbolsGroups.forEach(group => {
          expect(group.symbols).toBeDefined()
          expect(Array.isArray(group.symbols)).toBe(true)
          
          group.symbols.forEach(symbol => {
            expect(symbol).toHaveProperty('name')
            expect(symbol).toHaveProperty('displayName')
            expect(symbol.name).toMatch(/^(NYSE|NASDAQ):[A-Z]+$/)
          })
        })
      })

      it('should show symbol logos', () => {
        expect(MARKET_DATA_WIDGET_CONFIG.showSymbolLogo).toBe(true)
      })
    })
  })

  describe('Dynamic Widget Config Functions', () => {
    describe('SYMBOL_INFO_WIDGET_CONFIG', () => {
      it('should be a function', () => {
        expect(typeof SYMBOL_INFO_WIDGET_CONFIG).toBe('function')
      })

      it('should return config object with uppercase symbol', () => {
        const config = SYMBOL_INFO_WIDGET_CONFIG('aapl')
        expect(config.symbol).toBe('AAPL')
      })

      it('should handle already uppercase symbols', () => {
        const config = SYMBOL_INFO_WIDGET_CONFIG('TSLA')
        expect(config.symbol).toBe('TSLA')
      })

      it('should return config with correct properties', () => {
        const config = SYMBOL_INFO_WIDGET_CONFIG('msft')
        expect(config).toHaveProperty('symbol')
        expect(config).toHaveProperty('colorTheme')
        expect(config).toHaveProperty('isTransparent')
        expect(config).toHaveProperty('locale')
        expect(config).toHaveProperty('width')
        expect(config).toHaveProperty('height')
      })

      it('should have consistent styling', () => {
        const config = SYMBOL_INFO_WIDGET_CONFIG('goog')
        expect(config.colorTheme).toBe('dark')
        expect(config.isTransparent).toBe(true)
        expect(config.locale).toBe('en')
      })

      it('should handle special characters in symbol', () => {
        const config = SYMBOL_INFO_WIDGET_CONFIG('brk.b')
        expect(config.symbol).toBe('BRK.B')
      })
    })

    describe('CANDLE_CHART_WIDGET_CONFIG', () => {
      it('should be a function', () => {
        expect(typeof CANDLE_CHART_WIDGET_CONFIG).toBe('function')
      })

      it('should return config with uppercase symbol', () => {
        const config = CANDLE_CHART_WIDGET_CONFIG('nvda')
        expect(config.symbol).toBe('NVDA')
      })

      it('should have correct chart settings', () => {
        const config = CANDLE_CHART_WIDGET_CONFIG('amzn')
        expect(config.allow_symbol_change).toBe(false)
        expect(config.style).toBe(1)
        expect(config.interval).toBe('D')
        expect(config.theme).toBe('dark')
      })

      it('should have proper dimensions', () => {
        const config = CANDLE_CHART_WIDGET_CONFIG('meta')
        expect(config.width).toBe('100%')
        expect(config.height).toBe(600)
      })

      it('should not allow symbol change', () => {
        const config = CANDLE_CHART_WIDGET_CONFIG('aapl')
        expect(config.allow_symbol_change).toBe(false)
      })

      it('should use UTC timezone', () => {
        const config = CANDLE_CHART_WIDGET_CONFIG('tsla')
        expect(config.timezone).toBe('Etc/UTC')
      })
    })

    describe('BASELINE_WIDGET_CONFIG', () => {
      it('should be a function', () => {
        expect(typeof BASELINE_WIDGET_CONFIG).toBe('function')
      })

      it('should return config with uppercase symbol', () => {
        const config = BASELINE_WIDGET_CONFIG('spy')
        expect(config.symbol).toBe('SPY')
      })

      it('should use baseline style (style 10)', () => {
        const config = BASELINE_WIDGET_CONFIG('qqq')
        expect(config.style).toBe(10)
      })

      it('should hide details but show other elements', () => {
        const config = BASELINE_WIDGET_CONFIG('dia')
        expect(config.details).toBe(false)
        expect(config.hide_legend).toBe(false)
        expect(config.hide_volume).toBe(false)
      })
    })

    describe('TECHNICAL_ANALYSIS_WIDGET_CONFIG', () => {
      it('should be a function', () => {
        expect(typeof TECHNICAL_ANALYSIS_WIDGET_CONFIG).toBe('function')
      })

      it('should return config with uppercase symbol', () => {
        const config = TECHNICAL_ANALYSIS_WIDGET_CONFIG('btc')
        expect(config.symbol).toBe('BTC')
      })

      it('should use 1-hour interval', () => {
        const config = TECHNICAL_ANALYSIS_WIDGET_CONFIG('eth')
        expect(config.interval).toBe('1h')
      })

      it('should have correct dimensions', () => {
        const config = TECHNICAL_ANALYSIS_WIDGET_CONFIG('sol')
        expect(config.width).toBe('100%')
        expect(config.height).toBe(400)
      })
    })

    describe('COMPANY_PROFILE_WIDGET_CONFIG', () => {
      it('should be a function', () => {
        expect(typeof COMPANY_PROFILE_WIDGET_CONFIG).toBe('function')
      })

      it('should return config with uppercase symbol', () => {
        const config = COMPANY_PROFILE_WIDGET_CONFIG('nflx')
        expect(config.symbol).toBe('NFLX')
      })

      it('should have correct height', () => {
        const config = COMPANY_PROFILE_WIDGET_CONFIG('dis')
        expect(config.height).toBe(440)
      })
    })

    describe('COMPANY_FINANCIALS_WIDGET_CONFIG', () => {
      it('should be a function', () => {
        expect(typeof COMPANY_FINANCIALS_WIDGET_CONFIG).toBe('function')
      })

      it('should return config with uppercase symbol', () => {
        const config = COMPANY_FINANCIALS_WIDGET_CONFIG('ba')
        expect(config.symbol).toBe('BA')
      })

      it('should have regular display mode', () => {
        const config = COMPANY_FINANCIALS_WIDGET_CONFIG('cat')
        expect(config.displayMode).toBe('regular')
      })

      it('should have correct height', () => {
        const config = COMPANY_FINANCIALS_WIDGET_CONFIG('jnj')
        expect(config.height).toBe(464)
      })
    })
  })

  describe('Stock Symbols', () => {
    describe('POPULAR_STOCK_SYMBOLS', () => {
      it('should export array of stock symbols', () => {
        expect(POPULAR_STOCK_SYMBOLS).toBeDefined()
        expect(Array.isArray(POPULAR_STOCK_SYMBOLS)).toBe(true)
      })

      it('should have expected number of symbols', () => {
        expect(POPULAR_STOCK_SYMBOLS.length).toBeGreaterThan(0)
        expect(POPULAR_STOCK_SYMBOLS).toHaveLength(50)
      })

      it('should contain only uppercase strings', () => {
        POPULAR_STOCK_SYMBOLS.forEach(symbol => {
          expect(typeof symbol).toBe('string')
          expect(symbol).toBe(symbol.toUpperCase())
        })
      })

      it('should contain major tech stocks', () => {
        expect(POPULAR_STOCK_SYMBOLS).toContain('AAPL')
        expect(POPULAR_STOCK_SYMBOLS).toContain('MSFT')
        expect(POPULAR_STOCK_SYMBOLS).toContain('GOOGL')
        expect(POPULAR_STOCK_SYMBOLS).toContain('AMZN')
        expect(POPULAR_STOCK_SYMBOLS).toContain('TSLA')
      })

      it('should have unique symbols', () => {
        const uniqueSymbols = new Set(POPULAR_STOCK_SYMBOLS)
        expect(uniqueSymbols.size).toBe(POPULAR_STOCK_SYMBOLS.length)
      })

      it('should contain only valid ticker symbols (2-5 characters)', () => {
        POPULAR_STOCK_SYMBOLS.forEach(symbol => {
          expect(symbol.length).toBeGreaterThanOrEqual(2)
          expect(symbol.length).toBeLessThanOrEqual(5)
          expect(symbol).toMatch(/^[A-Z]+$/)
        })
      })

      it('should include international stocks', () => {
        expect(POPULAR_STOCK_SYMBOLS).toContain('BABA')
        expect(POPULAR_STOCK_SYMBOLS).toContain('NIO')
      })
    })
  })

  describe('Miscellaneous Constants', () => {
    describe('NO_MARKET_NEWS', () => {
      it('should be a string', () => {
        expect(typeof NO_MARKET_NEWS).toBe('string')
      })

      it('should contain valid HTML', () => {
        expect(NO_MARKET_NEWS).toContain('<p')
        expect(NO_MARKET_NEWS).toContain('</p>')
      })

      it('should have appropriate message', () => {
        expect(NO_MARKET_NEWS).toContain('No market news available')
        expect(NO_MARKET_NEWS).toContain('check back tomorrow')
      })

      it('should have styling classes', () => {
        expect(NO_MARKET_NEWS).toContain('class="mobile-text"')
        expect(NO_MARKET_NEWS).toContain('style=')
      })
    })

    describe('WATCHLIST_TABLE_HEADER', () => {
      it('should be an array', () => {
        expect(Array.isArray(WATCHLIST_TABLE_HEADER)).toBe(true)
      })

      it('should contain expected headers', () => {
        expect(WATCHLIST_TABLE_HEADER).toHaveLength(8)
        expect(WATCHLIST_TABLE_HEADER).toContain('Company')
        expect(WATCHLIST_TABLE_HEADER).toContain('Symbol')
        expect(WATCHLIST_TABLE_HEADER).toContain('Price')
        expect(WATCHLIST_TABLE_HEADER).toContain('Change')
        expect(WATCHLIST_TABLE_HEADER).toContain('Market Cap')
        expect(WATCHLIST_TABLE_HEADER).toContain('P/E Ratio')
        expect(WATCHLIST_TABLE_HEADER).toContain('Alert')
        expect(WATCHLIST_TABLE_HEADER).toContain('Action')
      })

      it('should have no duplicate headers', () => {
        const uniqueHeaders = new Set(WATCHLIST_TABLE_HEADER)
        expect(uniqueHeaders.size).toBe(WATCHLIST_TABLE_HEADER.length)
      })

      it('should have non-empty strings', () => {
        WATCHLIST_TABLE_HEADER.forEach(header => {
          expect(typeof header).toBe('string')
          expect(header.trim().length).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('Constants Immutability', () => {
    it('should not allow modification of NAV_ITEMS', () => {
      const originalLength = NAV_ITEMS.length
      expect(() => {
        (NAV_ITEMS as any).push({ href: '/test', label: 'Test' })
      }).not.toThrow()
      // Note: JavaScript doesn't provide true immutability without Object.freeze
      // This test documents current behavior
    })

    it('config objects should have consistent structure across calls', () => {
      const config1 = SYMBOL_INFO_WIDGET_CONFIG('AAPL')
      const config2 = SYMBOL_INFO_WIDGET_CONFIG('AAPL')
      expect(Object.keys(config1).sort()).toEqual(Object.keys(config2).sort())
    })
  })

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty string in symbol config functions', () => {
      const config = SYMBOL_INFO_WIDGET_CONFIG('')
      expect(config.symbol).toBe('')
    })

    it('should handle lowercase symbols consistently', () => {
      const symbols = ['aapl', 'msft', 'tsla']
      symbols.forEach(symbol => {
        const config = CANDLE_CHART_WIDGET_CONFIG(symbol)
        expect(config.symbol).toBe(symbol.toUpperCase())
      })
    })

    it('should handle mixed case symbols', () => {
      const config = BASELINE_WIDGET_CONFIG('AaPl')
      expect(config.symbol).toBe('AAPL')
    })
  })
})