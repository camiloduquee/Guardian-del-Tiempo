import { useEffect, useState } from "react";
import { ProjectService } from "../service/ProjectService";
import type { IProjectResponse } from "types";

export const useSearchProject = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<IProjectResponse[]>([]);

  const { projects } = ProjectService();

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const lowerCaseName = project.name?.toLowerCase();
      const lowerCaseClient = project.email_client?.toLowerCase();
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        lowerCaseName?.includes(lowerCaseSearchTerm) ||
        (lowerCaseClient && lowerCaseClient.includes(lowerCaseSearchTerm))
      );
    });

    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return { handleSearch, filteredProjects, projects };
}
