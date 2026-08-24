# KATA — Mobile Native Shell

## Descripción

El proyecto `mobile` constituye la **Shell Nativa** desarrollada con **React Native CLI**. Actúa como el host nativo para la arquitectura de **Microapps**, encargándose de:

* Renderizar la Microapp Web mediante `react-native-webview`.
* Gestionar la navegación mediante **React Navigation**.
* Administrar el estado global mediante **Redux Toolkit**.
* Establecer la comunicación **Native ↔ Web** mediante un Bridge.
* Integrar y ejecutar la Microapp Web dentro del contexto nativo.

La aplicación React Native fue inicializada utilizando [`@react-native-community/cli`](https://github.com/react-native-community/cli).

---

## Arquitectura

La solución está compuesta por una **Native Shell** desarrollada con React Native que contiene la Microapp Web dentro de un `WebView`.

```text
┌─────────────────────────────────────────────────────┐
│                 Mobile Native Shell                 │
│                  React Native CLI                   │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │                 Native Layer                  │  │
│  │                                               │  │
│  │  React Navigation                             │  │
│  │  Redux Toolkit                                │  │
│  │  WebView                                      │  │
│  │  Native ↔ Web Bridge                          │  │
│  │                                               │  │
│  │       ┌─────────────────────────────┐         │  │
│  │       │       Microapp Web          │         │  │
│  │       │                             │         │  │
│  │       │  React + Vite + TypeScript  │         │  │
│  │       └─────────────────────────────┘         │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Comunicación entre capas

```text
┌──────────────────┐
│   Microapp Web   │
└────────┬─────────┘
         │
         │ Web → Native
         ▼
┌──────────────────┐
│      WebView     │
│      Bridge      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Native Shell   │
│                  │
│     Redux        │
│     Logic        │
└────────┬─────────┘
         │
         │ Native → Web
         ▼
┌──────────────────┐
│   Microapp Web   │
└──────────────────┘
```

---

# Requisitos previos

Antes de instalar o ejecutar el proyecto, es necesario tener configurado el entorno de desarrollo de React Native.

## Node.js

El proyecto requiere obligatoriamente:

```text
Node.js 22.19.0
```

Validar la versión instalada:

```bash
node --version
```

El resultado esperado es:

```text
v22.19.0
```

También se puede validar npm:

```bash
npm --version
```

> **Importante:** utilizar exactamente Node.js `22.19.0` para instalar dependencias y ejecutar los scripts del proyecto.

### Uso recomendado de NVM

Se recomienda utilizar **NVM (Node Version Manager)** para garantizar que todos los desarrolladores utilicen la misma versión de Node.js.

Instalar Node.js `22.19.0`:

```bash
nvm install 22.19.0
```

Activar la versión:

```bash
nvm use 22.19.0
```

Establecerla como versión predeterminada:

```bash
nvm alias default 22.19.0
```

Validar:

```bash
node --version
```

Debe retornar:

```text
v22.19.0
```

### Archivo `.nvmrc`

Se recomienda mantener un archivo `.nvmrc` en la raíz del proyecto:

```text
22.19.0
```

De esta manera, utilizando NVM, la versión correcta puede activarse mediante:

```bash
nvm use
```

---

## React Native

El proyecto utiliza **React Native CLI** y requiere tener configurado el entorno nativo correspondiente a la plataforma en la que se desea desarrollar.

Antes de continuar, se recomienda completar la guía oficial de configuración del entorno de React Native:

[Configurar el entorno de React Native](https://reactnative.dev/docs/set-up-your-environment)

### Android

Para desarrollar y ejecutar la aplicación en Android es necesario contar con:

* Android Studio.
* Android SDK.
* Android SDK Platform.
* Android SDK Build-Tools.
* Android Emulator o un dispositivo físico.
* JDK compatible con la versión de React Native utilizada.
* Variables de entorno correctamente configuradas.

### iOS

Para desarrollar y ejecutar la aplicación en iOS es necesario contar con:

* macOS.
* Xcode.
* CocoaPods.
* Un simulador iOS o dispositivo físico.

---

# Instalación

Clonar el repositorio:

```bash
git clone <repository-url>
```

Ingresar al proyecto:

```bash
cd mobile
```

Verificar la versión de Node.js:

```bash
node --version
```

Debe mostrar:

```text
v22.19.0
```

Instalar las dependencias:

```bash
npm install
```

---

# Dependencias

## Dependencies — Runtime

| Dependencia                      | Versión   | Propósito                                        | Obligatoria |
| :------------------------------- | :-------- | :----------------------------------------------- | :---------: |
| `react`                          | `19.2.3`  | Núcleo de la interfaz gráfica                    |      Sí     |
| `react-native`                   | `^0.86.2` | Framework para desarrollo nativo                 |      Sí     |
| `react-native-webview`           | `^14.0.1` | Renderización e integración de la Microapp Web   |      Sí     |
| `@reduxjs/toolkit`               | `^2.12.0` | Almacén y gestión del estado global              |      Sí     |
| `react-redux`                    | `^9.3.0`  | Integración de Redux con React                   |      Sí     |
| `@react-navigation/native`       | `^7.3.17` | Orquestación de pantallas y navegación           |      Sí     |
| `@react-navigation/native-stack` | `^7.18.9` | Pila de navegación nativa                        |      Sí     |
| `react-native-screens`           | `^4.27.0` | Optimización de navegación y memoria             |      Sí     |
| `react-native-safe-area-context` | `^5.9.1`  | Gestión de áreas seguras en dispositivos móviles |      Sí     |
| `@react-native/new-app-screen`   | `^0.86.2` | Componentes base de pantalla inicial             |      No     |

## DevDependencies

| Dependencia                                    | Versión   | Propósito                                         | Obligatoria |
| :--------------------------------------------- | :-------- | :------------------------------------------------ | :---------: |
| `typescript`                                   | `^6.0.3`  | Tipado estático y compilación TypeScript          |      Sí     |
| `jest`                                         | `^29.6.3` | Testing unitario e integración                    |      Sí     |
| `@react-native-community/cli`                  | `20.2.0`  | Ejecución de la CLI de React Native               |      Sí     |
| `@react-native-community/cli-platform-android` | `20.2.0`  | Herramientas CLI específicas para Android         |      Sí     |
| `eslint`                                       | `^8.57.1` | Análisis estático de código JavaScript/TypeScript |      No     |
| `prettier`                                     | `^2.8.8`  | Formateo automático del código                    |      No     |

---

# Configuración nativa de Android

La siguiente configuración corresponde al proyecto Android de la Native Shell:

| Configuración       | Valor             | Archivo                    |
| :------------------ | :---------------- | :------------------------- |
| `compileSdk`        | `37`              | `android/build.gradle`     |
| `targetSdk`         | `36`              | `android/build.gradle`     |
| `minSdk`            | `24`              | `android/build.gradle`     |
| `buildToolsVersion` | `"37.0.0"`        | `android/build.gradle`     |
| `ndkVersion`        | `"27.1.12297006"` | `android/build.gradle`     |
| `kotlinVersion`     | `"2.2.0"`         | `android/build.gradle`     |
| `applicationId`     | `"com.mobile"`    | `android/app/build.gradle` |
| `namespace`         | `"com.mobile"`    | `android/app/build.gradle` |

> **Importante:** cualquier modificación de SDK, NDK, Kotlin, `applicationId` o `namespace` debe ser validada antes de integrarse al proyecto.

---

# Getting Started

## Paso 1: Iniciar Metro

**Metro** es el empaquetador de JavaScript utilizado por React Native.

Para iniciar el servidor de desarrollo de Metro, ejecutar desde la raíz del proyecto:

```bash
# Utilizando npm
npm start
```

Si el proyecto también se utiliza con Yarn:

```bash
# Utilizando Yarn
yarn start
```

Una vez iniciado Metro, mantener esta terminal abierta.

> **Nota:** Metro debe estar ejecutándose mientras se desarrolla la aplicación React Native.

---

## Paso 2: Compilar y ejecutar la aplicación

Con Metro ejecutándose, abrir una nueva terminal desde la raíz del proyecto y utilizar el comando correspondiente a la plataforma.

### Android

Para compilar y ejecutar la aplicación en Android:

```bash
# Utilizando npm
npm run android
```

O mediante Yarn:

```bash
# Utilizando Yarn
yarn android
```

Esto compilará la aplicación Android y la ejecutará en un emulador o dispositivo físico conectado.

### iOS

Para compilar y ejecutar la aplicación en iOS:

```bash
# Utilizando npm
npm run ios
```

O mediante Yarn:

```bash
# Utilizando Yarn
yarn ios
```

---

## Paso 3: Instalar dependencias de iOS

Para iOS, es necesario instalar las dependencias de **CocoaPods**.

Este paso debe ejecutarse:

* En el primer clon del proyecto.
* Después de actualizar dependencias nativas.
* Cuando se agreguen o modifiquen librerías nativas.

Desde la raíz del proyecto:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

Si el proyecto no utiliza Bundler, se puede ejecutar:

```bash
cd ios
pod install
cd ..
```

Posteriormente, ejecutar:

```bash
npm run ios
```

---

# Scripts disponibles

| Comando                 | Descripción                                                                |
| :---------------------- | :------------------------------------------------------------------------- |
| `npm run start`         | Inicia el empaquetador JavaScript Metro                                    |
| `npm run android`       | Compila y ejecuta la aplicación nativa en Android                          |
| `npm run ios`           | Compila y ejecuta la aplicación nativa en el simulador iOS                 |
| `npm run test`          | Ejecuta la suite de pruebas con Jest                                       |
| `npm run test:coverage` | Ejecuta las pruebas y genera el reporte de cobertura                       |
| `npm run type-check`    | Ejecuta la validación estática de tipos con TypeScript sin emitir archivos |
| `npm run lint`          | Ejecuta el análisis estático mediante ESLint                               |

---

# Comunicación Bridge — Native ↔ Web

La Native Shell se comunica con la Microapp Web mediante `react-native-webview`.

El Bridge permite intercambiar mensajes en ambas direcciones:

```text
Microapp Web
     │
     │ Web → Native
     ▼
┌─────────────────┐
│     WebView     │
│      Bridge     │
└────────┬────────┘
         │
         ▼
  Native Shell
         │
         │ Native → Web
         ▼
   Microapp Web
```

---

## Web → Native

La Native Shell recibe los mensajes enviados desde la Microapp Web mediante el evento `onMessage` del `WebView`.

```typescript
import type { WebViewMessageEvent } from 'react-native-webview';

const handleOnMessage = (
  event: WebViewMessageEvent,
): void => {
  try {
    const data: BridgeMessage = JSON.parse(
      event.nativeEvent.data,
    );

    if (data.type === 'HU01_INIT_SESSION') {
      // Procesar el payload recibido desde la Microapp.
      // Actualizar el estado global mediante Redux cuando corresponda.
    }
  } catch (error) {
    console.error(
      '[Bridge] Error al procesar el mensaje recibido desde Web.',
      error,
    );
  }
};
```

La Microapp Web envía el mensaje utilizando:

```typescript
window.ReactNativeWebView?.postMessage(
  JSON.stringify(message),
);
```

---

## Native → Web

La Native Shell puede enviar información a la Microapp mediante `injectJavaScript`.

Una implementación recomendada es:

```typescript
import type { RefObject } from 'react';
import type { WebView } from 'react-native-webview';

const sendMessageToWeb = (
  webViewRef: RefObject<WebView>,
  message: BridgeMessage,
): void => {
  const jsonString = JSON.stringify(message);

  webViewRef.current?.injectJavaScript(`
    if (window.receiveFromNative) {
      window.receiveFromNative(${JSON.stringify(jsonString)});
    }

    true;
  `);
};
```

> **Importante:** se utiliza `JSON.stringify()` tanto para serializar el mensaje como para escapar correctamente el contenido que será inyectado en JavaScript. Esto evita errores cuando el payload contiene comillas, saltos de línea u otros caracteres especiales.

---

# Contrato de mensajes del Bridge

Los mensajes intercambiados entre la Native Shell y la Microapp Web deben utilizar un contrato común y tipado.

Estructura base:

```typescript
export type BridgeMessage<T = unknown> = {
  type: string;
  payload?: T;
};
```

Ejemplo de un mensaje:

```typescript
type InitSessionPayload = {
  sessionId: string;
};

const message: BridgeMessage<InitSessionPayload> = {
  type: 'HU01_INIT_SESSION',
  payload: {
    sessionId: '123456',
  },
};
```

---

# Buenas prácticas del Bridge

Al implementar nuevos eventos se deben seguir las siguientes recomendaciones:

* Utilizar nombres de eventos únicos y descriptivos.
* Mantener los contratos tipados mediante TypeScript.
* Validar los mensajes antes de procesarlos.
* Manejar errores de `JSON.parse`.
* Evitar el uso de `any`.
* Documentar cualquier nuevo evento del Bridge.
* Mantener compatibilidad entre la Native Shell y la Microapp Web.
* No enviar información sensible innecesariamente.
* Mantener aislada la lógica del Bridge de los componentes visuales.
* No asumir que la Microapp siempre se ejecutará dentro de React Native.

---

# Estructura recomendada

Una estructura de referencia para la Native Shell es:

```text
mobile/
├── android/
├── ios/
├── src/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   ├── store/
│   ├── bridge/
│   ├── services/
│   ├── types/
│   └── App.tsx
├── __tests__/
├── package.json
├── tsconfig.json
├── eslint.config.js
├── .prettierrc
├── .nvmrc
└── README.md
```

La estructura puede variar de acuerdo con las necesidades del proyecto, pero se recomienda mantener separadas las responsabilidades de:

* Pantallas.
* Navegación.
* Estado global.
* Comunicación Bridge.
* Servicios.
* Componentes reutilizables.
* Tipos e interfaces.
* Pruebas.

---

# Estándares de código

El código debe desarrollarse utilizando **TypeScript** y mantenerse alineado con las reglas configuradas en ESLint y Prettier.

## TypeScript

Evitar el uso de `any` cuando exista la posibilidad de definir un contrato específico.

### Evitar

```typescript
const handleMessage = (message: any) => {
  // ...
};
```

### Preferir

```typescript
type BridgeMessage<T = unknown> = {
  type: string;
  payload?: T;
};

const handleMessage = (
  message: BridgeMessage,
): void => {
  // Procesar mensaje.
};
```

## Comentarios

Los comentarios deben explicar **por qué** existe una determinada lógica cuando esta no sea evidente por el código.

### Correcto

```typescript
// El mensaje se envía utilizando JSON.stringify adicionalmente
// para evitar problemas de escape al inyectar el contenido
// dentro del contexto JavaScript del WebView.
const jsonString = JSON.stringify(message);

webViewRef.current?.injectJavaScript(`
  if (window.receiveFromNative) {
    window.receiveFromNative(${JSON.stringify(jsonString)});
  }

  true;
`);
```

### Evitar

```typescript
// Convierte el mensaje a JSON.
const jsonString = JSON.stringify(message);
```

---

# Flujo de desarrollo

El flujo recomendado para trabajar con la solución completa es:

```text
1. Instalar Node.js 22.19.0
          │
          ▼
2. Instalar dependencias de Mobile
          │
          ▼
3. Instalar dependencias de la Microapp Web
          │
          ▼
4. Iniciar la Microapp con Vite
          │
          ▼
5. Iniciar Metro
          │
          ▼
6. Ejecutar Native Shell
          │
          ▼
7. Cargar la Microapp dentro del WebView
          │
          ▼
8. Validar comunicación Native ↔ Web
          │
          ▼
9. Ejecutar type-check + lint + tests
```

---

# Validaciones antes de un Pull Request

Antes de crear un Pull Request se deben ejecutar las siguientes validaciones:

```bash
npm run type-check
npm run lint
npm run test
```

Checklist:

* [ ] Node.js `22.19.0` instalado.
* [ ] `.nvmrc` configurado con `22.19.0`.
* [ ] `node --version` retorna `v22.19.0`.
* [ ] Dependencias instaladas correctamente.
* [ ] Metro inicia correctamente.
* [ ] Android compila y ejecuta correctamente.
* [ ] iOS compila y ejecuta correctamente cuando aplique.
* [ ] La Microapp Web carga correctamente dentro del `WebView`.
* [ ] Los mensajes Web → Native funcionan correctamente.
* [ ] Los mensajes Native → Web funcionan correctamente.
* [ ] Los contratos del Bridge están tipados.
* [ ] Los nuevos eventos del Bridge están documentados.
* [ ] `npm run type-check` finaliza correctamente.
* [ ] `npm run lint` finaliza correctamente.
* [ ] `npm run test` finaliza correctamente.
* [ ] No se utiliza `any` innecesariamente.
* [ ] Los comentarios agregados explican decisiones o comportamientos no evidentes.
* [ ] No se incluyen credenciales, tokens ni información sensible en el repositorio.

---

# Resumen tecnológico

| Capa            | Tecnología                 |
| :-------------- | :------------------------- |
| Native Shell    | React Native CLI           |
| Lenguaje        | TypeScript                 |
| UI Native       | React Native               |
| Web Container   | `react-native-webview`     |
| Navegación      | React Navigation           |
| Estado global   | Redux Toolkit              |
| Microapp Web    | React + Vite + TypeScript  |
| Runtime         | Node.js `22.19.0`          |
| Package Manager | npm                        |
| Testing         | Jest                       |
| Linting         | ESLint                     |
| Formateo        | Prettier                   |
| Android         | Android SDK + React Native |
| iOS             | Xcode + CocoaPods          |
| Comunicación    | Native ↔ Web Bridge        |
