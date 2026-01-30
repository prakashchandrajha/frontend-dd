# Frontend Project Structure Rulebook

## Core Principles
- **Separation of Concerns**: Logic, presentation, and configuration in separate layers
- **Consistency**: Uniform naming and organization across the project
- **Scalability**: Structure that grows with the application

## Directory Structure Rules

### 1. Component Organization
```
src/
├── components/          # Reusable UI components
├── pages/              # Route-level page components
├── layouts/            # Layout wrappers
└── shared/             # Shared utilities/hooks
```

### 2. Feature-Based Structure
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   └── dashboard/
│       ├── components/
│       ├── services/
│       └── types/
```

### 3. Technical Layering
```
src/
├── lib/                # Core utilities, configs
├── services/           # API/business logic
├── hooks/              # Custom React hooks
├── types/              # TypeScript interfaces
├── utils/              # Helper functions
└── constants/          # Application constants
```

## File Naming Conventions

### Components
- **PascalCase**: `UserProfile.tsx`, `LoginPage.tsx`
- **Match filename to component**: `Button.tsx` exports `Button` component
- **Index exports**: Use `index.ts` for barrel exports

### Styles
- **CSS Modules**: `ComponentName.module.css`
- **Global styles**: `globals.css`, `variables.css`
- **Scoped to component**: Each component has its own style file

### Utilities/Services
- **camelCase**: `apiClient.ts`, `authService.ts`
- **Descriptive names**: `dataFormatter.ts`, `validationUtils.ts`

## Code Organization Rules

### 1. Component Files
```
Component/
├── Component.tsx          # Main component logic
├── Component.module.css   # Scoped styles
├── types.ts              # Component-specific types
└── index.ts              # Barrel export
```

### 2. Service Layer
- **One service per domain**: `authService.ts`, `userService.ts`
- **Centralized API config**: `apiConfig.ts` for all endpoints
- **No business logic in components**

### 3. Type Definitions
- **Dedicated types folder**: `src/types/`
- **Interface per feature**: `auth.ts`, `user.ts`
- **Export all types**: Make types easily importable

## Best Practices

### ✅ DO
- Use CSS Modules for component styling
- Centralize API configuration
- Separate container vs presentational components
- Use index files for cleaner imports
- Follow consistent file extensions (.tsx for React components)

### ❌ DON'T
- Mix logic and presentation in same file
- Hardcode API URLs in components
- Use inline styles for complex styling
- Create deeply nested folder structures
- Mix different file types in same directory

## Quick Reference

| Purpose | Location | Extension |
|---------|----------|-----------|
| Page components | `src/pages/` | `.tsx` |
| Reusable components | `src/components/` | `.tsx` |
| Styles | Same folder | `.module.css` |
| Services | `src/services/` | `.ts` |
| Types | `src/types/` | `.ts` |
| Config | `src/lib/` | `.ts` |