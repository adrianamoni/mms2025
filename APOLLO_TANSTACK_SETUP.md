# Apollo Client + TanStack Query Configuration

## 🎯 Configuración Completada

### ✅ **Apollo Client**
- Configurado para GitHub GraphQL API
- Autenticación con token personal
- Manejo de errores personalizado  
- Cache con políticas para paginación
- Error handling y logging

### ✅ **TanStack Query (React Query)**
- Cliente configurado con configuraciones optimizadas
- Estrategias de retry inteligentes
- Cache con stale time y garbage collection
- Query keys factory para consistencia
- DevTools habilitadas en desarrollo

### ✅ **Integración Híbrida**
- Hook personalizado `useGraphQLQuery` que combina ambos
- Hook `useGraphQLMutation` para mutaciones
- Aprovecha lo mejor de ambas librerías:
  - **Apollo**: Features específicas de GraphQL, optimistic updates
  - **TanStack Query**: Cache avanzado, background updates, retry logic

### ✅ **Providers Setup**
- `AppProviders` component que envuelve la aplicación
- Apollo Provider + QueryClient Provider
- React Query DevTools configuradas

### ✅ **GraphQL Queries**
- Queries predefinidas para GitHub Issues
- Tipos TypeScript generados
- Paginación cursor-based
- Búsqueda y filtrado de issues

## 🛠️ Archivos Creados

```
src/
├── shared/
│   ├── api/
│   │   ├── apollo-client.ts     # Configuración de Apollo Client
│   │   ├── query-client.ts      # Configuración de TanStack Query
│   │   └── github-queries.ts    # Queries GraphQL y tipos
│   ├── hooks/
│   │   └── useGraphQL.ts        # Hook híbrido Apollo + TanStack
│   └── config/
│       └── env.ts              # Variables de entorno tipadas
└── app/
    └── providers/
        └── AppProviders.tsx    # Providers de la aplicación
```

## 🚀 Próximos Pasos

1. **Estructura Feature-Sliced Design** - Crear layers y slices
2. **React Router** - Sistema de navegación
3. **Styled Components** - Sistema de estilos
4. **Componentes de UI** - Lista de issues, detalles, comentarios

## 💡 Uso de los Hooks

```typescript
// Usar Apollo + TanStack Query combinados
const { data, isLoading, error } = useGraphQLQuery(
  queryKeys.github.repository('facebook', 'react'),
  GET_REPOSITORY_INFO,
  { owner: 'facebook', name: 'react' }
);

// Mutaciones
const createIssueMutation = useGraphQLMutation(CREATE_ISSUE_MUTATION, {
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.github.root });
  }
});
```

## 🔧 Configuración de Entorno

```bash
# Variables requeridas en .env
VITE_GITHUB_TOKEN=your_token_here
VITE_GITHUB_API_URL=https://api.github.com/graphql
VITE_GITHUB_REPO_OWNER=facebook  
VITE_GITHUB_REPO_NAME=react
```

Todo está listo para empezar a construir las features del GitHub Issues Explorer! 🎉