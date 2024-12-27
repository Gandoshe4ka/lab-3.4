document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("users");
    const commentsSection = document.getElementById("comments");
  
    async function fetchUsers() {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        const users = response.data;
  
        users.forEach(user => {
          const userItem = document.createElement("li");
          userItem.textContent = user.name;
          userItem.style.cursor = "pointer";
  
          userItem.addEventListener("click", () => fetchComments(user.id));
          userList.appendChild(userItem);
        });
      } catch (error) {
        console.error("Ошибка при получении пользователей:", error);
      }
    }
  
    async function fetchComments(userId) {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
        const comments = response.data.filter(comment => comment.postId === userId);
  
        commentsSection.innerHTML = "";
        comments.forEach(comment => {
          const commentItem = document.createElement("p");
          commentItem.textContent = comment.body;
          commentsSection.appendChild(commentItem);
        });
      } catch (error) {
        console.error("Ошибка при получении комментариев:", error);
      }
    }
  
    fetchUsers();
  });
  