# Testing Documentation

This document describes the comprehensive test suite for the TradingView widget integration.

## Test Coverage

### 1. Constants Tests (`lib/__tests__/constants.test.ts`)
- **Navigation Constants**: Tests for NAV_ITEMS structure and content
- **Form Options**: Tests for investment goals, risk tolerance, industries, alerts, and conditions
- **Widget Configurations**: Tests for all TradingView widget config objects
- **Dynamic Config Functions**: Tests for symbol-based configuration generators
- **Stock Symbols**: Tests for the POPULAR_STOCK_SYMBOLS array
- **Miscellaneous**: Tests for NO_MARKET_NEWS and WATCHLIST_TABLE_HEADER

**Total Tests**: 100+ tests covering all constants

### 2. Hook Tests (`components/hooks/__tests__/useTradingViewWidget.test.tsx`)
- **Hook Initialization**: Tests ref creation and initial state
- **Script Injection**: Tests script element creation and configuration
- **Container Management**: Tests DOM manipulation and loading states
- **Cleanup**: Tests unmount behavior and resource cleanup
- **Dependencies**: Tests effect re-execution on prop changes
- **Edge Cases**: Tests with various input combinations
- **Performance**: Tests ref stability and rapid updates
- **Type Safety**: Tests TypeScript type compliance

**Total Tests**: 45+ tests covering hook behavior

### 3. Component Tests (`components/__tests__/TradingViewWidget.test.tsx`)
- **Rendering**: Tests component mounting and DOM structure
- **Props Handling**: Tests all prop variations
- **Styling**: Tests CSS classes and inline styles
- **Ref Handling**: Tests ref passing and management
- **Memoization**: Tests React.memo optimization
- **Edge Cases**: Tests edge conditions and error handling
- **Real-world Scenarios**: Tests actual widget configurations
- **Accessibility**: Tests semantic HTML and ARIA
- **Performance**: Tests rendering efficiency

**Total Tests**: 50+ tests covering component functionality

### 4. Page Tests (`app/__tests__/page.test.tsx`)
- **Page Rendering**: Tests page structure and sections
- **Widget Placement**: Tests correct widget arrangement
- **Script URLs**: Tests TradingView script URL generation
- **Configuration**: Tests widget configs and props
- **Layout Structure**: Tests grid system and responsive design
- **Constants Usage**: Tests integration with constants
- **Content Organization**: Tests section content
- **Edge Cases**: Tests error conditions
- **Performance**: Tests rendering efficiency
- **Accessibility**: Tests semantic structure

**Total Tests**: 35+ tests covering page functionality

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in CI Mode
```bash
npm run test:ci
```

### Generate Coverage Report
```bash
npm run test:coverage
```

## Test Configuration

### Jest Configuration (`jest.config.js`)
- Uses Next.js Jest configuration
- JSDoc environment for React testing
- Path mapping for `@/` imports
- Coverage collection from components, app, and lib

### Jest Setup (`jest.setup.js`)
- Imports `@testing-library/jest-dom` matchers
- Mocks `window.matchMedia` for responsive tests
- Mocks `IntersectionObserver` for widget tests

## Coverage Goals

- **Statements**: > 90%
- **Branches**: > 85%
- **Functions**: > 90%
- **Lines**: > 90%

## Key Testing Patterns

### 1. Component Testing
```typescript
import { render, screen } from '@testing-library/react'
import Component from '../Component'

describe('Component', () => {
  it('should render', () => {
    render(<Component />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### 2. Hook Testing
```typescript
import { renderHook } from '@testing-library/react'
import useCustomHook from '../useCustomHook'

describe('useCustomHook', () => {
  it('should return expected value', () => {
    const { result } = renderHook(() => useCustomHook())
    expect(result.current).toBeDefined()
  })
})
```

### 3. Constants Testing
```typescript
import { CONSTANT } from '../constants'

describe('Constants', () => {
  it('should have expected structure', () => {
    expect(CONSTANT).toHaveProperty('key')
    expect(CONSTANT.key).toBe('value')
  })
})
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how
2. **Use Descriptive Test Names**: Each test should clearly state what it's testing
3. **Arrange-Act-Assert**: Structure tests with clear setup, action, and verification
4. **Test Edge Cases**: Include tests for boundary conditions and error states
5. **Mock External Dependencies**: Mock TradingView scripts and external services
6. **Keep Tests Independent**: Each test should run in isolation
7. **Maintain Coverage**: Aim for high coverage without sacrificing test quality

## Continuous Integration

Tests run automatically on:
- Pull request creation
- Push to main branch
- Release builds

CI will fail if:
- Any test fails
- Coverage drops below thresholds
- Linting errors are present

## Debugging Tests

### Run Specific Test File
```bash
npm test -- constants.test.ts
```

### Run Tests Matching Pattern
```bash
npm test -- -t "Widget Configuration"
```

### Debug in VS Code
Add breakpoints and use Jest extension for VS Code

### Verbose Output
```bash
npm test -- --verbose
```

## Future Improvements

- [ ] Add integration tests for full-page flows
- [ ] Add E2E tests with Playwright
- [ ] Add visual regression tests
- [ ] Add performance benchmarks
- [ ] Add accessibility audits with axe-core