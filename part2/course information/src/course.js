import React from 'react';

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {
  const tot = course.parts.reduce((a, b) => a + b.exercises, 0)
  return <b>total of {tot} exercises</b> 
}

const Part = ({part}) => { 
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({ course }) => course.parts.map(part => <Part key={part.id} part={part}/>)

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course