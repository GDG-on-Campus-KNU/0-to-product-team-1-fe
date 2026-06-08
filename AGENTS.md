<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Component Styling Rules

- Do not define new text styles (font size, weight, line height, etc.) or colors unless necessary. Always prioritize the predefined styles and design tokens defined in `global.css`.
- Select the text style and color variables that most closely match the user's requested intent or visual meaning.
- If an appropriate predefined style already exists, do not introduce arbitrary Tailwind utility classes or hard-coded color values (e.g., `hex`, `rgb`, `rgba`).
- Propose new style variables only when the existing design system cannot adequately satisfy the requirement.
- Follow the existing design system whenever possible to maintain visual consistency across components.

# File and Code Organization Rules

- Separate files and code according to their responsibilities and concerns.
- Organize components, hooks, services, utilities, types, and constants into appropriate directories based on their roles.
- Follow the existing project structure and conventions whenever possible.
- Prioritize consistency with the current architecture over introducing new organizational patterns.
- Keep related code close together, but avoid placing unrelated responsibilities in the same file.
- Extract reusable logic into dedicated modules when it improves maintainability and readability.
- Structure files and folders in the way that best fits the project's existing patterns and domain boundaries.


