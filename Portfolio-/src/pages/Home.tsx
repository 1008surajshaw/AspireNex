import Contact from "../components/contact/Contact";
import Socialbar from "../components/hero/Socialbar";
import Project from "../components/project/Project";
import Tech from "../components/tech/Tech";
import HeroSec from "../components/hero/HeroSec";
import Footer from "./Footer";

const Home = () => {

  return (
    <div className="mt-5 relative  mx-auto flex flex-col items-center  text-white justify-between ">
      <Socialbar />
      <HeroSec/>
      <Tech/>
      <Project/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home;
