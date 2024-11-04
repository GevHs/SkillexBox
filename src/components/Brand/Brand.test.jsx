import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Brand from './Brand';
import { brand } from '../../constat/brand'; // Import your brand list
import { filterItems } from '../../redux/actions'; // Mock your actions

const mockStore = configureStore([]);

jest.mock('../../redux/actions', () => ({
     filterItems: jest.fn(),
     handleChangeRadio: jest.fn(),
}));

describe('Brand Component', () => {
     let store;

     beforeEach(() => {
          store = mockStore({
               search: {
                    selectedBrands: [],

               },
          });
     });

     it('renders brand list', () => {
          render(
              <Provider store={store}>
                   <Brand />
              </Provider>
          );

          brand.forEach((item) => {
               expect(screen.getByLabelText(item.brand)).toBeInTheDocument();
          });
     });

     it('handles radio button change for a brand', () => {
          render(
              <Provider store={store}>
                   <Brand />
              </Provider>
          );


          const brandARadio = screen.getByLabelText('Brand A');
          fireEvent.change(brandARadio, { target: { value: 'Brand A' } });


          expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
               type: expect.any(String),
               payload: 'Brand A',
          }));
     });

     it('dispatches filterItems action on render', () => {
          render(
              <Provider store={store}>
                   <Brand />
              </Provider>
          );

          // Check if filterItems was called with the expected argument
          expect(filterItems).toHaveBeenCalledWith(expect.any(Array)); // Adjust as necessary for your actual implementation
     });
});
