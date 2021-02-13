import { render, screen } from "@testing-library/react";
import IndexPage from "./IndexPage";
import React from "react";
import { BrowserRouter } from "react-router-dom";

test("Index should show Ping Cheng", () => {
	render(
		<BrowserRouter>
			<IndexPage />
		</BrowserRouter>
	);
	const nameElement = screen.getByText(/Ping Cheng/g);
	expect(nameElement).toBeInTheDocument();
});