export class EventHandlers {
  public static onClickRoute(event: Event): void {
    if (event.target instanceof Element) {
      const pageAttribute = event.target.getAttribute('page') as string | null;
      if (pageAttribute !== null) {
        window.location.href = pageAttribute;
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }
  }
}
