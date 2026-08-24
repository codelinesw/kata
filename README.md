# KATA — Microapps Architecture

## Descripción
KATA es una solución de arquitectura basada en Microapps donde una aplicación **React Native** actúa como **Native Shell** y aloja dentro de su flujo de interfaz un **WebView** que ejecuta una **Microapp Web** desarrollada en **React + Vite**. La arquitectura permite la coexistencia y comunicación bidireccional asíncrona entre el entorno nativo del dispositivo móvil y el entorno de ejecución del navegador web incorporado.

---

## Objetivo de la solución
El objetivo principal de esta solución es ofrecer un desacoplamiento entre las funcionalidades nativas del dispositivo y las micro-experiencias web. Permite que equipos de desarrollo desplieguen y actualicen funcionalidades de forma independiente en el cliente Web sin necesidad de recompilar la shell nativa en cada iteración, manteniendo un contrato de comunicación estricto y seguro mediante un Bridge TypeScript.

---

## Problema que resuelve
1. **Despliegues rígidos en tiendas móviles:** Evita la dependencia constante del proceso de revisión de tiendas de aplicaciones (App Store / Play Store) para actualizaciones en flujos de usuario de la Web.
2. **Duplicidad de lógica de negocio:** Reutiliza experiencias web existentes dentro de aplicaciones nativas móviles.
3. **Falta de sincronización de estado:** Sincroniza el estado local generado en la Microapp Web directamente con la tienda global de datos de la Shell Nativa (Redux Toolkit).

---

## Arquitectura general

### Native Shell
Componente móvil principal construido en React Native CLI `^0.86.2` que sirve como contenedor primario de la aplicación. Es responsable de administrar la navegación, las capacidades del sistema operativo y renderizar el WebView.

### Microapp Web
Aplicación ligera desarrollada en React 19 `^19.2.8`  y empaquetada con Vite `^8.2.0` . Funciona como una pieza modular de UI alojada dentro del contenedor del Native Shell.

### Comunicación Native ↔ Web
La comunicación se realiza mediante un canal serializado en JSON basado en los mecanismos estándar de `WebView`:
* **Web → Native:** Vía `window.ReactNativeWebView.postMessage(messageString)`.
* **Native → Web:** Vía inyección de JavaScript con `window.receiveFromNative(jsonString)`.

### Bridge
Mecanismo de abstracción de eventos y payloads. Garantiza que ambos entornos sigan una interfaz tipada estándar.

### Flujo de información
1. La Microapp Web emite un mensaje formateado por el Bridge.
2. El WebView intercepta la acción mediante la propiedad `onMessage`.
3. El Native Shell procesa la acción y dispatcha los cambios hacia el **Global Store**.
4. El Native Shell devuelve una respuesta tipada inyectando script JS hacia la Web si el flujo lo requiere.

### Gestión del estado
El estado global de la aplicación reside en el Native Shell mediante `@reduxjs/toolkit` `^2.12.0` y `react-redux` `^9.3.0`.

## Diagramas de arquitecturas
<img width="5608" height="8192" alt="image" src="https://github.com/user-attachments/assets/d03d149d-41de-4411-b89b-c75660bf4632" />
<img width="8192" height="2111" alt="image" src="https://github.com/user-attachments/assets/72bbb3fc-c416-4731-a600-c8f38e799275" />


---

## Tecnologías

| Entorno | Tecnología / Librería | Versión | Fuente |
| :--- | :--- | :--- | :--- |
| **Global** | Node.js | `>= 22.11.0` | `mobile/package.json`  |
| **Mobile** | React Native | `^0.86.2` | `mobile/package.json`  |
| **Mobile** | React | `19.2.3` | `mobile/package.json`  |
| **Mobile** | react-native-webview | `^14.0.1` | `mobile/package.json`  |
| **Mobile** | Redux Toolkit | `^2.12.0` | `mobile/package.json`  |
| **Mobile** | React Navigation Native | `^7.3.17` | `mobile/package.json`  |
| **Web** | React | `^19.2.8` | `web/package.json`  |
| **Web** | React DOM | `^19.2.8` | `web/package.json`  |
| **Web** | Vite | `^8.2.0` | `web/package.json`  |
| **Web** | TypeScript | `~6.0.2` | `web/package.json`  |
| **Android** | compileSdk | `37` | `android/build.gradle` |
| **Android** | targetSdk | `36` | `android/build.gradle` |
| **Android** | minSdk | `24` | `android/build.gradle` |
| **Android** | buildToolsVersion | `"37.0.0"` | `android/build.gradle`  |
| **Android** | ndkVersion | `"27.1.12297006"` | `android/build.gradle`  |
| **Android** | Kotlin | `"2.2.0"` | `android/build.gradle`  |

---

## Estructura del repositorio

```
        |----mobile: Carpeta donde se almacena todo el proyecto RN todo las fuentes y estructura de carpetas
                |---- src
                       |---- bridge
                       |---- domain
                            |---- entities
                            |---- interfaces
        
                       |---- infrastructure
                            |--- store
                                |--- store.ts
        
                       |---- presentation
                            |---- components
                                    |---- goal-item
                                            |---- goal-item-component.tsx
                                            |---- goal-item-style.tsx
                                    |---- web-app-container
                                            |---- web-app-container-component.tsx
                                            |---- web-app-container-style.tsx
                                            |---- web-app-view-model.tsx
                            |---- props
                            |---- screens
                            |---- storage
        
                        |---- types
                            |---- bridge.ts
        |---- web
                |---- src
                       |---- bridge
                       |---- domain
                            |---- entities
                            |---- interfaces
        
                       |---- presentation
                            |---- components
                                    |---- pop-up
                                            |---- pop-up-component.tsx
                                            |---- pop-up-style.tsx
                            |---- props
                                    |---- goal-detail.tsx
                            |---- screens
        
                        |---- types
                            |---- bridge.ts
        
        |---- libreria: (Este está incompleto no se logró incorporar)
        |---- Tests y agente: (archivos con el agente y los skills)

```

## Requisitos

* **Node.js:** `>= 22.11.0` 
* **Java / JDK:** 17
* **Android Studio & SDK:**
  * Android SDK Platform 37 (compileSdk 37) 
  * Target SDK 36 
  * Build Tools 37.0.0 
  * NDK 27.1.12297006
    
## Instalación

1. Clonar el repositorio.
2. Instalar dependencias del proyecto Web:

```
cd web
npm install

cd ../mobile
npm install

## Ejecución

1. Iniciar Microapp Web
cd web
npm run dev

2. Iniciar Metro Bundler Native
cd mobile
npm run start

3. Ejecutar en Android
cd mobile
npm run android
```

## Testing
Mobile Tests (Jest):
cd mobile
npm run test
npm run test:coverage
