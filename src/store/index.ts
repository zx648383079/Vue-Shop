import { createStore } from 'vuex';
import { AuthModule } from './modules/auth';
import { ShopModule } from './modules/shop';

const store = createStore({});

export const authModule = new AuthModule({store, name: 'auth'});
export const shopModule = new ShopModule({store, name: 'shop'});

export default store;
