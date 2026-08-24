# KATA — Web Microapp

## Descripción

El proyecto `web` contiene la **Microapp Web** embebida en la solución. Está construida sobre **React 19**, **Vite** y **TypeScript**, y provee la interfaz gráfica web que se despliega de forma remota o local dentro del `WebView` de la Native Shell.

La Microapp Web debe ejecutarse utilizando obligatoriamente **Node.js `22.19.0`**.

### Stack tecnológico

| Tecnología | Versión                          | Propósito                                     |
| :--------- | :------------------------------- | :-------------------------------------------- |
| React      | `^19.2.8`                        | Construcción de la interfaz de usuario        |
| React DOM  | `^19.2.8`                        | Renderización de la aplicación en Web         |
| Vite       | `^8.2.0`                         | Servidor de desarrollo y herramienta de build |
| TypeScript | `~6.0.2`                         | Tipado estático y desarrollo seguro           |
| Node.js    | **`22.19.0`**                    | Runtime requerido para el proyecto            |
| npm        | Compatible con Node.js `22.19.0` | Gestión de dependencias                       |

> **Importante:** esta Microapp debe desarrollarse y ejecutarse utilizando **Vite + TypeScript sobre Node.js `22.19.0`**. No se debe utilizar una versión diferente de Node.js para instalar dependencias, ejecutar Vite o generar el build.

---

## Requisitos previos

Antes de instalar o ejecutar el proyecto, es necesario tener instalado **Node.js `22.19.0`**.

### Validar Node.js

Ejecutar:

```bash
node --version
```

El resultado esperado es:

```text
v22.19.0
```

También se puede validar la versión de npm:

```bash
npm --version
```

### Uso recomendado de NVM

Se recomienda utilizar **NVM (Node Version Manager)** para garantizar que todos los desarrolladores utilicen exactamente la misma versión de Node.js.

Instalar Node.js `22.19.0`:

```bash
nvm install 22.19.0
```

Activar la versión:

```bash
nvm use 22.19.0
```

Validar:

```bash
node --version
```

Debe retornar:

```text
v22.19.0
```

Para establecerla como versión predeterminada:

```bash
nvm alias default 22.19.0
```

### Archivo `.nvmrc`

Se recomienda mantener un archivo `.nvmrc` en la raíz del proyecto:

```text
22.19.0
```

De esta manera, si se utiliza NVM, la versión correcta puede activarse simplemente con:

```bash
nvm use
```

---

## Instalación

Clonar el repositorio y acceder al proyecto:

```bash
git clone <repository-url>
cd web
```

Verificar que se está utilizando la versión correcta de Node.js:

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

> Se recomienda ejecutar `npm install` únicamente después de verificar que Node.js corresponde a la versión `22.19.0`.

---

## Dependencias

### Dependencies — Runtime

| Dependencia | Versión   | Propósito                                  | Obligatoria |
| :---------- | :-------- | :----------------------------------------- | :---------: |
| `react`     | `^19.2.8` | Librería núcleo para construcción de la UI |      Sí     |
| `react-dom` | `^19.2.8` | Renderizador de React para Web             |      Sí     |

### DevDependencies

| Dependencia            | Versión    | Propósito                                         | Obligatoria |
| :--------------------- | :--------- | :------------------------------------------------ | :---------: |
| `vite`                 | `^8.2.0`   | Empaquetador y servidor de desarrollo             |      Sí     |
| `@vitejs/plugin-react` | `^6.0.4`   | Plugin oficial de React para Vite                 |      Sí     |
| `typescript`           | `~6.0.2`   | Tipado estático y compilación TypeScript          |      Sí     |
| `eslint`               | `^10.8.0`  | Análisis estático de código JavaScript/TypeScript |      No     |
| `@types/react`         | `^19.2.17` | Definiciones de tipos para React                  |      Sí     |
| `@types/react-dom`     | `^19.2.3`  | Definiciones de tipos para React DOM              |      Sí     |

---

## Scripts disponibles

| Comando           | Descripción                                                                        |
| :---------------- | :--------------------------------------------------------------------------------- |
| `npm run dev`     | Levanta el servidor local de desarrollo utilizando Vite                            |
| `npm run build`   | Ejecuta la comprobación de tipos mediante `tsc -b` y genera el build de producción |
| `npm run preview` | Sirve localmente los archivos compilados de producción para previsualizar el build |
| `npm run lint`    | Ejecuta el análisis estático del código mediante ESLint                            |

