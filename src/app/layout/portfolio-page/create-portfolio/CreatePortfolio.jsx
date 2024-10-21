import axios from 'axios';
import React, { useState } from 'react';
import { API_ENDPOINT_URL } from '../../../utils/constants';
import { getUserID } from '../../../utils/DBManagerService';

const CreatePortfolio = () => {
 const [postParams, setPostParams] = useState({});
 const [headerParams, setHeaderParams] = useState({
  portfolio_name: '',
  title_header_name: '',
  name: '',
  designation_name: '',
 });
 const [skillsParams, setSkillsParams] = useState([]);
 const [projects, setProjects] = useState([]);

 async function onCreate() {
  await setupPostParams();
  console.log(postParams);

  if (!postParams?.portfolio_name || postParams.portfolio_name.length === 0) {
   return alert('Portfolio name cannot be empty');
  }
  if (postParams.portfolio_name.includes(' ')) {
   return alert('Portfolio name cannot contain spaces');
  }

  try {
   const response = await axios.post(`${API_ENDPOINT_URL}portfolio/create`, postParams);
   const data = response.data;
   console.log(data);

   if (data.status) {
    alert(data.msg);
   } else {
    alert(data.msg || JSON.stringify(data));
   }
  } catch (error) {
   alert(JSON.stringify(error));
  }
 }

 async function setupPostParams() {
  let params = {};
  params.user_id = getUserID();
  params = { ...params, ...headerParams, skills: skillsParams, projects };
  setPostParams(params);
  console.log(params);
 }

 function onChangeHeader(event) {
  const { name, value } = event.target;
  setHeaderParams((prev) => ({ ...prev, [name]: value }));
 }

 function onChangeSkillSection(index, event) {
  const { name, value } = event.target;
  setSkillsParams((prev) =>
   prev.map((section, idx) => (idx === index ? { ...section, [name]: value } : section))
  );
 }

 function addSkill(item, index) {
  const newSkill = {
   id: Date.now(),
   skill_name: '',
   percentage: '',
  };
  item.skills.push(newSkill);
  setSkillsParams([...skillsParams]);
 }

 function removeSkill(item, index, skillIndex) {
  item.skills.splice(skillIndex, 1);
  setSkillsParams([...skillsParams]);
 }

 function addSkillSection() {
  const newSection = {
   id: Date.now(),
   skill_title: '',
   skills: [],
  };
  setSkillsParams((prev) => [...prev, newSection]);
 }

 function addProject() {
  const newProject = {
   project_name: '',
   project_description: '',
   project_link: '',
  };
  setProjects((prev) => [...prev, newProject]);
 }

 function removeProject(index) {
  setProjects((prev) => prev.filter((_, i) => i !== index));
 }

 function onChangeProjectSection(index, event) {
  const { name, value } = event.target;
  setProjects((prev) =>
   prev.map((project, idx) => (idx === index ? { ...project, [name]: value } : project))
  );
 }

 return (
  <div className='page-container'>
   <div className='d-flex justify-space-between align-items-center'>
    <p>Create Portfolio</p>
    <div className='d-flex'>
     <input
      onChange={onChangeHeader}
      type='text'
      name='portfolio_name'
      id='portfolio_name'
      placeholder='Enter portfolio name'
     />
     <button onClick={onCreate}>Create</button>
    </div>
   </div>
   <div className='d-flex column'>
    <div className='portfolio-header'>
     <input
      onChange={onChangeHeader}
      type='text'
      placeholder='Enter title name'
      name='title_header_name'
      id='title_header_name'
     />
    </div>
    <div>
     <div className='portfolio-home'>
      <div>
       <input
        onChange={onChangeHeader}
        type='text'
        placeholder='Enter user name'
        name='name'
        id='name'
       />
       <input
        onChange={onChangeHeader}
        type='text'
        placeholder='Enter designation name'
        name='designation_name'
        id='designation_name'
       />
      </div>
     </div>
     <div>
      <div className='skills-section'>
       <div className='d-flex justify-space-between align-items-center'>
        <p>Skills</p>
        <button onClick={addSkillSection}>Add Skill Section</button>
       </div>
       {skillsParams.map((item, index) => (
        <div className='skill' key={item.id}>
         <div className='d-flex justify-space-between align-items-center'>
          <input
           onChange={(e) => onChangeSkillSection(index, e)}
           type='text'
           name='skill_title'
           id='skill_title'
           value={item.skill_title || ''}
           placeholder='Enter skill title'
          />
          <button onClick={() => addSkill(item, index)}>Add Skill</button>
         </div>
         {item.skills.length === 0 ? (
          <p className='no-skills'>No Skills Found</p>
         ) : (
          <div className='skills'>
           {item.skills.map((skill, skillIndex) => (
            <div key={skillIndex}>
             <input
              type='text'
              name='skill_name'
              id='skill_name'
              value={skill.skill_name}
              placeholder='Enter skill name'
              onChange={(e) => {
               const newSkills = [...item.skills];
               newSkills[skillIndex].skill_name = e.target.value;
               onChangeSkillSection(index, {
                target: { name: 'skills', value: newSkills },
               });
              }}
             />
             <input
              type='text'
              name='percentage'
              id='percentage'
              value={skill.percentage}
              placeholder='Enter skill percentage'
              onChange={(e) => {
               const newSkills = [...item.skills];
               newSkills[skillIndex].percentage = e.target.value;
               onChangeSkillSection(index, {
                target: { name: 'skills', value: newSkills },
               });
              }}
             />
             <button className='btn-bg-danger' onClick={() => removeSkill(item, index, skillIndex)}>Remove Skill</button>
            </div>
           ))}
          </div>
         )}
        </div>
       ))}
      </div>
      <div className='projects-section'>
       <div className='d-flex justify-space-between align-items-center'>
        <h2>Projects</h2>
        <button className='btn-bg-primary' onClick={addProject}>Add Project</button>
       </div>
       <div className='projects'>
        {projects.map((project, index) => (
         <div className='project' key={index}>
          <input
           type='text'
           name='project_name'
           id='project_name'
           value={project.project_name}
           placeholder='Enter project name'
           onChange={(e) => onChangeProjectSection(index, e)}
          />
          <input
           type='text'
           name='project_description'
           id='project_description'
           value={project.project_description}
           placeholder='Enter project description'
           onChange={(e) => onChangeProjectSection(index, e)}
          />
          <input
           type='text'
           name='project_link'
           id='project_link'
           value={project.project_link}
           placeholder='Enter project link'
           onChange={(e) => onChangeProjectSection(index, e)}
          />
          <button className='btn-bg-danger' onClick={() => removeProject(index)}>Remove Project</button>
         </div>
        ))}
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default CreatePortfolio;
