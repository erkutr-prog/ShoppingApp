import { Navigation } from "react-native-navigation";

import ProductsWrapper from './src/screens/Products/ProductsWrapper'
import FavouritesWrapper from  './src/screens/Favourites/FavouritesWrapper';
import ExploreWrapper from './src/screens/Explore/ExploreWrapper';
import CartWrapper from './src/screens/Cart/CartWrapper'
import ProductDetails from './src/screens/ProductDetails/ProductDetails'
import ProductDetailsWrapper from './src/screens/ProductDetails/ProductDetailsWrapper';

Navigation.registerComponent('ProductsWrapper', () => ProductsWrapper);
Navigation.registerComponent('ExploreWrapper', () => ExploreWrapper);
Navigation.registerComponent('FavouritesWrapper', () => FavouritesWrapper);
Navigation.registerComponent('CartWrapper', () => CartWrapper)
Navigation.registerComponent('ProductDetails', () => ProductDetails);
Navigation.registerComponent('ProductDetailsWrapper', () => ProductDetailsWrapper)
Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'ProductsWrapper',
            },
          },
        ],
      },
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        options: {
          bottomTabs: {
            tabsAttachMode: 'onSwitchToTab',
          },
        },
        children: [
          {
            stack: {
              id: 'PRODUCTS_TAB',
              children: [
                {
                  component: {
                    id: 'PRODUCTS_SCREEN',
                    name: 'ProductsWrapper',
                  },
                },
              ],
              options: {
                bottomTab: {
                  //icon: agentIconOutline,
                  text: 'Products',
                  //selectedIcon: agentIcon,
                },
              },
            },
          },
          {
            stack: {
              id: 'EXPLORE_TAB',
              children: [
                {
                  component: {
                    id: 'EXPLORE_SCREEN',
                    name: 'ExploreWrapper',
                  },
                },
              ],
              options: {
                bottomTab: {
                  //icon: weaponIconOutline,
                  text: 'Explore',
                  //selectedIcon: weaponIcon,
                },
              },
            },
          },
          {
            stack: {
              id: 'CART_TAB',
              children: [
                {
                  component: {
                    id: 'CART_SCREEN',
                    name: 'CartWrapper',
                  },
                },
              ],
              options: {
                bottomTab: {
                  //icon: weaponIconOutline,
                  text: 'Cart',
                  //selectedIcon: weaponIcon,
                },
              },
            },
          },
          {
            stack: {
              id: 'FAVOURITES_TAB',
              children: [
                {
                  component: {
                    id: 'FAVOURITES_SCREEN',
                    name: 'FavouritesWrapper',
                  },
                },
              ],
              options: {
                bottomTab: {
                  //icon: weaponIconOutline,
                  text: 'Favourites',
                  //selectedIcon: weaponIcon,
                },
              },
            },
          },
        ],
      },
    },
  });
});

Navigation.setDefaultOptions({
  topBar: {
    title: {
      fontFamily: 'helvetica'
    },
    backButton: {
      fontFamily: 'helvetica'
    }
  },
  bottomTab: {
    fontFamily: 'helvetica'
  },
  
})