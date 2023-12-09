import React from "react";
import { render } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import RenderText from "../../../src/module/index/components/RenderText";

describe("renderText", () => {
  test("should render renderText", () => {
    const { getByText, getByTestId } = render(<RenderText />);
    const renderText = getByTestId("renderText");
    expect(renderText).toBeTruthy();
  });
});
