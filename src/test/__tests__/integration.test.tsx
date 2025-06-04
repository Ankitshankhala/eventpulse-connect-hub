
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { Button } from '@/components/ui/button';

describe('Integration Tests', () => {
  it('should render components with all providers', () => {
    render(
      <div>
        <Button>Test Button</Button>
        <h1>Integration Test</h1>
      </div>
    );
    
    expect(screen.getByText('Test Button')).toBeInTheDocument();
    expect(screen.getByText('Integration Test')).toBeInTheDocument();
  });

  it('should have access to testing utilities', () => {
    render(<div data-testid="test-element">Test Content</div>);
    
    expect(screen.getByTestId('test-element')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
