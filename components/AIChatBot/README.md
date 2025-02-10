# AIChatBot Component

This directory contains a modularized version of the AIChatBot component. The original monolithic component has been split into smaller, more maintainable pieces.

## Directory Structure

```
AIChatBot/
├── AIChatBot.jsx                  - Original monolithic component (for reference)
├── ModularAIChatBot.jsx           - New modularized main component
├── TypewriterEffect.jsx           - Animation component for loading state
├── MessageContent.jsx             - Component for rendering message content
├── CodeBlock.jsx                  - Component for rendering code blocks
├── ChartComponent.jsx             - Component for rendering charts
├── chartUtils.js                  - Utilities for chart generation
│
├── components/                    - UI Components
│   ├── index.js                   - Re-exports all components
│   ├── ChatHeader.jsx             - Header component with controls
│   ├── ChatInput.jsx              - Input component for user messages
│   ├── ChatMessage.jsx            - Component for rendering messages
│   └── ActionConfirmationDialog.jsx - Dialog for confirming actions
│
├── hooks/                         - Custom React hooks
│   ├── index.js                   - Re-exports all hooks
│   ├── useChatFirebase.js         - Hook for Firebase chat operations
│   ├── useActionExecution.js      - Hook for action execution
│   └── useContextData.js          - Hook for accessing context data
│
└── utils/                         - Utility functions
    ├── index.js                   - Re-exports all utilities
    ├── modeUtils.js               - Utilities for mode detection
    ├── actionUtils.js             - Utilities for action handling
    └── imageUtils.js              - Utilities for image generation
```

## Usage

To use the modularized AIChatBot component, replace the import of `AIChatBot` with `ModularAIChatBot`:

```jsx
// Before
import AIChatBot from '@/components/AIChatBot/AIChatBot';

// After
import ModularAIChatBot from '@/components/AIChatBot/ModularAIChatBot';
```

The ModularAIChatBot component provides the same functionality as the original AIChatBot component but with better organized code.

## Key Benefits of Modularization

1. **Improved Maintainability**: Smaller files are easier to understand and modify
2. **Better Separation of Concerns**: Each file has a clear, single responsibility
3. **Reusability**: Components and hooks can be reused elsewhere
4. **Testability**: Isolated components and utilities are easier to test
5. **Reduced Cognitive Load**: Developers can focus on specific parts of the functionality

## Component Responsibilities

- **ModularAIChatBot**: Main component that orchestrates the chat experience
- **ChatHeader**: Controls for the chat interface (fullscreen, theme, close)
- **ChatInput**: Input field for user messages
- **ChatMessage**: Renders individual chat messages
- **ActionConfirmationDialog**: Dialog for confirming actions before execution

## Custom Hooks

- **useChatFirebase**: Manages chat messages and Firebase operations
- **useActionExecution**: Handles action detection and execution
- **useContextData**: Safely accesses all required context data

## Utilities

- **modeUtils**: Functions for detecting and managing chat modes (build, agent, chat)
- **actionUtils**: Functions for working with actions and generating descriptions
- **imageUtils**: Functions for generating and managing images
