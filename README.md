# ⚽ Predicción Copa de la Liga - LPF Argentina 2023

## 📝 Descripción

Webapp realizada con node + express que a través de una vista en ejs muestra una predicción de como podría terminar la tabla anual (copas + descensos) en el campeonato Argentino de 2023. Se obtienen los datos a través de scraping de una página de resultados de fútbol y se calcula el % de rendimiento de cada equipo en base a los partidos jugados hasta el momento.

Luego se simulan los partidos que faltan jugarse y se calcula la tabla final. Al estar conectado a una fuente de datos en tiempo real, la tabla se actualiza automáticamente a medida que se van jugando los partidos, incluso si el partido se está jugando en ese momento.

> [!WARNING]
> La Copa de La Liga 2023 ya ha finalizado, por lo que el programa mostrará las posiciones finales

## 🔍 Instrucciones

1. Clonar el repositorio

```bash
git clone https://github.com/fedekrenn/prediccion-copa-de-la-liga.git
```

2. Instalar dependencias

```bash
npm install
```

3. Ejecutar la aplicación

```bash
npm start
```

4. Navegar a 

```
http://localhost:3000
```

## 🛠 Tecnologías utilizadas

- Node.js
- Express
- EJS
- article-extractor
- cheerio


<br>

## 🙋‍♂️ Hola, Soy Federico Krenn
:nerd_face: Desarrollador web Fullstack
<br>
👨‍🎓 Realizando la Tecnicatura en Desarrollo Web en ISPC y Tecnicatura en Software Libre en la UNL
<br>
📫 Conectemos en Linkedin: https://www.linkedin.com/in/fkrenn/
