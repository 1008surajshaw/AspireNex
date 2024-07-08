import js from "../../assets/technologyStack/javascript.webp"
import express from "../../assets/technologyStack/express-js.webp"
import next from "../../assets/technologyStack/next-js.webp"
import react from "../../assets/technologyStack/react-js.webp"
import ts from "../../assets/technologyStack/typescript.webp"
import tw from "../../assets/technologyStack/tailwindcss.webp"
import mui from "../../assets/technologyStack/mui.png"
import html from "../../assets/technologyStack/html.png"
import css from "../../assets/technologyStack/css.png"
import aws from "../../assets/technologyStack/aws.png"
import db from "../../assets/technologyStack/md.png"
import postg from "../../assets/technologyStack/Postgresql_elephant.svg.png"
import git from "../../assets/technologyStack/git.png"
import Card from "./Card"
import { Element } from 'react-scroll';
const Tech = () => {
  const stacks = [
    {
      name: 'Next JS',
        image: next,
        officialSite: 'https://nextjs.org/',
    },
    {
      name: "Express JS",
      image: express,
      officialSite: 'https://expressjs.com/',
    },
    {
      name: "Javascript",
      image: js,
      officialSite: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
      name: "React JS",
      image: react,
      officialSite: 'https://reactjs.org/',
  },
  {
      name: "HTML",
      image: html,
      officialSite: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  },
  {
    name: "Tailwind CSS",
    image: tw,
    officialSite: 'https://tailwindcss.com/',
},
  {
    name: "Typescript",
    image: ts,
    officialSite: 'https://www.typescriptlang.org/',
  },
  {
    name: 'AWS',
      image: aws,
      officialSite: 'https://aws.amazon.com/console/',
  },
  {
    name: "PostgreSQL",
    image: postg,
    officialSite: 'https://www.postgresql.org/',
  },
  {
    name: "Mongo DB",
    image: db,
    officialSite: 'https://www.mongodb.com/',
},
{
    name: "git",
    image: git,
    officialSite: 'https://github.com/',
},
{
    name: "CSS",
    image: css,
    officialSite: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
},
{
  name: "MaterialUi",
  image: mui,
  officialSite: 'https://mui.com/',
},
  ]
  return (
 

    <Element name="tech" smooth={true} duration={500}>
    <div className="bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500  ">
      <div className="w-10/12 flex flex-col space-y-4 min-h-screen mx-auto  lg:flex-row items-center justify-center  bg-gray-200 p-8 lg:p-0 lg:pb-16 ">
      <div className="lg:w-1/2 lg:flex lg:items-center lg:justify-center lg:pl-8">
        <div className="text-center lg:text-left">
          <div className="flex gap-2 p-2 items-center">
            <hr className="bg-richblack-50 w-20 my-auto" />
            <div>What does he do?</div>
          </div>
          <div className="text-base lg:text-lg text-richblack-25">
            He creates elegant, logical web solutions. In his hobby time, he designs.
          </div>
          <div className="text-6xl lg:text-8xl font-bold text-blue-600 mt-4">
            Think. Code. Debug.
          </div>
        </div>
      </div>
  
      <div className="lg:w-1/2 flex flex-row gap-8 max-w-7xl mx-auto justify-center items-center flex-wrap">
        {stacks.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
      </div>
    </div>
    </Element>
   
  );
  
}

export default Tech