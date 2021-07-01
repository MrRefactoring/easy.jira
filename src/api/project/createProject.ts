import { ClientType, createClient } from 'jira.js';
import { Context } from '../../context';
import { Project } from './project';
import { User } from '../user';
import { getProject } from './getProject';

export interface ProjectInformation {
  /**
   * Project keys must be unique and start with an uppercase letter followed by one or more uppercase alphanumeric
   * characters. The maximum length is 10 characters.
   */
  key: string;
  /** The name of the project. */
  name: string;
  description?: string;
  /** The default assignee when creating issues for this project. */
  assigneeType?: ProjectAssigneeType;
  lead?: string | User;
}

export enum ProjectAssigneeType {
  ProjectType = 'PROJECT_LEAD',
  Unassigned = 'UNASSIGNED',
}

export async function createProject(projectInformation: ProjectInformation, context: Context): Promise<Project> {
  const apiV3 = createClient(ClientType.Version3, context.config);

  const leadAccountId = (typeof projectInformation.lead === 'string'
    ? projectInformation.lead
    : projectInformation.lead?.id) ?? undefined;

  const { id: projectId } = await apiV3.projects.createProject({
    key: projectInformation.key,
    name: projectInformation.name,
    assigneeType: projectInformation.assigneeType,
    avatarId: 0,
    categoryId: 0,
    description: projectInformation.description,
    fieldConfigurationScheme: 0,
    issueSecurityScheme: 0,
    issueTypeScheme: 0,
    issueTypeScreenScheme: 0,
    leadAccountId,
    notificationScheme: 0,
    permissionScheme: 0,
    projectTemplateKey: '',
    projectTypeKey: '',
    url: '',
    workflowScheme: 0,
  });

  return getProject(projectId, context);
}
