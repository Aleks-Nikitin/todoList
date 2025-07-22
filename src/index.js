
import "./reset.css";
import "./styles.css";
const projectLibrary = [];
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
    function addNewProject(){


    }
    function clear(){
        accessDom.content.innerHTML =``;
    }
    function clearInput(){
        accessDom.projectInput.value=" ";
        
    }
    function showProject(projectItem){
        for(const todoUnit of projectItem.storage){
            let todoBlockUI = document.createElement("div");
            todoBlockUI.classList = "todoBlock";
            let todoTitleUI = document.createElement("p");
            let todoDueDateUI = document.createElement("div");
            let todoDescriptionUI = document.createElement("p");
            let todoImportanceUI = document.createElement("div");
            todoTitleUI.textContent = todoUnit.title;
            todoDescriptionUI.textContent = todoUnit.description;
            todoDueDateUI.textContent = todoUnit.dueDate;
            todoImportanceUI.textContent = todoUnit.importance;
            accessDom.content.appendChild(todoBlockUI);
            todoBlockUI.appendChild(todoTitleUI);
            todoBlockUI.appendChild(todoDescriptionUI);
            todoBlockUI.appendChild(todoImportanceUI);
            todoBlockUI.appendChild(todoDueDateUI);
        }
    }

    function createReferences(){
        return {
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
        todayBtn: document.querySelector("#todayBtn"),
        next7daysBtn: document.querySelector("#next7daysBtn"),
        importantBtn: document.querySelector("#importantBtn")
        }
    }

    const accessDom = createReferences();
    (function(){
    accessDom.addProjBtn.addEventListener("click",()=>{
        accessDom.dialogProj.showModal();
       
    })
    accessDom.addTodoBtn.addEventListener("click",()=>{
        accessDom.dialogTodo.showModal();
       
    })
    accessDom.confirmTodoBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        accessDom.dialogTodo.close();
        checkCurrentProject(projectLibrary).storage.push(new todo(accessDom.todoInputTitle.value, accessDom.todoInputDescription.value,accessDom.todoInputDueDate.value,accessDom.todoInputImportance.value));
       // should push todo into selected project
        console.log(projectLibrary)
        
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
    })
    accessDom.closeBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        accessDom.dialogProj.close()
        clearInput()
    })
    accessDom.todayBtn.addEventListener("click",()=>{
        clear()
        
    })


})()
    showProject(todayProj);

}
const todayProj = new Project('today');
todayProj.current = true;
projectLibrary.push(todayProj);
/*
const newTodo = new todo("Laundry","take everything from wardrobe","7/27/2025","true")
todayProj.storeTodo(newTodo);
console.log(todayProj.storage);
*/
UIcontroller();
