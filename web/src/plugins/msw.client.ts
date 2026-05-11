export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();

  if (!import.meta.dev || config.public.useMsw !== "true") {
    return;
  }

  const { worker } = await import("../mocks/browser");

  await worker.start({
    onUnhandledRequest: "bypass",
  });
});
