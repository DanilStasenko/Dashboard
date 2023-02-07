const deleteBtn = formSection.querySelector('.delete-name');

deleteBtn.addEventListener('click', deleteUserHandler);

function deleteUserHandler() {
    const isDelete = confirm("Delete user?");
    if (isDelete) {
        localStorage.removeItem('currentUserName');
        localStorage.removeItem('todos');
        form.reset();
        toDoForm.reset();
        document.location.reload();
    }
}