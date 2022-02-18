const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <b>total of exercises {sum}</b>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {parts.map(part =>
            <Part key={part.id} part={part} />
        )}
    </>

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={course.parts.reduce((previousValue, part) => previousValue + part.exercises, 0)} />
        </>
    )
}

export default Course