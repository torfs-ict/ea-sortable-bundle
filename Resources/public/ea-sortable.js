let easyadminDragndropSort =
    {
        initDraggableEntityRows: function() {

            let url = document.body.querySelector('[data-sortable]');

            if (url && document.body.classList.contains('easyadmin') && document.body.classList.contains('list')) {
                if (!Array.prototype.last){
                    Array.prototype.last = function(){
                        return this[this.length - 1];
                    };
                }

                let entityClass = document.body.id.split('-').last();
                let content = document.getElementById("main");
                let table = content.getElementsByClassName("table")[0];
                let tbody = table.getElementsByTagName("tbody")[0];
                let tableRows = tbody.getElementsByTagName("tr");
                let dragSrcEl = null; // the object being drug
                let startPosition = null; // the index of the row element (0 through whatever)
                let endPosition = null; // the index of the row element being dropped on (0 through whatever)
                let parent; // the parent element of the dragged item
                let entityId; // the id (key) of the entity
                let parser = new DOMParser();
                url = url.dataset.sortable;

                for (let row in tableRows) {
                    if (tableRows.hasOwnProperty(row)) {
                        tableRows[row].setAttribute("draggable", "true");
                    }
                }

                function handleDragStart(e) {
                    dragSrcEl = e.currentTarget;
                    entityId = dragSrcEl.getAttribute('data-id');
                    dragSrcEl.style.opacity = '0.6';
                    parent = dragSrcEl.parentNode;
                    startPosition = Array.prototype.indexOf.call(parent.children, dragSrcEl);
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/html', this.innerHTML);
                }

                function handleDragOver(e) {
                    if (e.preventDefault) {
                        e.preventDefault(); // Necessary. Allows us to drop.
                    }
                    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

                    return false;
                }

                function handleDragEnter(e) {
                    this.classList.add('over');
                }

                function handleDragLeave(e) {
                    this.classList.remove('over');  // this / e.target is previous target element.
                }

                function handleDrop(e) {
                    if (e.stopPropagation) {
                        e.stopPropagation(); // stops the browser from redirecting.
                    }

                    // Don't do anything if dropping the same column we're dragging.
                    if (dragSrcEl !== this) {
                        endPosition = Array.prototype.indexOf.call(parent.children, this);
                        // Set the source column's HTML to the HTML of the column we dropped on.
                        dragSrcEl.innerHTML = this.innerHTML;
                        this.innerHTML = e.dataTransfer.getData('text/html');

                        // do the ajax call to update the database
                        let xhr = new XMLHttpRequest();
                        let form = new FormData();
                        form.append('entity', entityClass);
                        form.append('id', entityId);
                        form.append('position', endPosition);
                        xhr.open('POST', url);

                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                let response = parser.parseFromString(xhr.responseText,"text/html");
                                let newBody = response.getElementsByTagName("body")[0];
                                let newTbody = newBody.getElementsByTagName("tbody")[0];
                                tbody.parentNode.replaceChild(newTbody, tbody);
                                easyadminDragndropSort.initDraggableEntityRows();

                                $('input[data-toggle="toggle"]').bootstrapToggle();
                            }
                            else {
                                alert("An error occurred while sorting. Please refresh the page and try again.")
                            }
                        };
                        xhr.send(form);
                    }
                    return false;
                }

                function handleDragEnd(e) {
                    this.style.opacity = '1';  // this / e.target is the source node.
                    [].forEach.call(tableRows, function (row) {
                        row.classList.remove('over');
                    });
                }

                [].forEach.call(tableRows, function (row) {
                    row.addEventListener('dragstart', handleDragStart, false);
                    row.addEventListener('dragenter', handleDragEnter, false);
                    row.addEventListener('dragover', handleDragOver, false);
                    row.addEventListener('dragleave', handleDragLeave, false);
                    row.addEventListener('drop', handleDrop, false);
                    row.addEventListener('dragend', handleDragEnd, false);
                });
            }
        },

        /**
         * Primary Admin initialization method.
         * @returns {boolean}
         */
        init: function() {
            this.initDraggableEntityRows();
            return true;
        }
    };

document.addEventListener("DOMContentLoaded", function(event) {
    easyadminDragndropSort.init();
});