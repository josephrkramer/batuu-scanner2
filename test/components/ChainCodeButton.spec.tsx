import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ChainCodeButton from '../../src/components/ChainCodeButton';

// Mock the setRenderChainCodeValue and setRenderAlignmentQuestion functions
const mockSetRenderChainCodeValue = vi.fn();
const mockSetRenderAlignmentQuestion = vi.fn();

describe('ChainCodeButton', () => {
  beforeEach(() => {
    // Clear any previous mock calls before each test
    vi.clearAllMocks(); 
    // Or if you only want to clear the gtag mock:
    // if (window.gtag && typeof window.gtag === 'function' && 'mockClear' in window.gtag) {
    //   (window.gtag as vi.Mock).mockClear();
    // }
  });

  it('should call window.gtag with correct parameters on click', () => {
    render(
      <ChainCodeButton
        setRenderChainCodeValue={mockSetRenderChainCodeValue}
        setRenderAlignmentQuestion={mockSetRenderAlignmentQuestion}
      />
    );

    const button = screen.getByRole('button', { name: /upload chain code to rayk/i });
    fireEvent.click(button);

    expect(window.gtag).toHaveBeenCalledTimes(1);
    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'chain_code_button_click',
      {
        event_category: 'Clicks',
        event_label: 'ChainCodeButton Clicked - Upload to Rayk',
      }
    );

    // Also ensure the original functionality is still present
    expect(mockSetRenderAlignmentQuestion).toHaveBeenCalledWith(true);
    expect(mockSetRenderChainCodeValue).toHaveBeenCalledWith(true);
  });
});
