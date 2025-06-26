window.onload = function () {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    saved.forEach(todo => {
        document.querySelector("input").value = todo;
        addTodo(); 
    });
    document.querySelector("input").value = ""; 
};

function saveTodos() {
    const todos = [];
    document.querySelectorAll(".textandbuttoncontainer p").forEach(p => {
        todos.push(p.innerText);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}


function addTodo(){
    const value=document.querySelector("input").value;
    if (value === "") return;
    const outerdiv=document.createElement("div");
    outerdiv.className="textandbuttoncontainer";
    const innerdiv=document.createElement("div");
    innerdiv.className="todo-actions";
    const editbutton=document.createElement("button");
    editbutton.className="btn-edit";
    const removebutton=document.createElement("button");
    const paragraph=document.createElement("p");
    paragraph.innerText=value;
    removebutton.className="btn-remove";
    innerdiv.appendChild(editbutton);
    removebutton.innerText="remove";
    editbutton.innerText="edit";
    innerdiv.appendChild(removebutton);
    outerdiv.appendChild(paragraph);
    outerdiv.appendChild(innerdiv);
    document.querySelector(".addedtodo").appendChild(outerdiv);
    
    editbutton.onclick = function () {
        if (editbutton.innerText === "edit") {
            const input = document.createElement("input");
            input.type = "text";
            input.value = paragraph.innerText;
            outerdiv.replaceChild(input, paragraph);
            editbutton.innerText = "save";
        } else {
            const input = outerdiv.querySelector("input");
            const newText = input.value.trim();
            if (newText !== "") {
                paragraph.innerText = newText;
                outerdiv.replaceChild(paragraph, input);
                editbutton.innerText = "edit";
            saveTodos();

            }
        }
    
};
    removebutton.onclick = function () {
        outerdiv.remove();
        saveTodos();
    };
    document.querySelector("input").value = "";
    saveTodos();
    

}
