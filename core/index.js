export default function createApp(rootComponent) {
  return {
    mount() {
      rootComponent.setup();
    }
  }
}