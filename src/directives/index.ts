import { type App, type Plugin } from 'vue';
import { TitleDirective } from './title';

export function createDirective(): Plugin {
    return (app: App) => {
        app.directive('zre-title', TitleDirective);
        
    };
}