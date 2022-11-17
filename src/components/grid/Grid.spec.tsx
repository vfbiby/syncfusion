import { render, screen } from "@testing-library/react";
import { Grid } from "./Grid";

describe("Grid", () => {
  describe("Layout", () => {
    it("should show title", () => {
      render(<span>hi</span>);
      expect(screen.getByText("hi")).toBeInTheDocument();
    });
  });
});
