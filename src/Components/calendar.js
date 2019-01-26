import React from 'react';
import './calendar.css';
import './content.css';
import dateFns from "date-fns";
import Header from "./header.js";
import Days from "./days.js";
import Weeks from "./weeks.js";



class Calendar extends React.Component{

    state = {
            currentMonth: new Date(),
            isVisible: false,
            todoList: [],
            inputValue: "",
    }

    // Functions

    // Change Month

    onClick = (e) => {
        if (e.target.classList.contains('arrow-f')) {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        })
        } else {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
        }
    }

    // Todo List

    reveal = (e) => {
        if (this.state.isVisible == false &&  e.target.querySelector('.content') !== null) {
            this.setState({
                isVisible: true,
            })
            e.target.querySelector('.content').classList.add('content-show');
            e.target.querySelector('.todoList').classList.add('active');
        } else {
            return;
        }
    };

    hide = (e) => {
        if (this.state.isVisible == true) {
            this.setState({
                isVisible: false,
                todoList: [],
            })
            e.target.parentElement.classList.remove('content-show');
        } else {
            return;
        }
    };

    updateInputValue = (e) => {
        this.setState({
            inputValue: e.target.value,
          });
    };

    addTask = () => {
        if (this.state.inputValue == "") {
            return
        } else {
        const oldList = this.state.todoList;
        const newList = oldList.concat({value: this.state.inputValue});
        this.setState({
            todoList: newList,
        });
       }
    }

    deleteTask = (e) => {
        let id = e.target.id;
        let deletedList = this.state.todoList.filter(el => el.value !== id);
        this.setState({
            todoList: deletedList,
        });
    }

    completeTask = (e) => {
        e.target.parentElement.style.textDecoration = "line-through"
        console.log(e.target.parentElement);
    } 

    // render content

    render() {
        return (
            <div className={`switch ${dateFns.format(this.state.currentMonth, "MMMM")}`}>
                <Header 
                    currentMonth={this.state.currentMonth} 
                    onClick={this.onClick} />
                <Days 
                    currentMonth={this.state.currentMonth} />
                <Weeks 
                    currentMonth={this.state.currentMonth}
                    todo={this.state.todoList}
                    reveal={this.reveal}
                    hide={this.hide}
                    input={this.updateInputValue}
                    add={this.addTask}
                    delete={this.deleteTask}
                    complete={this.completeTask} />
            </div>
        )
    }
}

export default Calendar;