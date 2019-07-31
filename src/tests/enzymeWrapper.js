/* A light wrapper to apply enzyme adapter configuration and expose enzyme members */

import "raf/polyfill";

import { configure, mount, render, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";

configure({ adapter: new ReactSixteenAdapter() });

export { shallow, mount, render };
