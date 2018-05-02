import React from "react";
import ReactDOM from "react-dom";
import * as enzyme from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Header from "./Header";

enzyme.configure({
  adapter: new Adapter()
});

describe("Header", () => {
  it("renders without crashing[Normal]", () => {
    enzyme.mount(<Header />);
  });

  // Snapshot
  it("should render correctly[Snapshot]", () => {
    const output = enzyme.shallow(<Header title="Contact Management" />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
  it("renders title ", () => {
    const wrapper = enzyme.shallow(<Header />);
    const welcome = (
      <a href="/" className="brand-logo center">
        Contact Management
      </a>
    );
    expect(wrapper.contains(welcome)).toEqual(true);
  });
});
