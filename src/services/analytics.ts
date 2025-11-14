// TypeScript declaration for window.gtag
// This ensures that TypeScript knows about the gtag function if it's not already globally available.
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, eventParameters?: Record<string, unknown>) => void;
  }
}

/**
 * Tracks a custom event using Google Analytics.
 *
 * @param action - The action associated with the event (e.g., 'click', 'submit').
 * @param category - The category of the event (e.g., 'Button', 'Form').
 * @param label - The label for the event (e.g., 'Login Button', 'Contact Form').
 * @param value - An optional numeric value associated with the event (e.g., a rating, a monetary value).
 */
export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  if (window.gtag) {
    const eventParameters: Record<string, unknown> = {
      event_category: category,
      event_label: label,
    };

    if (value !== undefined) {
      eventParameters.value = value;
    }

    window.gtag('event', action, eventParameters);
  } else {
    console.warn('Google Analytics gtag function not found. Event tracking is disabled.');
    // Optionally, you could buffer events here if gtag is expected to load later
  }
};
