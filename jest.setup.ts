import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill global for Jest tests
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;