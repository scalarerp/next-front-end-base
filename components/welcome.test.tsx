import { fireEvent, render } from "@/test-utils";
import { Welcome } from "./welcome";

describe("Welcome component", () => {
  it("has correct text", () => {
    const { queryByText, getByLabelText,queryByLabelText, queryByTestId } = render(<Welcome />);
    expect(queryByText("welcome")).toBeTruthy();
    expect(queryByText("sometext2")).toBeTruthy();

    fireEvent.click(getByLabelText('off'));
    expect(queryByLabelText('on')).toBeTruthy();
    

  });
});
