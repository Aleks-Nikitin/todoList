import "./reset.css";
import "./styles.css";
import {today} from "./today.js";
class Project{

    constructor(){
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
    function clear(){
    accessDom.content.innerHTML ="";
}
    function createReferences(){
        return {
        content: document.querySelector(".content"),
        todayBtn: document.querySelector("#todayBtn"),
        next7daysBtn: document.querySelector("#next7daysBtn"),
        importantBtn: document.querySelector("#importantBtn")
        }
    }
    const accessDom = createReferences();
    accessDom.todayBtn.addEventListener("click",()=>{
        clear()
        
    })

}
const todayProj = new Project();
UIcontroller();