import React from 'react'
import Me from '../../img/me.jpg'


const About = () => {
  return (
    <>
    <h1 className="text-3xl text-primary text-center">About Developer</h1>
   <div className="profile bg-light">
            <img src={Me} alt="user" className="round-img"/>
            <div>
                  <h2 className="text-3xl text-center">Abubakarr Bangura</h2>
                 <p>
Abubakarr Bangura is a Software Engineering Student at Limkokwing University of Creative Technology (LUCT). He work as a Junior Software Developer at DSTI, focused on the development of web applications using ReactJs, NodeJS and ExpressJs. 
He is also Student Ambassador at the LUCT.</p>
                    </div>
        </div>
    </>
  )
}
export default About;