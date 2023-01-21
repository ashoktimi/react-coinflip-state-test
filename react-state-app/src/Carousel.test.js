import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";


it('should render without crashing', () =>{
  render(<Carousel/>);
})

it("matches snapshot", function(){
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right and left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
 
});


it("works when you click on left arrow", ()=>{
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");
  const leftArrow = queryByTestId("left-arrow");

  // // move to the right
  fireEvent.click(rightArrow);

  // move to the left expect the first image to show
  fireEvent.click(leftArrow);
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
})


it('works when left arrow missing on first image', ()=>{
  const { getByTestId } = render(<Carousel />);
  const rightArrow = getByTestId("right-arrow");
  const leftArrow = getByTestId("left-arrow");

  expect(leftArrow).toHaveClass('hidden')
  expect(rightArrow).not.toHaveClass('hidden')

  fireEvent.click(rightArrow);

  expect(leftArrow).not.toHaveClass('hidden')
  expect(rightArrow).not.toHaveClass('hidden')

  fireEvent.click(rightArrow);

  expect(leftArrow).not.toHaveClass('hidden')
  expect(rightArrow).toHaveClass('hidden')



});