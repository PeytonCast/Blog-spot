const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const text = document.querySelector('#comment-text').value.trim();
    const content_id = document.querySelector('#content-id').value.trim();
   
    //  checks username and password
    if (text && content_id) {
      const response = await fetch('/api/users/comment', {
        method: 'POST',
        body: JSON.stringify({ text, content_id}),
        headers: { 'Content-Type': 'application/json' },
      });
    //   redirects location to the home page /
      if (response.ok) {
        document.location.replace(`/content/${content_id}`);
      } else {
        alert('Failed to post.');
      }
    }
  };

 document.getElementById('send-comment').addEventListener('click', commentFormHandler);
 