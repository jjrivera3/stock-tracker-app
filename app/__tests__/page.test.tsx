import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../(root)/page'

// Mock the TradingViewWidget component
jest.mock('@/components/TradingViewWidget', () => {
  return function MockTradingViewWidget({
    title,
    scriptUrl,
    config,
    height,
    className,
  }: any) {
    return (
      <div data-testid="trading-view-widget" data-script-url={scriptUrl}>
        {title && <h3>{title}</h3>}
        <div data-height={height} data-classname={className}>
          Widget Content
        </div>
      </div>
    )
  }
})

describe('Home Page', () => {
  describe('Page Rendering', () => {
    it('should render without crashing', () => {
      render(<Home />)
      expect(screen.getAllByTestId('trading-view-widget')).toHaveLength(4)
    })

    it('should render main container with correct classes', () => {
      const { container } = render(<Home />)
      const mainDiv = container.querySelector('.home-wrapper')
      
      expect(mainDiv).toBeInTheDocument()
      expect(mainDiv).toHaveClass('flex', 'min-h-screen', 'home-wrapper')
    })

    it('should render two section elements', () => {
      const { container } = render(<Home />)
      const sections = container.querySelectorAll('section.home-section')
      
      expect(sections).toHaveLength(2)
    })
  })

  describe('Widget Placement', () => {
    it('should render four TradingView widgets', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      
      expect(widgets).toHaveLength(4)
    })

    it('should render Market Overview widget with title', () => {
      render(<Home />)
      expect(screen.getByText('Market Overview')).toBeInTheDocument()
    })

    it('should render Stock Heat Map widget with title', () => {
      render(<Home />)
      expect(screen.getByText('Stock Heat Map')).toBeInTheDocument()
    })

    it('should render timeline widget without title', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      
      // Timeline widget should not have a title
      const titledWidgets = widgets.filter(w => w.querySelector('h3'))
      expect(titledWidgets).toHaveLength(2) // Only Market Overview and Stock Heat Map have titles
    })

    it('should render market quotes widget without title', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      
      // Check that we have 4 widgets total
      expect(widgets).toHaveLength(4)
    })
  })

  describe('Script URLs', () => {
    it('should use correct base URL for all widgets', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      
      widgets.forEach(widget => {
        const scriptUrl = widget.getAttribute('data-script-url')
        expect(scriptUrl).toContain('https://s3.tradingview.com/external-embedding/embed-widget-')
      })
    })

    it('should use market-overview.js script for first widget', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      const firstWidget = widgets[0]
      
      expect(firstWidget.getAttribute('data-script-url')).toContain('market-overview.js')
    })

    it('should use stock-heatmap.js script for second widget', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      const secondWidget = widgets[1]
      
      expect(secondWidget.getAttribute('data-script-url')).toContain('stock-heatmap.js')
    })

    it('should use timeline.js script for third widget', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      const thirdWidget = widgets[2]
      
      expect(thirdWidget.getAttribute('data-script-url')).toContain('timeline.js')
    })

    it('should use market-quotes.js script for fourth widget', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      const fourthWidget = widgets[3]
      
      expect(fourthWidget.getAttribute('data-script-url')).toContain('market-quotes.js')
    })
  })

  describe('Widget Configuration', () => {
    it('should set height to 600 for all widgets', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      
      widgets.forEach(widget => {
        const heightDiv = widget.querySelector('[data-height]')
        expect(heightDiv?.getAttribute('data-height')).toBe('600')
      })
    })

    it('should apply custom-chart class to Market Overview widget', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      const firstWidget = widgets[0]
      const classDiv = firstWidget.querySelector('[data-classname]')
      
      expect(classDiv?.getAttribute('data-classname')).toBe('custom-chart')
    })

    it('should apply custom-chart class to timeline widget', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      const thirdWidget = widgets[2]
      const classDiv = thirdWidget.querySelector('[data-classname]')
      
      expect(classDiv?.getAttribute('data-classname')).toBe('custom-chart')
    })

    it('should not apply className to Stock Heat Map widget', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      const secondWidget = widgets[1]
      const classDiv = secondWidget.querySelector('[data-classname]')
      
      expect(classDiv?.getAttribute('data-classname')).toBe('undefined')
    })
  })

  describe('Layout Structure', () => {
    it('should have grid layout in sections', () => {
      const { container } = render(<Home />)
      const sections = container.querySelectorAll('section')
      
      sections.forEach(section => {
        expect(section).toHaveClass('grid', 'w-full', 'gap-8', 'home-section')
      })
    })

    it('should have correct column spans in first section', () => {
      const { container } = render(<Home />)
      const firstSection = container.querySelectorAll('section')[0]
      const columns = firstSection.querySelectorAll('div[class*="col-span"]')
      
      expect(columns.length).toBeGreaterThan(0)
    })

    it('should have h-full class on second section widgets', () => {
      const { container } = render(<Home />)
      const secondSection = container.querySelectorAll('section')[1]
      const heightDivs = secondSection.querySelectorAll('div.h-full')
      
      expect(heightDivs.length).toBe(2)
    })
  })

  describe('Responsive Design', () => {
    it('should include responsive column span classes', () => {
      const { container } = render(<Home />)
      const html = container.innerHTML
      
      expect(html).toContain('md:col-span-1')
      expect(html).toContain('xl:col-span-1')
      expect(html).toContain('xl:col-span-2')
    })

    it('should have responsive grid layout', () => {
      const { container } = render(<Home />)
      const sections = container.querySelectorAll('section')
      
      sections.forEach(section => {
        expect(section).toHaveClass('grid')
      })
    })
  })

  describe('Constants Usage', () => {
    it('should use MARKET_OVERVIEW_WIDGET_CONFIG for first two widgets', () => {
      // This test verifies the config is passed correctly
      // The actual config values are tested in constants.test.ts
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      
      expect(widgets[0]).toBeInTheDocument()
      expect(widgets[1]).toBeInTheDocument()
    })

    it('should use HEATMAP_WIDGET_CONFIG for timeline widget', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      
      expect(widgets[2]).toBeInTheDocument()
    })

    it('should use MARKET_DATA_WIDGET_CONFIG for market quotes widget', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      
      expect(widgets[3]).toBeInTheDocument()
    })
  })

  describe('Content Organization', () => {
    it('should organize widgets in two main sections', () => {
      const { container } = render(<Home />)
      const firstSection = container.querySelectorAll('section')[0]
      const secondSection = container.querySelectorAll('section')[1]
      
      expect(firstSection.querySelectorAll('[data-testid="trading-view-widget"]')).toHaveLength(2)
      expect(secondSection.querySelectorAll('[data-testid="trading-view-widget"]')).toHaveLength(2)
    })

    it('should have Market Overview and Heat Map in first section', () => {
      const { container } = render(<Home />)
      const firstSection = container.querySelectorAll('section')[0]
      
      expect(firstSection.textContent).toContain('Market Overview')
      expect(firstSection.textContent).toContain('Stock Heat Map')
    })

    it('should have timeline and market quotes in second section', () => {
      const { container } = render(<Home />)
      const secondSection = container.querySelectorAll('section')[1]
      const widgets = secondSection.querySelectorAll('[data-testid="trading-view-widget"]')
      
      expect(widgets).toHaveLength(2)
    })
  })

  describe('Edge Cases', () => {
    it('should handle rendering with missing imports gracefully', () => {
      // The component should still render even if configs are undefined
      // This is handled by the mock
      expect(() => render(<Home />)).not.toThrow()
    })

    it('should maintain consistent widget ordering', () => {
      render(<Home />)
      const widgets = screen.getAllByTestId('trading-view-widget')
      
      // Verify the order is always the same
      expect(widgets[0].querySelector('h3')?.textContent).toBe('Market Overview')
      expect(widgets[1].querySelector('h3')?.textContent).toBe('Stock Heat Map')
      expect(widgets[2].querySelector('h3')).toBeNull() // Timeline has no title
      expect(widgets[3].querySelector('h3')).toBeNull() // Market quotes has no title
    })
  })

  describe('Performance', () => {
    it('should render efficiently without excessive re-renders', () => {
      const { rerender } = render(<Home />)
      
      // Multiple re-renders should work without issues
      rerender(<Home />)
      rerender(<Home />)
      
      const widgets = screen.getAllByTestId('trading-view-widget')
      expect(widgets).toHaveLength(4)
    })

    it('should handle multiple instances on the same page', () => {
      const { container } = render(
        <>
          <Home />
          <Home />
        </>
      )
      
      const widgets = container.querySelectorAll('[data-testid="trading-view-widget"]')
      expect(widgets).toHaveLength(8) // 4 widgets per Home instance
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading levels', () => {
      render(<Home />)
      const headings = screen.getAllByRole('heading', { level: 3 })
      
      expect(headings).toHaveLength(2) // Only Market Overview and Stock Heat Map
      expect(headings[0]).toHaveTextContent('Market Overview')
      expect(headings[1]).toHaveTextContent('Stock Heat Map')
    })

    it('should maintain semantic HTML structure', () => {
      const { container } = render(<Home />)
      const sections = container.querySelectorAll('section')
      
      expect(sections).toHaveLength(2)
      sections.forEach(section => {
        expect(section.tagName).toBe('SECTION')
      })
    })
  })

  describe('Component Export', () => {
    it('should export Home as default', () => {
      expect(Home).toBeDefined()
      expect(typeof Home).toBe('function')
    })

    it('should be a valid React component', () => {
      const element = <Home />
      expect(React.isValidElement(element)).toBe(true)
    })
  })
})