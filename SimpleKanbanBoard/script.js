/**Helps */
function log(message){
    console.log('> ' + message);
}

/**App */
const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.dropzone');

/**Getting the card */
cards.forEach(card => {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('drag', drag);
    card.addEventListener('dragend', dragEnd);
});

function dragStart(){
    // log('Card start dragging');
    dropzones.forEach(dropzone => dropzone.classList.add('highlight') );

    this.classList.add('is-dragging'); //this = card.
}

function drag(){
    // log('Card is draggring');
}

function dragEnd(){
    // log('Card end dragging');
    dropzones.forEach(dropzone => dropzone.classList.remove('highlight') );
    this.classList.remove('is-dragging');
}

/**Dropping the card */
dropzones.forEach( dropzone =>{
    dropzone.addEventListener('dragenter', dragEnter);
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('dragleave', dragLeave);
    dropzone.addEventListener('drop', drop);
});

function dragEnter(){
    // log('Dropzone enter');
    /**The dragenter event happens at the moment you drag something 
     * in to the target element, and then it stops. */
}

function dragOver(event){
    /**The dragover event happens during the time you are dragging something until you drop it. */
    // log('Dropzone over');
    //this = dropzone
    this.classList.add('over');

    //get dragging card
    const cardBeingDragged = document.querySelector('.is-dragging');

    this.appendChild(cardBeingDragged);

    /**Correction of point */
    event.dataTransfer.dropEffect = "move";
    event.preventDefault();
}

function dragLeave(){
    // log('Dropzone leave');
    //this = dropzone
    this.classList.remove('over');
}

function drop(){
    // log('Dropzone drop');
    //this = dropzone
    this.classList.remove('over');
}