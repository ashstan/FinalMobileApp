/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

var localStorage = window.localStorage;
let localStorageSize = localStorage.length;

window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list = document.querySelector("#tasks");
    localStorage.removeItem('debug');


    let taskListArray = [];
    //create list
    class Task {
        constructor(key, value) {
            this.key = key;
            this.value = value;
        }
    }
    for (var i = 0; i<localStorage.length; i++){
        const localStorageKeyNumber = localStorage.key(i);
        const task = localStorage.getItem(localStorageKeyNumber);

        const newTask = new Task(localStorageKeyNumber, task);
        taskListArray.push(newTask);
    }
    console.log(taskListArray);

    form.addEventListener('submit', (e) => {
    		e.preventDefault();

        const taskAdded = input.value;
        const keyValue = Math.floor(Math.random() * 1000000);
        localStorage.setItem(keyValue, taskAdded);
        location.reload();
    })

    for (var i = 0; i<localStorage.length; i++){
        const localStorageKeyNumber = localStorage.key(i);
        const task = localStorage.getItem(localStorageKeyNumber);

        const aTask = document.createElement('div');
        aTask.classList.add('task');

        const taskList = document.createElement('div');
        taskList.classList.add('content');
        aTask.appendChild(taskList);

        const taskInput = document.createElement('div');
        taskInput.classList.add('text');
        taskInput.innerHTML = task;
        taskList.appendChild(taskInput);

        const taskActions = document.createElement('div');
        taskActions.classList.add('actions');

    	const deleteTask = document.createElement('button');
    	deleteTask.classList.add('delete');
    	deleteTask.innerHTML = '<i class="fa-solid fa-trash"></i>';
    	taskActions.appendChild(deleteTask);

    	aTask.appendChild(taskActions);

    	list.appendChild(aTask);

    	input.value = '';

    	deleteTask.addEventListener('click', (e) => {
    		list.removeChild(aTask);
    		localStorage.removeItem(localStorageKeyNumber);

               var index = taskListArray.map(function(e) { return e.key; }).indexOf(localStorageKeyNumber);
    		console.log(index);

    		location.reload();
    	});
    }

	const clearTask = document.querySelector("#clear-button");
	if(taskListArray.length > 0){
	    const clearButton = document.createElement('button');
	    clearButton.classList.add('clear-button');
	    clearButton.innerHTML = 'Clear List';
	    clearTask.appendChild(clearButton);

        clearButton.addEventListener("click", (e) => {
            window.localStorage.clear();
            location.reload();
        })
    }
})

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}