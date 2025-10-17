// création et configuration du worker
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { plantHandlers } from './handlers/plantHandlers';


export const worker = setupWorker(...handlers, ...plantHandlers);