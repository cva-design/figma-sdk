import { fireEvent, render } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Button from './button.svelte';

describe('Button Component', () => {
  it('renders with default props', () => {
    const { getByRole } = render(Button, { props: { slot: 'Click me' } });
    const button = getByRole('button');
    expect(button.textContent).toBe('Click me');
    expect(button.className).toContain('button--primary');
    expect(button.className).toContain('button--medium');
  });

  it('renders with custom variant', () => {
    const { getByRole } = render(Button, {
      props: { variant: 'secondary', slot: 'Secondary' },
    });
    const button = getByRole('button');
    expect(button.className).toContain('button--secondary');
  });

  it('renders with custom size', () => {
    const { getByRole } = render(Button, {
      props: { size: 'small', slot: 'Small' },
    });
    const button = getByRole('button');
    expect(button.className).toContain('button--small');
  });

  it('applies fullWidth class when prop is true', () => {
    const { getByRole } = render(Button, {
      props: { fullWidth: true, slot: 'Full Width' },
    });
    const button = getByRole('button');
    expect(button.className).toContain('button--full-width');
  });

  it('passes through additional attributes', () => {
    const { getByRole } = render(Button, {
      props: { 'data-testid': 'test-button', slot: 'Test' },
    });
    const button = getByRole('button');
    expect(button.getAttribute('data-testid')).toBe('test-button');
  });

  it('triggers onClick event', async () => {
    const handleClick = vi.fn();
    const { getByRole, component } = render(Button, {
      props: { slot: 'Click me' },
    });
    const button = getByRole('button');

    component.$on('click', handleClick);

    await fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('combines custom className with generated classes', () => {
    const { getByRole } = render(Button, {
      props: { class: 'custom-class', slot: 'Custom Class' },
    });
    const button = getByRole('button');
    expect(button.className).toContain('custom-class');
    expect(button.className).toContain('button');
  });
});
