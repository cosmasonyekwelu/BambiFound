import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders landing page headline', async () => {
    render(<App />);
    expect(await screen.findByText('Find the people who help you build.')).toBeDefined();
  });
});
