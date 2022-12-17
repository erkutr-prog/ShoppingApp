import { Navigation } from "react-native-navigation";

import ProductsWrapper from './src/screens/Products/ProductsWrapper'
import FavouritesWrapper from  './src/screens/Favourites/FavouritesWrapper';
import ExploreWrapper from './src/screens/Explore/ExploreWrapper';
import ProductDetails from './src/screens/ProductDetails/ProductDetails'

Navigation.registerComponent('ProductsWrapper', () => ProductsWrapper);
Navigation.registerComponent('ExploreWrapper', () => ExploreWrapper);
Navigation.registerComponent('FavouritesWrapper', () => FavouritesWrapper);
Navigation.registerComponent('ProductDetails', () => ProductDetails);
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