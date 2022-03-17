
export interface roles {
    roleID: number;
    roleName: string;
  }

  export interface tasks {
    taskID: number;
    name: string;
    taskGroup:string;
  }

  export interface permissions {
    roleID: number;
    taskID: string;
  }
  
  export interface AdminAccess{
    roles:roles[];
    tasks:tasks[];
    permissions:permissions[];
  }