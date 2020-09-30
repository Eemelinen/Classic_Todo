# ToDo

### UI Requirements
* Initially, the list of todo cards should be empty.
* There should be a form where the user can add a new 'todo'.
* When a new todo task is submitted from the form, a new todo card should be appended to the list.
* Clicking on a todo card should visually mark the card as done. Exactly how is up to you. Clicking it again should toggle the card back to its original appearance. 
* Add a remove-button to cards marked as 'done'. When the button is clicked, the card should be removed from the board.
* Move the cards marked as 'done' to the bottom of the list.

### Technical requirements
* Keep state in a object and *NOT* in the DOM. In its simplest form, this means that the todo’s should be stored in an array. The view should be dependent on the state, not the other way around.
* `Optional:` Persisting in [localstorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). This is actually really simple once you have a state object: store the current state in the browser's localstorage. When the app is closed and then opened again, the state should be restored.

Images:
![desktop](https://user-images.githubusercontent.com/37372229/94713975-c5bf2100-034b-11eb-900f-0ab22b4015bb.png)
![mobile](https://user-images.githubusercontent.com/37372229/94714117-f8691980-034b-11eb-8377-e7e797f1767e.png)
