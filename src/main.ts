import { GenerateChildrenStory } from "./core/application/GenerateChildrenStory";
import { AiStoryProvider } from "./core/infrastructure/provider";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <div class="container">
    <h1>✨ Fábrica de Cuentos</h1>
    <form id="storyForm" class="input-section">
      <input type="text" id="themeInput" placeholder="Ej: un valiente caballero..." required>
      <button type="submit" id="generateBtn">Crear Cuento</button>
    </form>
    <div id="storyOutput" class="story-box">
      <p>Escribe una idea y presiona el botón para empezar la aventura.</p>
    </div>
  </div>
`;

const generateBtn = document.getElementById("generateBtn") as HTMLButtonElement;
const storyOutput = document.getElementById("storyOutput") as HTMLDivElement;
const themeInput = document.getElementById("themeInput") as HTMLInputElement;
const storyForm = document.getElementById("storyForm") as HTMLFormElement;

const generateStoryUseCase = new GenerateChildrenStory(new AiStoryProvider());
let loadingStory = false;

storyForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (loadingStory) return;

  const userTheme = themeInput.value;

  generateBtn.disabled = true;
  generateBtn.innerText = "Creando...";
  storyOutput.innerHTML = `<p class="loading">✨ Tu historia se está tejiendo entre las estrellas...</p>`;

  try {
    loadingStory = true;
    const story = await generateStoryUseCase.execute({ keywords: userTheme });

    storyOutput.innerHTML = `
    <h2 class="story-title">${story.title}</h2>
    <p>${story.content}</p>
    <img class="story-image" src="${story.imageUrl}" alt="Ilustración del cuento"/>
`;
  } catch {
    storyOutput.innerHTML = "<p>Hubo un error al conectar con el reino mágico.</p>";
  } finally {
    loadingStory = false;
    generateBtn.disabled = false;
    generateBtn.innerText = "Crear Cuento";
  }
});
