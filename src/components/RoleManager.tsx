import React from 'react';
import useAdminAccessService,{SaveAccessChanges} from '../adminAccessService';
import {permissions} from '../permissions';

let UpdatedList:permissions[]=[];
const AdminAccess: React.FC<{}> = () => {
  const service = useAdminAccessService();

  const handleOnChange = (TaskID:string,RoleID:number) => {
      UpdatedList.length=0;
    if(service.status==='loaded' && service.payload.permissions.filter(x=>x.roleID===RoleID)){
        if(service.payload.permissions.filter(x=>x.roleID===RoleID)){
            service.payload.permissions.forEach(element => {
                if(element.roleID===RoleID){
                    var a=element.taskID;
                    a = a.replace('{', '');
                    a = a.replace('}', '');
                    var b = a.split(',').map(Number);
                    const objIndex = b.findIndex(obj => obj.toString() === TaskID);
                    if (objIndex > -1) {
                      b.splice(objIndex, 1);
                    }
                    else{
                        var num:number=+TaskID;
                        b.push(num)
                    }
                    var c="{"+b.toString()+"}";
                    element.taskID=c;
                    UpdatedList.push({
                        roleID:RoleID,
                        taskID:c.toString()
                    })
                }
            });
            
        }
    }
  };

  const Save=(UpdatedList:permissions[])=>{
    SaveAccessChanges(UpdatedList)
    UpdatedList=[];
  }

  return (
    <div>
        <button onClick={() => Save(UpdatedList)}>Save Changes</button>
      {service.status === 'loading' && <div>Loading...</div>}
     
      {service.status === 'error' && (
        <div>Error.</div>
      )}

<table>
      <thead>
       <tr>
           <th>Action</th>
           <th>Product Administrator</th>
           <th>Engineer</th>
       </tr>
      </thead>
      <tbody>
      {service.status === 'loaded' &&
        service.payload.tasks.filter(task=>task.taskGroup==="Action").map(tasks => (
            <tr>
                <td>
                    {tasks.name}
                </td>
                <td>
                <input
                type="checkbox"
                checked={service.payload.permissions.filter(permission=>permission.taskID.includes(tasks.taskID.toString()) && permission.roleID===1 ).length>0?true:false}
                onChange={() => handleOnChange(tasks.taskID.toString(),1)}
                />
                    
                </td>
                <td>
                <input
                type="checkbox"
                checked={service.payload.permissions.filter(permission=>permission.taskID.includes(tasks.taskID.toString()) && permission.roleID===2).length>0?true:false}
                onChange={() => handleOnChange(tasks.taskID.toString(),2)}
               />
                
                </td>
            </tr>
        ))}
      </tbody>
    </table>

    <table>
      <thead>
       <tr>
           <th>Action</th>
           <th>Product Administrator</th>
           <th>Engineer</th>
       </tr>
      </thead>
      <tbody>
      {service.status === 'loaded' &&
        service.payload.tasks.filter(task=>task.taskGroup==="View").map(tasks => (
            <tr>
                <td>
                    {tasks.name}
                </td>
                <td>
                <input
                type="checkbox"
                checked={service.payload.permissions.filter(permission=>permission.taskID.includes(tasks.taskID.toString()) && permission.roleID===1).length>0?true:false}
                onChange={() => handleOnChange(tasks.taskID.toString(),1)}
                />
                    
                </td>
                <td>
                <input
                type="checkbox"
                checked={service.payload.permissions.filter(permission=>permission.taskID.includes(tasks.taskID.toString()) && permission.roleID===2).length>0?true:false}
                onChange={(e) => handleOnChange(tasks.taskID.toString(),2)}
                />
                
                </td>
            </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default AdminAccess;