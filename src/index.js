
import "./reset.css";
import "./styles.css";
import {today} from "./today.js";
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
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.importance = importance;
    }

    
}
function UIcontroller(){
    function addNewProject(){


    }
    function clear(){
        accessDom.content.innerHTML ="";
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
        projectInput: document.querySelector("#projectInput"),
        dialog: document.querySelector("dialog"),
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
        accessDom.dialog.showModal();
       
    })
    accessDom.confirmBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        accessDom.dialog.close();
        projectLibrary.push(new Project(accessDom.projectInput.value));
        console.log(projectLibrary)
        clearInput()
    })
    accessDom.closeBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        accessDom.dialog.close()
        clearInput()
    })
    accessDom.todayBtn.addEventListener("click",()=>{
        clear()
        
    })


})()
    showProject(todayProj);

}
const todayProj = new Project();
const newTodo = new todo("Laundry","take everything from wardrobe","7/27/2025","true")
todayProj.storeTodo(newTodo);
console.log(todayProj.storage);
UIcontroller();