import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./App.css";

import Header from "./components/Header";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/projects");
      setProjects(response.data);
    }
    fetchData();
  }, []);

  async function hendleAddProject() {
    const response = await api.post("projects", {
      title: `Projeto ${Date.now()}`,
      owner: "Rafael Vieweg",
    });

    setProjects([...projects, response.data]);
  }

  return (
    <>
      <Header title="Projetos" />
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
      <button type="button" onClick={hendleAddProject}>
        Adicionar Projeto
      </button>
    </>
  );
}

export default App;
