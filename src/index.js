
import "./reset.css";
import "./styles.css";
import { format } from "date-fns";
let projectLibrary = [];

class Project{

    constructor(name){
        this.current = false;
        this.id = crypto.randomUUID();
        this.name = name;
        this.storage =[];
    }
    storeTodo(todoItem){
        this.storage.push(todoItem);
    }
}
class todo{

    constructor(title,description,dueDate,importance){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.importance = importance;
    }

    
}

function checkCurrentProject(projLib){
    for(const proj of projLib){
        if(proj.current) return proj
    }
}
    
function UIcontroller(){
    let editing = false;
    
    function showProjectsList(projLib){
        for(let i =2; i< projLib.length; ++i){
            let pro=document.createElement("button");
            let removeProjBtn = document.createElement("button");
            removeProjBtn.setAttribute("data-id",projLib[i].id);
            pro.setAttribute("data-id",projLib[i].id);
            removeProjBtn.classList.add("X")
            removeProjBtn.textContent ="X"  
            pro.textContent = projLib[i].name;
            accessDom.projectList.appendChild(pro);
            pro.appendChild(removeProjBtn);

            toggleCurrentProject(pro)
            removeProject(removeProjBtn);
            }
        }

    function removeProject(removeBtn){
         removeBtn.addEventListener("click",(e)=>{
             let projectForRemoval = (projectLibrary.find((obj)=> obj.id == e.target.getAttribute('data-id')));
                const isMatching = (element)=> element == projectForRemoval;
                let projectForRemovalIndex = projectLibrary.findIndex(isMatching);
           console.log(projectLibrary[projectForRemovalIndex]);
            projectLibrary.splice(projectForRemovalIndex,1,);
            clearProjList();
            showProjectsList(projectLibrary);
                    
                   
            })
    }
    function toggleCurrentProject(btn){
        btn.addEventListener("click",(e)=>{
                let currentProject = (projectLibrary.find((obj)=> obj.id == e.target.getAttribute('data-id')));
                const isMatched = (element)=> element == currentProject;
                let currentIndex = projectLibrary.findIndex(isMatched);
                resetCurrent(projectLibrary);
                console.log(projectLibrary[currentIndex]);
                if(projectLibrary[currentIndex]) {projectLibrary[currentIndex].current = true;
                clear()
                showProject(checkCurrentProject(projectLibrary))}
    })}
    function resetCurrent(library){
        for(const proj of library){
            proj.current=false;
        }
    }
    function clearProjList(){
        accessDom.projectList.innerHTML='';
    }
    function clear(){
        accessDom.content.innerHTML =``;
    }
    function clearInput(){
        accessDom.projectInput.value=" ";
        
    }
    function deleteTodo(btn, currentBlock){
        btn.addEventListener("click",()=>{
            let currentTodo = (checkCurrentProject(projectLibrary).storage.find((obj)=> obj.id == currentBlock.getAttribute("data-id")));
            const isMatch = (element)=> element == currentTodo;
            let currentTodoIndex = checkCurrentProject(projectLibrary).storage.findIndex(isMatch);
            checkCurrentProject(projectLibrary).storage.splice(currentTodoIndex,1);
            clear()
            showProject(checkCurrentProject(projectLibrary))
        })
    }
    function editTodo(btn,currentBlock){
        btn.addEventListener("click",()=>{
            accessDom.dialogTodo.showModal();
            let currentTodo = (checkCurrentProject(projectLibrary).storage.find((obj)=> obj.id == currentBlock.getAttribute("data-id")));
            const isMatch = (element)=> element == currentTodo;
            let currentTodoIndex = checkCurrentProject(projectLibrary).storage.findIndex(isMatch);
            accessDom.todoInputTitle.value = checkCurrentProject(projectLibrary).storage[currentTodoIndex].title
            accessDom.todoInputDueDate.value = checkCurrentProject(projectLibrary).storage[currentTodoIndex].dueDate
            accessDom.todoInputDescription.value = checkCurrentProject(projectLibrary).storage[currentTodoIndex].description
            accessDom.hiddenInput.value = currentBlock.getAttribute("data-id");
            editing=true;
            
        })
    }
    function showProject(projectItem){
        for(const todoUnit of projectItem.storage){
            
            let todoBlockUI = document.createElement("div");
            todoBlockUI.classList = "todoBlock";
            if(todoUnit.importance == true){
                todoBlockUI.style.cssText="border-left-color:rgb(228, 23, 23)";
            }else{
                todoBlockUI.style.cssText="border-left-color: #808080";
            }
            todoBlockUI.setAttribute("data-id",todoUnit.id);
            let todoTitleUI = document.createElement("p");
            let todoDueDateUI = document.createElement("div");
            todoDueDateUI.classList.add("date")
            let todoDescriptionUI = document.createElement("p");
            todoDescriptionUI.classList.add("description");
            let todoDeleteBtn =document.createElement("button");
            todoDeleteBtn.textContent="X";
            todoDeleteBtn.classList.add("deleteTodoBtn");
            let todoEditBtn =document.createElement("button");
            todoEditBtn.classList.add("editTodoBtn");
            todoEditBtn.textContent="edit";
            editTodo(todoEditBtn, todoBlockUI);
            deleteTodo(todoDeleteBtn,todoBlockUI);
            todoTitleUI.textContent = todoUnit.title;
            todoDescriptionUI.textContent = todoUnit.description;
            todoDueDateUI.textContent = todoUnit.dueDate;
            accessDom.content.appendChild(todoBlockUI);
            todoBlockUI.appendChild(todoTitleUI);
            todoBlockUI.appendChild(todoDescriptionUI);
            todoBlockUI.appendChild(todoDueDateUI);
            todoBlockUI.appendChild(todoEditBtn);
            todoBlockUI.appendChild(todoDeleteBtn);
        }
    }

    function createReferences(){
        return {
        hiddenInput:document.querySelector("#hiddenInput"),
        projectsNodeList: document.querySelectorAll("#todayBtn ,#next7daysBtn ,.projectList>button"),
        todoInputDueDate: document.querySelector("#todoInputDueDate"),
        todoInputImportance: document.querySelector("#todoInputImportance"),
        todoInputDescription: document.querySelector("#todoInputDescription"),
        todoInputTitle: document.querySelector("#todoInputTitle"),
        addTodoBtn : document.querySelector("#addTodoBtn"),
        dialogTodo: document.querySelector("#dialogTodo"),
        projectInput: document.querySelector("#projectInput"),
        dialogProj: document.querySelector("#dialogProj"),
        closeTodoBtn: document.querySelector("#closeTodoBtn"),
        confirmTodoBtn: document.querySelector("#confirmTodoBtn"),
        closeBtn: document.querySelector("#closeBtn"),
        confirmBtn: document.querySelector("#confirmBtn"),
        projectList: document.querySelector(".projectList"),
        content: document.querySelector(".content"),
        addProjBtn: document.querySelector(".add"),
        addIcon: document.querySelector(".icon"),
        todayBtn: document.querySelector("#todayBtn"),
        next7daysBtn: document.querySelector("#next7daysBtn"),
        }
    }
    function checkImportance(inputBtn){
        if(inputBtn.checked){
            return true
        }
        return false
    }
    const accessDom = createReferences();
    
    (function(){
  
    accessDom.addProjBtn.addEventListener("click",()=>{
        accessDom.dialogProj.showModal();
       
    })
    accessDom.addTodoBtn.addEventListener("click",()=>{
        accessDom.dialogTodo.showModal();
        editing=false;
       
    })
    accessDom.confirmTodoBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        accessDom.dialogTodo.close();

        if(editing == false){
        checkCurrentProject(projectLibrary).storage.push(new todo(accessDom.todoInputTitle.value, accessDom.todoInputDescription.value,accessDom.todoInputDueDate.value,checkImportance(accessDom.todoInputImportance)));
       // should push todo into selected project
        clear()
        showProject(checkCurrentProject(projectLibrary))
        console.log(projectLibrary)
        }else {
            let currentTodo = (checkCurrentProject(projectLibrary).storage.find((obj)=> obj.id == hiddenInput.value));
            const isMatch = (element)=> element == currentTodo;
            let currentTodoIndex = checkCurrentProject(projectLibrary).storage.findIndex(isMatch);
            checkCurrentProject(projectLibrary).storage[currentTodoIndex].title = accessDom.todoInputTitle.value;
            checkCurrentProject(projectLibrary).storage[currentTodoIndex].description = accessDom.todoInputDescription.value;
            checkCurrentProject(projectLibrary).storage[currentTodoIndex].dueDate = accessDom.todoInputDueDate.value;
            checkCurrentProject(projectLibrary).storage[currentTodoIndex].importance = checkImportance(accessDom.todoInputImportance);
            clear()
            showProject(checkCurrentProject(projectLibrary))
            hiddenInput.value="";
        }
    })
    accessDom.closeTodoBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        accessDom.dialogTodo.close()
        
    })
    accessDom.confirmBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        accessDom.dialogProj.close();
        projectLibrary.push(new Project(accessDom.projectInput.value));
       console.log(projectLibrary)
        clearInput()
        clearProjList();
        showProjectsList(projectLibrary);
        console.log(accessDom.projectsNodeList)
        
    })
    accessDom.closeBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        accessDom.dialogProj.close()
        clearInput()
        clearProjList();
        showProjectsList(projectLibrary);
    })
    accessDom.todayBtn.addEventListener("click",()=>{
        clear()
        
    })
   

})()
    return {showProjectsList};
}

const todayProjectName = "today";
const next7aysProjectName = "next7days";

const todayProj = new Project(todayProjectName);
const next7days = new Project(next7aysProjectName);

todayProj.current = true;
projectLibrary.push(todayProj);
projectLibrary.push(next7days);


const controller =UIcontroller();

window.onbeforeunload = function () {

        localStorage.setItem('projectLibraryLocal',JSON.stringify(projectLibrary))
    
    
};

window.addEventListener("load", (event) => {
    const items = localStorage.getItem('projectLibraryLocal');
    const isValidLibrary = items != null && items !== "null";
    const newItems = isValidLibrary ? JSON.parse(items) : [];
    const filteredNewItems = newItems.filter(item => item.name !== todayProjectName && item.name !== next7aysProjectName);
    projectLibrary = [...projectLibrary, ...filteredNewItems];
    controller.showProjectsList(projectLibrary);
});
