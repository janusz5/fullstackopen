import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((coursePart) => (<Part coursePart={coursePart} key={coursePart.name} />))}
    </>
  );
};

export default Content;
