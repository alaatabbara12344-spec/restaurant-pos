Tabbara Fish POS v68 — WhatsApp cooking-price fix

Based on v67. Fixes legacy WhatsApp weight orders so grill/fry surcharge is merged into the displayed unit/kg price and recalculated automatically.

Example: 3 kg Ajaj at $12/kg + $3 grill = $15/kg, total $45.
The receipt remains one line: quantity 3 kg, price $15, total $45. No separate grill/fry line is added.

For legacy WhatsApp items, line total is recalculated from weight × adjusted unit price, so an incorrect stored line total cannot suppress the cooking surcharge.

No changes were made to the printing bridge, invoice numbering, or printer integration.
