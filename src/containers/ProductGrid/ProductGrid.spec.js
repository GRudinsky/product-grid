import { mount } from 'enzyme';
import ProductGrid from './ProductGrid';
import { list } from '../../utils/services';
const products = [
  {
    productId: 100024698,
    name: 'Rose Gold Shimmer Clutch Bag',
    description:
      '• Shimmer finish\n• Pleat design\n• Magnetic closure\n• Inner pocket\n• Detachable chain strap',
    price: 9.09,
    priceWas: 12.99,
    available: 'TRUE',
    quantity: 96,
    lowOnStock: 'FALSE',
    promotionBadge: '30% OFF',
    imageUrl: 'https://i8.amplience.net/i/Quiz/00100024698_XM?w=1024'
  },
  {
    productId: 100024699,
    name: 'Blue Jewel Clutch Bag',
    description:
      '• Jewel finish\n• Silver colour frame\n• Clip closure\n• Detachable chain strap\n• Synthetic',
    price: 9.99,
    priceWas: 18.99,
    available: 'TRUE',
    quantity: 3,
    lowOnStock: 'FALSE',
    promotionBadge: '47% OFF',
    imageUrl: 'https://i8.amplience.net/i/Quiz/00100024699_XM?w=1024'
  }
];
// jest.mock('../../utils/services', () => {
//   return { list: () => products };
// });
jest.mock('../../utils/services');

describe('<ProductGrid />', () => {
  let wrapper;
  let props;

  describe('With SUCCESS response', () => {
    beforeEach(() => {
      list.mockImplementationOnce(() => products);
      wrapper = mount(<ProductGrid {...props} />);
    });

    afterEach(() => {
      wrapper = null;
      jest.resetAllMocks();
    });

    it('should display Loading message before receiving the response', () => {
      const newWrapper = mount(<ProductGrid {...props} />);
      const component = newWrapper.find('#loadingMessage');
      expect(component).toHaveLength(1);
    });

    it('should display 2 product cards with SUCCESS response', () => {
      wrapper.update();
      const component = wrapper.find('ProductCard');
      expect(component).toHaveLength(2);
    });
  });

  describe('With Error response', () => {
    beforeEach(() => {
      list.mockImplementationOnce(() => new Error('Some Error'));
      wrapper = mount(<ProductGrid {...props} />);
    });

    afterEach(() => {
      wrapper = null;
      jest.resetAllMocks();
    });

    it('should Error component with Error response', () => {
      wrapper.update();
      const component = wrapper.find('#errorMessage');
      expect(component).toHaveLength(1);
    });
  });
});
