export default class HealthzAction {
  async invoke() {
    return { status: "ok" };
  }
}
