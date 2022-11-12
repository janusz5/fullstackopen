import { CoursePart, CoursePartDescr } from "../types";
import { assertNever } from "../utils";

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const getHeader = (coursePart: CoursePart) => (
    <div>
      <b>
        {coursePart.name} {coursePart.exerciseCount}
      </b>
    </div>
  );

  const getDescription = (coursePart: CoursePartDescr) => (
    <div>
      <i>{coursePart.description}</i>
    </div>
  );

  switch (coursePart.type) {
    case "normal":
      return (
        <p>
          {getHeader(coursePart)}
          {getDescription(coursePart)}
        </p>
      );
    case "groupProject":
      return (
        <p>
          {getHeader(coursePart)}
          <div>project exercises {coursePart.groupProjectCount}</div>
        </p>
      );
    case "submission":
      return (
        <p>
          {getHeader(coursePart)}
          {getDescription(coursePart)}
          <div>submit to {coursePart.exerciseSubmissionLink}</div>
        </p>
      );
    case "special":
      return (
        <p>
          {getHeader(coursePart)}
          {getDescription(coursePart)}
          <div>required skills: {coursePart.requirements.join(", ")}</div>
        </p>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
