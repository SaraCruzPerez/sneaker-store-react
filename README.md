# 👟 Sneaker e-Commerce – High Performance & Testing Focus

Proyecto de e-commerce profesional desarrollado con **React** y **TypeScript**. Construido íntegramente desde cero (desde el diseño de interfaz enfocado en usabilidad hasta la arquitectura frontend) y evolucionado a un entorno robusto, completamente tipado y testeado para garantizar la máxima estabilidad y accesibilidad (WCAG).

<br />

<div align="center">    
    <img src="./screenshots/home-desktop.webp" width="63.5%" style="margin: 10px;" alt="Desktop Home"> 
    <img src="./screenshots/home-mobile.webp" width="15%" style="margin: 10px;" alt="Mobile Home"> 
</div>

<br />

---

## 🚀 [Ver Demo en Vivo →](https://sneaker-store-react.vercel.app)

<br />

<div align="center">    
    <img src="./screenshots/checkout-experience.gif" width="85%" style="margin: 10px;" alt="Demo del flujo de compra"> 
</div>


<br />


---

## 🛠️ Stack Técnico

<br />

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

<br />

---

## 💎 Características Clave

- **TypeScript:** Tipado completo de modelos de datos, props y contextos globales para eliminar errores en tiempo de ejecución.
- **Checkout Multi-paso:** Flujo complejo de pago (Envío → Pago → Confirmación) con persistencia de estado y validaciones en tiempo real.
- **Accesibilidad (A11y):** Implementación de estándares WCAG, navegación por teclado y atributos ARIA.
- **Geolocalización:** Integración con Leaflet y OpenStreetMap para localización dinámica de tiendas.
- **Arquitectura de Estilos:** Metodología BEM para un CSS mantenible y escalable.

<br />

---

## 🧪 Calidad de Código (Testing)

Este proyecto prioriza la estabilidad. He implementado una suite de pruebas  con **Vitest** y **React Testing Library**.

- **Cobertura:** >98% en lógica de negocio y componentes críticos.
- **Pruebas de Integración:** Validación del flujo completo del carrito y checkout.
- **Unit Testing:** Pruebas unitarias para reducers, hooks personalizados y utilidades de formato.

<div align="center">    
    <img src="./screenshots/testing.png" width="75%" style="margin: 20px;" alt="Testing Report"> 
</div>

---

## 🧠 Desafíos Técnicos y Aprendizajes

- **Migración a TS:** El mayor reto fue definir las interfaces para el estado global del proyecto. Aprendí a usar _Generics_ y a tipar correctamente la _Context API_, mejorando la DX (Developer Experience).
- **Gestión de Estado:** Sincronizar el stock en tiempo real entre diferentes vistas sin perder rendimiento.
- **Refactorización vía Testing:** Aprendí que el testing no es solo para buscar errores, sino que permite refactorizar código complejo con la seguridad de no romper funcionalidades existentes.

<br />

---

## ⚙️ Instalación y Uso

1. Clonar el repositorio: `git clone https://github.com/SaraCruzPerez/sneaker-store-react`
2. Instalar dependencias: `npm install`
3. Ejecutar proyecto: `npm run dev`
4. Ejecutar Tests: `npm run test`

---

Desarrollado por **Sara Cruz** - Especialista en Frontend & Accesibilidad.
