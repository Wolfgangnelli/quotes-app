import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import { logoutUser } from "../../../redux/actions/authUserAction";


describe("Navbar", () => {

  it("renders without errors", () => {
    render(<Navbar />);

    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });

  it("dispatches logoutUser action when Logout button is clicked", () => {
    const dispatch = jest.fn();

    render(<Navbar />);
    
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(dispatch).toHaveBeenCalledWith(logoutUser());
  });
});