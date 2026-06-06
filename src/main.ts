import "./style.css";
import { GenerateChildrenStoryUseCase } from "./core/application/GenerateChildrenStoryUseCase";
import { AiStoryProvider } from "./core/infrastructure/provider";

const generateBtn = document.getElementById("generateBtn") as HTMLButtonElement;
const storyOutput = document.getElementById("storyOutput") as HTMLDivElement;
const themeInput = document.getElementById("themeInput") as HTMLInputElement;
const storyForm = document.getElementById("storyForm") as HTMLFormElement;

const generateStoryUseCase = new GenerateChildrenStoryUseCase(new AiStoryProvider());
let loadingStory = false;

storyForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (loadingStory) return;

  const userTheme = themeInput.value;

  generateBtn.disabled = true;
  generateBtn.innerText = "Creando...";
  storyOutput.innerHTML = `<p class="loading">✨ Tu historia se está tejiendo entre las estrellas...</p>`;

  loadingStory = true;
  const story = await generateStoryUseCase.execute({ keywords: userTheme });

  storyOutput.innerHTML = `
    <h2 class="story-title">${story.title}</h2>
    <p>${story.content}</p>
    <img class="story-image" src="${story.imageUrl}" alt="Ilustración del cuento"/>
`;

  loadingStory = false;
  generateBtn.disabled = false;
  generateBtn.innerText = "Crear Cuento";
});
