import { CourseParts } from "../types";

const Content = ({ courseParts }: { courseParts: CourseParts }) => {
  return (
    <>
      {courseParts.map((coursePart) => (
        <p key={coursePart.name}>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
