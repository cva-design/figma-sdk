import { setProjectAnnotations } from '@storybook/test';
import { beforeAll } from 'vitest';
import * as preview from './preview';

beforeAll(() => {
  setProjectAnnotations(preview);
});
