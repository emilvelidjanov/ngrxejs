export interface Project {
  directory: string,
  name: string,
  fileIds: number[],
}

export const projectInitialState: Project = {
  directory: '',
  name: '',
  fileIds: [],
}