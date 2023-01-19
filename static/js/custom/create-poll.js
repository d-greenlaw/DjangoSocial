// Create a New "Poll"
function createPoll() {
  if ($('#post-modal').hasClass('show')) {
    $('#post-modal').modal('toggle');
  }
  setTimeout(function () {
    $('#create-poll-modal').modal('toggle');
  }, 500);
}

// nodeCount: this makes the removeBtn vanish when there's just one field so it doesn't erase all fields!
var target = document.getElementById('choices_section');
var nodeCount = target.childElementCount

// Add/Clone text field, clear text in each clone
function addTextField() {
  removeBtn
  var removeBtn = document.getElementById('removeBtn');
  nodeCount += 1
  removeBtn.classList.remove('invisible') // show the removeBtn when you add your first field, so it doesn't show by default until you add a second field
  var target = document.getElementById('choices_section');
  var clonedTarget = target.cloneNode(true);
  var childs = clonedTarget.childNodes;
  childs[1].value = ''
  target.parentNode.insertBefore(clonedTarget, target.nextSibling);
}

// Remove text field clone, except if there's just one left - then hide removeBtn
function removeLastTextField() {
  var target = document.getElementById('choices_section');
  var removeBtn = document.getElementById('removeBtn');
  nodeCount = nodeCount - 1
  target.lastChild.parentNode.remove()
  if (nodeCount < 3) {
    removeBtn.classList.add('invisible')
  }
}