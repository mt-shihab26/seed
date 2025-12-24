import { cn } from '@/lib/utils';

import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Accordion as AccordionPrimitive } from 'radix-ui';

// function AccordionTrigger({
//     className,
//     children,
//     ...props
// }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
//     return (
//         <AccordionPrimitive.Header className="flex">
//             <AccordionPrimitive.Trigger
//                 data-slot="accordion-trigger"
//                 className={cn(
//                     'flex flex-1 cursor-pointer items-center gap-2 rounded-md py-2 text-left text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
//                     className,
//                 )}
//                 {...props}
//             >
//                 <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" />
//                 <div className="flex flex-1 items-center gap-1">{children}</div>
//             </AccordionPrimitive.Trigger>
//         </AccordionPrimitive.Header>
//     );
// }

function AccordionTrigger({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={cn(
                    'group/accordion-trigger relative flex flex-1 items-start justify-between rounded-none border border-transparent py-2.5 text-left text-xs font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground',
                    className,
                )}
                {...props}
            >
                {children}
                <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    strokeWidth={2}
                    data-slot="accordion-trigger-icon"
                    className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
                />
                <HugeiconsIcon
                    icon={ArrowUp01Icon}
                    strokeWidth={2}
                    data-slot="accordion-trigger-icon"
                    className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
                />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

export { AccordionTrigger };
