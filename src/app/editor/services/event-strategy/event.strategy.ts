export interface EventStrategy {
  shouldExecute(event: Event, element: HTMLElement): boolean;
  execute(event: Event, element: HTMLElement): void;
}
