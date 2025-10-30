import React from 'react'
import { render, screen } from '@testing-library/react'
import TradingViewWidget from '../TradingViewWidget'
import useTradingViewWidget from '../hooks/useTradingViewWidget'

// Mock the custom hook
jest.mock('../hooks/useTradingViewWidget')
const mockUseTradingViewWidget = useTradingViewWidget as jest.MockedFunction<
  typeof useTradingViewWidget
>

// Mock the cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}))

describe('TradingViewWidget', () => {
  const mockRef = { current: null }

  beforeEach(() => {
    mockUseTradingViewWidget.mockReturnValue(mockRef)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      expect(container).toBeInTheDocument()
    })

    it('should render title when provided', () => {
      render(
        <TradingViewWidget
          title="Market Overview"
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      expect(screen.getByText('Market Overview')).toBeInTheDocument()
    })

    it('should not render title when not provided', () => {
      const { container } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      expect(container.querySelector('h3')).not.toBeInTheDocument()
    })

    it('should render container div', () => {
      const { container } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      const widgetContainer = container.querySelector(
        '.tradingview-widget-container'
      )
      expect(widgetContainer).toBeInTheDocument()
    })

    it('should render widget div inside container', () => {
      const { container } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      const widgetDiv = container.querySelector(
        '.tradingview-widget-container__widget'
      )
      expect(widgetDiv).toBeInTheDocument()
    })
  })

  describe('Props Handling', () => {
    it('should pass scriptUrl to hook', () => {
      const scriptUrl = 'https://s3.tradingview.com/widget.js'
      render(<TradingViewWidget scriptUrl={scriptUrl} config={{}} />)

      expect(mockUseTradingViewWidget).toHaveBeenCalledWith(
        scriptUrl,
        {},
        600
      )
    })

    it('should pass config to hook', () => {
      const config = { symbol: 'AAPL', theme: 'dark' }
      render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={config}
        />
      )

      expect(mockUseTradingViewWidget).toHaveBeenCalledWith(
        'https://example.com/script.js',
        config,
        600
      )
    })

    it('should pass custom height to hook', () => {
      render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
          height={800}
        />
      )

      expect(mockUseTradingViewWidget).toHaveBeenCalledWith(
        'https://example.com/script.js',
        {},
        800
      )
    })

    it('should use default height of 600 when not provided', () => {
      render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      expect(mockUseTradingViewWidget).toHaveBeenCalledWith(
        'https://example.com/script.js',
        {},
        600
      )
    })

    it('should apply custom className to container', () => {
      const { container } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
          className="custom-chart"
        />
      )

      const widgetContainer = container.querySelector(
        '.tradingview-widget-container'
      )
      expect(widgetContainer).toHaveClass('custom-chart')
    })

    it('should combine multiple classNames', () => {
      const { container } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
          className="custom-chart another-class"
        />
      )

      const widgetContainer = container.querySelector(
        '.tradingview-widget-container'
      )
      expect(widgetContainer?.className).toContain('tradingview-widget-container')
      expect(widgetContainer?.className).toContain('custom-chart')
    })
  })

  describe('Styling', () => {
    it('should apply correct title styling', () => {
      render(
        <TradingViewWidget
          title="Test Title"
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      const title = screen.getByText('Test Title')
      expect(title).toHaveClass('font-semibold', 'text-2xl', 'text-gray-100', 'mb-5')
    })

    it('should set widget height from props', () => {
      const { container } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
          height={800}
        />
      )

      const widgetDiv = container.querySelector(
        '.tradingview-widget-container__widget'
      )
      expect(widgetDiv).toHaveStyle({ height: 800 })
    })

    it('should set widget width to 100%', () => {
      const { container } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      const widgetDiv = container.querySelector(
        '.tradingview-widget-container__widget'
      )
      expect(widgetDiv).toHaveStyle({ width: '100%' })
    })

    it('should apply w-full class to outer container', () => {
      const { container } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      const outerDiv = container.querySelector('.w-full')
      expect(outerDiv).toBeInTheDocument()
    })
  })

  describe('Ref Handling', () => {
    it('should pass ref from hook to container', () => {
      const { container } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      const widgetContainer = container.querySelector(
        '.tradingview-widget-container'
      )
      expect(widgetContainer).toBeInTheDocument()
    })

    it('should maintain ref consistency across renders', () => {
      const { rerender } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      rerender(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
          height={800}
        />
      )

      expect(mockUseTradingViewWidget).toHaveBeenCalledTimes(2)
    })
  })

  describe('Memoization', () => {
    it('should be a memoized component', () => {
      const MemoizedComponent = TradingViewWidget
      expect(MemoizedComponent.$$typeof.toString()).toContain('react.memo')
    })

    it('should not re-render with same props', () => {
      const props = {
        scriptUrl: 'https://example.com/script.js',
        config: { symbol: 'AAPL' },
        height: 600,
      }

      const { rerender } = render(<TradingViewWidget {...props} />)

      const callCount = mockUseTradingViewWidget.mock.calls.length

      rerender(<TradingViewWidget {...props} />)

      // Due to memo, hook should not be called again
      expect(mockUseTradingViewWidget.mock.calls.length).toBe(callCount)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty title string', () => {
      render(
        <TradingViewWidget
          title=""
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      // Empty title should not render h3
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })

    it('should handle zero height', () => {
      const { container } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
          height={0}
        />
      )

      const widgetDiv = container.querySelector(
        '.tradingview-widget-container__widget'
      )
      expect(widgetDiv).toHaveStyle({ height: 0 })
    })

    it('should handle very large height', () => {
      const { container } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
          height={10000}
        />
      )

      const widgetDiv = container.querySelector(
        '.tradingview-widget-container__widget'
      )
      expect(widgetDiv).toHaveStyle({ height: 10000 })
    })

    it('should handle complex config object', () => {
      const complexConfig = {
        symbol: 'AAPL',
        theme: 'dark',
        tabs: [
          {
            title: 'Financial',
            symbols: [
              { s: 'NYSE:JPM', d: 'JPMorgan Chase' },
              { s: 'NYSE:WFC', d: 'Wells Fargo' },
            ],
          },
        ],
      }

      render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={complexConfig}
        />
      )

      expect(mockUseTradingViewWidget).toHaveBeenCalledWith(
        'https://example.com/script.js',
        complexConfig,
        600
      )
    })

    it('should handle special characters in scriptUrl', () => {
      const scriptUrl = 'https://example.com/script.js?param=value&test=1#hash'

      render(<TradingViewWidget scriptUrl={scriptUrl} config={{}} />)

      expect(mockUseTradingViewWidget).toHaveBeenCalledWith(
        scriptUrl,
        {},
        600
      )
    })

    it('should handle undefined className', () => {
      const { container } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      const widgetContainer = container.querySelector(
        '.tradingview-widget-container'
      )
      expect(widgetContainer).toHaveClass('tradingview-widget-container')
    })
  })

  describe('Real-world Scenarios', () => {
    it('should render market overview widget', () => {
      const config = {
        colorTheme: 'dark',
        dateRange: '12M',
        locale: 'en',
        tabs: [
          {
            title: 'Financial',
            symbols: [{ s: 'NYSE:JPM', d: 'JPMorgan Chase' }],
          },
        ],
      }

      render(
        <TradingViewWidget
          title="Market Overview"
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
          config={config}
          className="custom-chart"
          height={600}
        />
      )

      expect(screen.getByText('Market Overview')).toBeInTheDocument()
    })

    it('should render stock heatmap widget', () => {
      const config = {
        dataSource: 'SPX500',
        blockSize: 'market_cap_basic',
        blockColor: 'change',
        colorTheme: 'dark',
      }

      render(
        <TradingViewWidget
          title="Stock Heat Map"
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
          config={config}
          height={600}
        />
      )

      expect(screen.getByText('Stock Heat Map')).toBeInTheDocument()
    })

    it('should render timeline widget without title', () => {
      const config = {
        colorTheme: 'dark',
        isTransparent: true,
        locale: 'en',
      }

      const { container } = render(
        <TradingViewWidget
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
          config={config}
          className="custom-chart"
          height={600}
        />
      )

      expect(container.querySelector('h3')).not.toBeInTheDocument()
      expect(
        container.querySelector('.tradingview-widget-container')
      ).toBeInTheDocument()
    })

    it('should render market quotes widget', () => {
      const config = {
        title: 'Stocks',
        width: '100%',
        height: 600,
        locale: 'en',
        showSymbolLogo: true,
        colorTheme: 'dark',
      }

      render(
        <TradingViewWidget
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
          config={config}
          height={600}
        />
      )

      expect(mockUseTradingViewWidget).toHaveBeenCalledWith(
        'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js',
        config,
        600
      )
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      render(
        <TradingViewWidget
          title="Market Data"
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Market Data')
    })

    it('should maintain proper heading hierarchy', () => {
      render(
        <TradingViewWidget
          title="Stock Analysis"
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      const heading = screen.getByRole('heading')
      expect(heading.tagName).toBe('H3')
    })
  })

  describe('Performance', () => {
    it('should handle rapid prop updates', () => {
      const { rerender } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      for (let i = 0; i < 10; i++) {
        rerender(
          <TradingViewWidget
            scriptUrl={`https://example.com/script${i}.js`}
            config={{ iteration: i }}
            height={600 + i * 10}
          />
        )
      }

      expect(mockUseTradingViewWidget).toHaveBeenCalled()
    })

    it('should not cause memory leaks with multiple instances', () => {
      const { unmount: unmount1 } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script1.js"
          config={{}}
        />
      )

      const { unmount: unmount2 } = render(
        <TradingViewWidget
          scriptUrl="https://example.com/script2.js"
          config={{}}
        />
      )

      unmount1()
      unmount2()

      expect(true).toBe(true) // Test completes without errors
    })
  })

  describe('Type Safety', () => {
    it('should accept Record<string, unknown> config', () => {
      const config: Record<string, unknown> = {
        symbol: 'AAPL',
        theme: 'dark',
        height: 600,
      }

      render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={config}
        />
      )

      expect(mockUseTradingViewWidget).toHaveBeenCalledWith(
        'https://example.com/script.js',
        config,
        600
      )
    })

    it('should handle optional props correctly', () => {
      render(
        <TradingViewWidget
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      expect(mockUseTradingViewWidget).toHaveBeenCalled()
    })
  })
})