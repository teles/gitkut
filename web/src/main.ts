import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

async function enableMocking() {
  if (!import.meta.env.DEV || import.meta.env.VITE_USE_MSW !== "true") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  await worker.start({
    onUnhandledRequest: "bypass",
  });
}

void enableMocking().then(() => {
  createApp(App).mount("#app");
});