### Desarrollo

Para iniciar la Microapp en modo desarrollo:

```bash
npm run dev
```

Vite mostrará en consola la URL local donde estará disponible la aplicación.

### Build de producción

Para validar los tipos y generar el build:

```bash
npm run build
```

Este comando debe completar correctamente antes de generar una versión desplegable de la Microapp.

### Preview del build

Para probar localmente el resultado generado:

```bash
npm run preview
```

### Lint

Para ejecutar las validaciones de ESLint:

```bash
npm run lint
```

---

## Estructura recomendada

La Microapp debe mantener una estructura organizada y orientada a componentes:

```text
web/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── bridge.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── .nvmrc
└── README.md
```

La estructura puede adaptarse a las necesidades de la Microapp, pero se recomienda mantener separadas las responsabilidades de:

* Componentes de UI.
* Hooks.
* Servicios.
* Tipos e interfaces.
* Comunicación con Native.
* Configuración de Vite.
* Configuración de TypeScript.

---

# Implementación del Bridge en la Web

La Microapp Web se comunica con la **Native Shell** mediante el Bridge expuesto por `react-native-webview`.

La comunicación contempla dos direcciones:

```text
┌─────────────────────┐
│    Microapp Web     │
│                     │
│ Vite + React + TS   │
└──────────┬──────────┘
           │
           │ Web → Native
           │
           ▼
┌─────────────────────┐
│      WebView        │
│       Bridge        │
└──────────┬──────────┘
           │
           │ Native → Web
           │
           ▼
┌─────────────────────┐
│    Native Shell     │
│   React Native CLI  │
└─────────────────────┘
```

---

## Web → Native

Para enviar información desde la Microapp hacia la Native Shell se utiliza:

```typescript
window.ReactNativeWebView.postMessage();
```

Una implementación recomendada es:

```typescript
export type BridgeMessage<T = unknown> = {
  type: string;
  payload?: T;
};

/**
 * Envía un mensaje desde la Microapp Web hacia la Native Shell.
 *
 * La comunicación se realiza mediante el mecanismo de mensajería
 * proporcionado por react-native-webview.
 */
export const sendToNative = <T,>(
  message: BridgeMessage<T>,
): void => {
  if (!window.ReactNativeWebView) {
    console.warn(
      '[Bridge] ReactNativeWebView no está disponible.',
    );

    return;
  }

  window.ReactNativeWebView.postMessage(
    JSON.stringify(message),
  );
};
```

### Ejemplo de uso

```typescript
sendToNative({
  type: 'HU01_INIT_SESSION',
  payload: {
    sessionId: '123456',
  },
});
```

> **Nota:** `window.ReactNativeWebView` estará disponible cuando la aplicación se ejecute dentro del `WebView` de React Native. Durante el desarrollo directo en un navegador puede no existir.

---

## Native → Web

Para recibir mensajes enviados desde la Native Shell, esta expone una función global que la Microapp puede consumir:

```typescript
window.receiveFromNative = (jsonString: string): void => {
  const message: BridgeMessage = JSON.parse(jsonString);

  if (message.type === 'HU01_SESSION_RESPONSE') {
    // Procesar la respuesta enviada por Native.
    // Por ejemplo, actualizar el estado de sesión de la Microapp.
  }
};
```

Una implementación más segura debe contemplar el manejo de errores de parsing:

```typescript
window.receiveFromNative = (
  jsonString: string,
): void => {
  try {
    const message: BridgeMessage =
      JSON.parse(jsonString);

    switch (message.type) {
      case 'HU01_SESSION_RESPONSE':
        // Procesar la sesión entregada por Native.
        break;

      default:
        console.warn(
          `[Bridge] Tipo de mensaje no soportado: ${message.type}`,
        );
    }
  } catch (error) {
    console.error(
      '[Bridge] Error al procesar el mensaje recibido desde Native.',
      error,
    );
  }
};
```

---

## Tipado de las APIs globales

Como `ReactNativeWebView` y `receiveFromNative` son propiedades globales que no forman parte del DOM estándar, se recomienda declarar sus tipos mediante una extensión de `Window`.

Por ejemplo:

