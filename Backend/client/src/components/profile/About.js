import React from 'react'
import Me from '../../img/me.jpg'


const About = () => {
  return (
    <>
    <h1 className="text-3xl text-primary text-center">About Developer</h1>
   <div className="profile bg-light">
            <img width="100%" src={Me} alt="user" className="round-img"/>
            <div>
                  <h2 className="text-3xl text-center">Abubakarr Bangura</h2>
                 <p>
Abubakarr Bangura studied Software Engineering at Limkokwing University of Creative Technology (LUCT). He currently serves as a Senior Software Developer at DSTI, where he contributes to the development of innovative software solutions. Prior to this role, he worked as a Technical Specialist for the United Nations Population Fund (UNFPA) in Sierra Leone, where he supported various technical initiatives. Additionally, Abubakarr was a Student Ambassador at LUCT, representing the university and fostering connections within the academic community. His diverse experiences reflect a strong commitment to leveraging technology for impactful change.</p>
                    </div>
        </div>
    </>
  )
}
export default About;
