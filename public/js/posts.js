const postFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#newpost').value.trim();
    //  checks username and password
    if (title && text) {
      const response = await fetch('/api/users/post', {
        method: 'POST',
        body: JSON.stringify({ title, text }),
        headers: { 'Content-Type': 'application/json' },
      });
    //   redirects location to the home page
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to post.');
      }
    }
  };
  document
    .querySelector('.post-form')
    .addEventListener('submit', postFormHandler);