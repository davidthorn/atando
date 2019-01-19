import { Router } from './Router';
export class AppNavigator implements Router {
    
    shouldRender?: (route: string, args: any) => void;
    
    navigate(routeName: string, args: { [key:string] : any }): void {
        console.log('route to ', routeName);
        if (this.shouldRender === undefined)
            return;
        this.shouldRender(routeName, args);
        
    }
}
