import { Project } from '../../store/project/project.state';
import { OpenDialogResult } from '../filesystem-service/filesystem.service';
import { File } from '../../store/file/file.state';
import { Observable } from 'rxjs';


export interface ProjectService {
  
  createProject(openDialogResult: OpenDialogResult, files: File[]): Project;
  createProject$(openDialogResult: OpenDialogResult, files: File[]): Observable<Project>;
}