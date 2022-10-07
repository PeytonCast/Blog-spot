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
    

