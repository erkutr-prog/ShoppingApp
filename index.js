import { Navigation } from "react-native-navigation";

import ProductsWrapper from './src/screens/Products/ProductsWrapper'
import FavouritesWrapper from  './src/screens/Favourites/FavouritesWrapper';
import ExploreWrapper from './src/screens/Explore/ExploreWrapper';
import CartWrapper from './src/screens/Cart/CartWrapper'
import ProductDetails from './src/screens/ProductDetails/ProductDetails'
import ProductDetailsWrapper from './src/screens/ProductDetails/ProductDetailsWrapper';
import PurchaseWrapper from "./src/screens/Purchase/PurchaseWrapper";
import TopButtonModal from "./src/components/TopButtonModal";
import AddressList from "./src/components/AddressList";
import AddAddress from "./src/components/AddAddress";

Navigation.registerComponent('ProductsWrapper', () => ProductsWrapper);
Navigation.registerComponent('ExploreWrapper', () => ExploreWrapper);
Navigation.registerComponent('FavouritesWrapper', () => FavouritesWrapper);
Navigation.registerComponent('CartWrapper', () => CartWrapper)
Navigation.registerComponent('ProductDetails', () => ProductDetails);
Navigation.registerComponent('ProductDetailsWrapper', () => ProductDetailsWrapper);
Navigation.registerComponent('PurchaseWrapper', () => PurchaseWrapper);
Navigation.registerComponent('TopButtonModal', () => TopButtonModal);
Navigation.registerComponent('AddressList', () => AddressList);
Navigation.registerComponent('AddAddress', () => AddAddress);

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
                  icon: require('./src/assets/icons/shopping-outline.png'),
                  text: 'Products',
                  selectedIcon: require('./src/assets/icons/shopping.png'),
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
                  icon: require('./src/assets/icons/compass-outline.png'),
                  text: 'Explore',
                  selectedIcon: require('./src/assets/icons/compass.png'),
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
                  icon: require('./src/assets/icons/cart-outline.png'),
                  text: 'Cart',
                  selectedIcon: require('./src/assets/icons/cart.png'),
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
                  icon: require('./src/assets/icons/heart-outline.png'),
                  text: 'Favourites',
                  selectedIcon: require('./src/assets/icons/heart.png'),
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