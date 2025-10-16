# Mundo Geek

!['Logo Azamon'](assets/icon.png)

Proyecto desarrollado para el curso **Desarrollo de Aplicaciones** de Coderhouse.

Esta aplicación está construida con **Expo SDK 54** y utiliza las siguientes tecnologías y librerías:

- React Native
- React Navigation
- Expo SQLite
- yup
- Componentes personalizados (`custom components`)
- Redux Toolkit (RTK) y RTK Query
- Firebase para Realtime Database y Autenticación

---

## Requisitos previos

Antes de instalar y ejecutar la app, necesitás tener instalados:

- [Node.js](https://nodejs.org/) (versión 20 o superior recomendada)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (global)
- [Git](https://git-scm.com/)
- Una cuenta de Firebase con proyecto configurado (opcional, para autenticación y base de datos). (Aclarar estructura de datos)

---

## Instalación y configuración

1. Cloná el repositorio:

git clone https://https://github.com/roela12/proyecto-react-native-coder
cd proyecto-react-native-coder

2. Instalá las dependencias:

npm i

3. Configurá las variables de entorno para Firebase

Crea un archivo .env en la raíz del proyecto con las siguientes variables (usá tus datos de Firebase):

EXPO_PUBLIC_BASE_URL_RTDB
EXPO_PUBLIC_BASE_URL_AUTH
EXPO_PUBLIC_FIREBASE_API_KEY

4. Iniciá la aplicación en modo desarrollo:

```
npx expo start
```

5. Abre la aplicación en un emulador o en un celular con Expo Go
