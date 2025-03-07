( function() {

    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.textContent = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true


        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };

    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name) {
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deliteButton = document.createElement('button');



        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deliteButton.classList.add('btn', 'btn-danger');
        deliteButton.textContent = 'Удалить';



        buttonGroup.append(doneButton);
        buttonGroup.append(deliteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deliteButton,
        };
    }

    function saveTodoData(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    function getTodoData(key) {
      if (!localStorage.getItem(key)) {
        return []
      }
      return JSON.parse(localStorage.getItem(key))
    }


    function createTodoApp(container, title = 'Список дел', listName) {

      let todoAppTitle = createAppTitle(title);
      let todoItemForm = createTodoItemForm();
      let todoList = createTodoList();
      let todoData = getTodoData(listName);

      container.append(todoAppTitle);
      container.append(todoItemForm.form);
      container.append(todoList);

      for (let i = 0; i < todoData.length; ++i) {
        let itemData = createTodoItem(todoData[i]);
        if (todoData[i].done === true) {
          itemData.item.classList.add('list-group-item-success');
        }
        itemData.doneButton.addEventListener('click', function() {
          itemData.item.classList.toggle('list-group-item-success');
              if (todoData[i].done === true) {
                todoData[i].done = false;
              } else todoData[i].done = true;

              saveTodoData(listName, todoData);
          });
          itemData.deliteButton.addEventListener('click', function() {
              if (confirm('Вы уверены?')) {
                  itemData.item.remove();
                    if (todoData[i].id === todoData[i].id) {
                      todoData.splice(i, 1);
                      saveTodoData(listName, todoData);
                    }

              }
          });

        todoList.append(itemData.item);
        }

      todoItemForm.input.addEventListener('input', function () {
        if (todoItemForm.input.value !== '') {
            todoItemForm.button.disabled = false;
        }
      })

      todoItemForm.form.addEventListener('submit', function(e) {
          e.preventDefault();

          if (!todoItemForm.input.value) {
              return;
          }

          let todoObj = {
            id: todoData.length+1,
            name: todoItemForm.input.value,
            done: false,
          }

          let todoItem = createTodoItem(todoObj);
          todoData.push(todoObj);
          saveTodoData(listName, todoData);

          todoItem.doneButton.addEventListener('click', function() {
              todoItem.item.classList.toggle('list-group-item-success');
              todoObj.done = true;

              saveTodoData(listName, todoData);
          });
          todoItem.deliteButton.addEventListener('click', function() {
              if (confirm('Вы уверены?')) {
                  todoItem.item.remove();
                  for (let i = 0; i < todoData.length; ++i) {
                    if (todoData[i].id === todoObj.id) {
                      todoData.splice(i, 1);
                      saveTodoData(listName, todoData);
                    }
                  }
              }
          });

          todoList.append(todoItem.item);

          todoItemForm.input.value = '';
          todoItemForm.button.disabled = true;

      })
    }

    window.createTodoApp = createTodoApp;


}) ();
