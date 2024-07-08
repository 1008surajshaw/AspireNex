const newTaskAssign = (email, username) => {
    return `
      <p>Hi ${username},</p>
      <p>A new task has been assigned to you. Please check the task details in the task management system.</p>
      <p>Regards,<br/>Team Management</p>
    `;
  };
  
  module.exports = newTaskAssign;
  