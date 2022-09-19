export interface TaskListProps<T> {
  items?: T[];
  renderItem: (item: any, index: number) => JSX.Element;
  customScroll?: boolean;
}