```typescript
export type BridgeMessage<T = unknown> = {
  type: string;
  payload?: T;
};

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };

    receiveFromNative?: (
      jsonString: string,
    ) => void;
  }
}
```

Esto permite utilizar las APIs del Bridge sin recurrir a `any`:

```typescript
window.ReactNativeWebView?.postMessage(
  JSON.stringify({
    type: 'HU01_INIT_SESSION',
    payload: {
      sessionId: '123456',
    },
  }),
);
```

---

# Contrato de mensajes

Todos los mensajes intercambiados entre la Microapp Web y la Native Shell deben utilizar un contrato común.

La estructura base recomendada es:

```typescript
export type BridgeMessage<T = unknown> = {
  type: string;
  payload?: T;
};
```

Para mensajes específicos se recomienda utilizar tipos especializados:

```typescript
export type InitSessionPayload = {
  sessionId: string;
};

export type SessionResponsePayload = {
  token: string;
  expiresAt: string;
};

export type InitSessionMessage =
  BridgeMessage<InitSessionPayload>;

export type SessionResponseMessage =
  BridgeMessage<SessionResponsePayload>;
```

Ejemplo:

```typescript
const message: InitSessionMessage = {
  type: 'HU01_INIT_SESSION',
  payload: {
    sessionId: '123456',
  },
};

sendToNative(message);
```

---

# Recomendaciones para el Bridge

Al implementar nuevos mensajes se deben seguir las siguientes reglas:

1. Utilizar un `type` único y descriptivo.
2. Definir el `payload` mediante TypeScript.
3. Validar los mensajes recibidos.
4. Manejar errores de `JSON.parse`.
5. Evitar el uso de `any`.
6. Documentar nuevos eventos del Bridge.
7. Mantener compatibilidad entre la versión Web y la Native Shell.
8. No enviar información sensible innecesariamente.
9. No asumir que `window.ReactNativeWebView` siempre está disponible.
10. Mantener aislada la lógica del Bridge de los componentes visuales.

---

# Desarrollo local

El flujo recomendado para trabajar con la Microapp es:

```text
1. Instalar Node.js 22.19.0
          │
          ▼
2. Activar Node.js 22.19.0 con NVM
          │
          ▼
3. Instalar dependencias
          │
          ▼
4. Ejecutar Vite
          │
          ▼
5. Desarrollar y probar la Microapp
          │
          ▼
6. Ejecutar type-check + lint
          │
          ▼
7. Generar build de producción
          │
          ▼
8. Integrar/probar dentro del WebView
```

Comandos:

```bash
nvm use 22.19.0
npm install
npm run dev
```

Antes de generar una versión entregable:

```bash
npm run lint
npm run build
```

---

# Estándares de código

El código debe escribirse utilizando **TypeScript** y mantener las validaciones de ESLint.

## Tipado

Se debe evitar el uso de `any` siempre que sea posible.

```typescript
// Evitar
const handleMessage = (message: any) => {
  // ...
};
```

Preferir contratos explícitos:

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

Los comentarios deben explicar **por qué** existe una determinada lógica, no simplemente describir lo que hace una línea de código.

### Correcto

```typescript
// El mensaje se envía únicamente cuando el WebView
// expone la API de React Native para evitar errores
// al ejecutar la Microapp directamente en un navegador.
if (window.ReactNativeWebView) {
  window.ReactNativeWebView.postMessage(
    JSON.stringify(message),
  );
}
```

### Evitar

```typescript
// Envía el mensaje.
window.ReactNativeWebView.postMessage(
  JSON.stringify(message),
);
```

---

# Checklist antes de un Pull Request

* [ ] Node.js `22.19.0` instalado.
* [ ] `node --version` retorna `v22.19.0`.
* [ ] Dependencias instaladas correctamente.
* [ ] La Microapp utiliza **Vite + TypeScript**.
* [ ] `npm run lint` finaliza correctamente.
* [ ] `npm run build` finaliza correctamente.
* [ ] Los mensajes Web → Native utilizan el contrato del Bridge.
* [ ] Los mensajes Native → Web están correctamente tipados.
* [ ] Los mensajes nuevos están documentados.
* [ ] No se utiliza `any` innecesariamente.
* [ ] Los comentarios explican decisiones o comportamientos no evidentes.
* [ ] No se incluyen credenciales, tokens ni información sensible.
* [ ] La Microapp funciona correctamente dentro del `WebView`.
