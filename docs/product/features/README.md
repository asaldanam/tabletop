# Features (Características)
Este nivel tiene como objetivo describir las funcionalidades principales del producto mediante formatos que puedan ser abordados directamente por desarrolladores y agentes de código.

# Estructura

## Épicas (Epics)
Las épicas representan grandes bloques de funcionalidad que se dividen en historias de usuario más pequeñas

Todas las épicas deben 
- Estar en un archivo `EPIC.md` 
- Dentro de su propia carpeta con la nomenclatura `<code>-<name>` slugificada

Ejemplo y template: [EP-000-epic-template](/docs/product/features/epics/EP-000-epic-template/EPIC.md)

## Historias de Usuario (User Stories)
Las historias de usuario representan funcionalidades específicas desde la perspectiva del usuario final. Cada historia de usuario debe incluir criterios de aceptación claros y medibles.

Todas las historias de usuario deben:
- Estar en un archivo `STORY.md` 
- Dentro de su propia carpeta con la nomenclatura `<code>-<name>` slugificada 
- Dentro de la carpeta de la épica correspondiente, en una carpeta `/stories`

Ejemplo y template: [US-000-story-template](/docs/product/features/epics/EP-000-epic-template/stories/US-000-story-template/STORY.md)