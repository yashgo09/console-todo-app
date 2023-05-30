var readlineSync = require("readline-sync");
const chalk = require("chalk");

const log = console.log;
const error = chalk.red;
const success = chalk.black.bgGreen;
const logCompleted = chalk.black.bgGreen;
const logIncomplete = chalk.black.bgYellow;
const options = chalk.magenta;
const logQuestion = chalk.yellow;
const addInput = chalk.greenBright;

const todoList = [];

function mainMenu() {
  log("\n--------OPTIONS--------");
  log(options("a.) Add an item."));
  log(options("b.) View all items."));
  log(options("c.) Update task status."));
  log(options("d.) Delete an item."));
  log(options("q.) Quit :("));
  log("--------OPTIONS--------");
  const selectedOption = readlineSync
    .question(
      logQuestion("\nSelect an action to perform from the given options [a, b, c, d, q] : ")
    )
    .toLowerCase();

  switch (selectedOption) {
    case "a":
      addItem();
      mainMenu();
      break;
    case "b":
      viewItems();
      confirmReturnToMainMenu();
      break;
    case "c":
      updateTaskStatus();
      confirmReturnToMainMenu();
      break;
    case "d":
      deleteItem();
      confirmReturnToMainMenu();
      break;
    case "q":
      return;
    default:
      log(error("Please select an appropriate option."));
      mainMenu();
  }//this is comment by Hardik to understand fork
}

function confirmReturnToMainMenu() {
  const returnToMainMenu = readlineSync.question("\nReturn to main menu? [y, n] : ").toLowerCase();
  if (returnToMainMenu === "y") {
    mainMenu();
  } else if (returnToMainMenu === "n") {
    return;
  } else {
    log(error("Please select a valid option :)"));
    confirmReturnToMainMenu();
  }
}

function addItem() {
  const item = readlineSync.question(addInput("Add an Item: "));
  todoList.push({ item: item, completed: false });
  log(success("Item added successfully."));
}

function viewItems() {
  let numberOfItems = 0;
  todoList.forEach((todo) => {
    numberOfItems++;
    let taskStatus = "";
    if (todo.completed) {
      taskStatus = "Completed";
      log(`${numberOfItems}. ${todo.item} : ${logCompleted(taskStatus)}`);
    } else {
      taskStatus = "Incomplete";
      log(`${numberOfItems}. ${todo.item} : ${logIncomplete(taskStatus)}`);
    }
  });
}

function validItemNumber(number) {
  if (isNaN(number) || number > todoList.length) {
    log(error("Enter a valid ID.\n"));
    return false;
  }
  return true;
}

function updateTaskStatus() {
  viewItems();
  const itemToUpdate = readlineSync.question(
    addInput("Enter the ID of the item you want to update: ")
  );

  if (validItemNumber(itemToUpdate)) {
    const indexOfItemToUpdate = itemToUpdate - 1;
    // const itemTextToUpdate = readlineSync.question("Enter text to update: ");
    // todoList[indexOfItemToUpdate].item = itemTextToUpdate;
    const todo = todoList[indexOfItemToUpdate];
    todo.completed ? (todo.completed = false) : (todo.completed = true);
    log(success("Item updated successfully."));
  } else {
    updateTaskStatus();
  }
}

function deleteItem() {
  viewItems();
  const itemToDelete = readlineSync.question(
    addInput("Enter the ID of the item you want to delete: ")
  );

  if (validItemNumber(itemToDelete)) {
    const indexOfItemToDelete = itemToDelete - 1;
    todoList.splice(indexOfItemToDelete, 1);
    log(success("Item deleted successfully."));
  } else {
    deleteItem();
  }
}

mainMenu();
