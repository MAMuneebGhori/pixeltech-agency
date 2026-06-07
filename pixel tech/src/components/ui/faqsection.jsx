"use client"

import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"
import { cn } from "../../lib/utils"

export function FAQSection({
  title,
  subtitle,
  faqs = [],
  className,
}) {
  return (
    <section className={cn("w-full max-w-[800px] mx-auto", className)}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-[44px]">
          {subtitle && (
            <div className="w-full text-left">
              <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
                {subtitle}
              </span>
            </div>
          )}
          {title && (
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
              {title}
            </h2>
          )}
        </div>
      )}

      {/* FAQs Single Column */}
      <div className="flex flex-col">
        <Accordion
          type="single"
          collapsible
          className="w-full"
        >
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
