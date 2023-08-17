const lista = document.querySelector("#lista");
const boton = document.querySelector("#boton");
const URL = "http://localhost:5000"; // Mi URL base

const listFriends = (friends) => {
    lista.innerHTML = '';
    friends.forEach((friend) => {
        const li = document.createElement("li");
        li.innerHTML = `${friend.id} - ${friend.name}`;
        lista.appendChild(li)
    });
};

const showFriends = () => {
    $.get(`${URL}/amigos`, listFriends);
};

boton.addEventListener("click", showFriends);

//todo_______________________________________________________________________________________________________________________________________

let img = $("img");
const input = document.querySelector('#input');
const search = document.querySelector('#search');
const amigo = document.querySelector('#amigo');

const showName = (friend) => {
    amigo.innerHTML = friend.name;
}

const searchFriend = () => {
    img.show();
    const id = input.value
    $.get(`${URL}/amigos/${id}`, showName)
    input.value = '';
    img.hide([2000]);
}

search.addEventListener('click', searchFriend)

//?___________________________________________________________________________________________________________________________________________

const inputDelete = document.querySelector('#inputDelete')
const deleteButton = document.querySelector('#delete')
const success = document.querySelector('#success')

const showDelete = () => {
    success.innerHTML = 'Tu amigo fue borrado con éxito';
}

const deleteFriend = () => {
    const id = inputDelete.value
    $.ajax({
        type: 'DELETE',
        url: `${URL}/amigos/${id}`,
        success: () => {
            inputDelete.value = ''
            showDelete();
            showFriends();
        }
    })
}

deleteButton.addEventListener('click', deleteFriend)