const deleteFormHandler = async (event) => {
    event.preventDefault();
    
    const del = document.querySelector('#delete-id').value.trim();
      const response = await fetch(`/api/users/${del}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        
      });
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to delete post.');
      }
      
    
    }
   
 document.querySelector(`.delete-form`).addEventListener('submit', deleteFormHandler);
    

 const editFormHandler = async (event) => {
  event.preventDefault();
  const id = document.querySelector('#edit-id').value.trim();
  const title = document.querySelector('#edit-title').value.trim();
  const text = document.querySelector('#edit-text').value.trim();
  
  if (id && title && text) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'put',
      body: JSON.stringify({id, title, text }),
      headers: { 'Content-Type': 'application/json' },
    });
  //   redirects location to the home page
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update.');
    }
  }
};
document.querySelector('.edit-form').addEventListener('submit', editFormHandler);
