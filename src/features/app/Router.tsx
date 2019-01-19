export interface Router {
  navigate(routeName: string, args: { [key:string] : any }): void;
}
