import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import { Provider } from 'react-redux';
import { LOGOUT_USER_SUCCESS, LOGOUT_USER_REQUEST, LOGOUT_USER_FAIL } from '../../../redux/actions/actionTypes';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);

let store: any;

beforeEach(() => {
    store = mockStore({
        auth: {
          data: {},
          loading: false,
          isLoggedIn: true
        }
    });
});


describe("Navbar", () => {

  it("should render the navbar", () => {
    render(
    <Provider store={store}>
      <Navbar />
    </Provider>
    );

    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });

  it("dispatches logoutUser action when Logout button is clicked", () => {

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
      );

      const logoutDispatch = {
        type: LOGOUT_USER_SUCCESS
    };
    
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    store.dispatch(logoutDispatch);

    const actions = store.getActions();

    expect(actions).toEqual([
      { 
        type: LOGOUT_USER_REQUEST
      },
      { 
        type: LOGOUT_USER_SUCCESS 
      }
    ]);

    expect(actions).not.toEqual([
      {
        type: LOGOUT_USER_FAIL
      }
    ]);

  });
});