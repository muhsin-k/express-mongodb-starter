import React from "react";
import ReactDOM from "react-dom";
import * as enzyme from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Contact from "./Contact";

enzyme.configure({
  adapter: new Adapter()
});

describe("Header", () => {
  it("renders without crashing", () => {
    enzyme.mount(<Contact />);
  });

  it("should render correctly[Snapshot]", () => {
    const output = enzyme.shallow(
      <Contact
        firstName="Muhsin"
        secondName="Keloth"
        email="muhsinkeramam@gmail.com"
        id="5ae17aed0299c3a5a76018a6"
        profilePic="https://d2ojpxxtu63wzl.cloudfront.net/static/40d467520759865d5b2b669e242033f5_08fbfcfd9529b0affb3efe7090dee8fb3b92a494cb83b76d76c8e1130472a642"
        showActions={true}
      />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
