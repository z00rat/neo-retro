import { Tooltip as TooltipPrimitive } from 'bits-ui';

import Content from './tooltip-content.svelte';
import Root from './tooltip-root.svelte';
import Trigger from './tooltip-trigger.svelte';

const Provider = TooltipPrimitive.Provider;
const Portal = TooltipPrimitive.Portal;

export {
  Root,
  Trigger,
  Content,
  Provider,
  Portal,
  //
  Root as Tooltip,
  Content as TooltipContent,
  Trigger as TooltipTrigger,
  Provider as TooltipProvider,
  Portal as TooltipPortal,
};
