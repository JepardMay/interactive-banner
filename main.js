document.addEventListener('DOMContentLoaded', (event) => {
  const draggables = document.querySelectorAll('.product');
  const cart = document.getElementById('cart');
  const banner = document.querySelector('.banner');

  function checkItemsCount() {
    const items = cart.querySelectorAll('.product');

    if (items.length > 2) {
      banner.classList.add('active');
    }
  }

  draggables.forEach((draggable) => {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    const parentElement = draggable.parentElement;
    const minLeftValue = 70;

    draggable.addEventListener('mousedown', handleMouseDown);
    draggable.addEventListener('touchstart', handleTouchStart);
    draggable.addEventListener('dragstart', preventDefaultDrag);

    function handleMouseDown(e) {
      isDragging = true;
      draggable.classList.add('dragging');
      const rect = parentElement.getBoundingClientRect();
      offsetX = e.clientX - rect.left - draggable.offsetLeft;
      offsetY = e.clientY - rect.top - draggable.offsetTop;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    function handleTouchStart(e) {
      isDragging = true;
      draggable.classList.add('dragging');
      const touch = e.touches[0];
      const rect = parentElement.getBoundingClientRect();
      offsetX = touch.clientX - rect.left - draggable.offsetLeft;
      offsetY = touch.clientY - rect.top - draggable.offsetTop;
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    function handleMouseMove(e) {
      if (isDragging) {
        const rect = parentElement.getBoundingClientRect();
        const newX = e.clientX - rect.left - offsetX;
        const newY = e.clientY - rect.top - offsetY;
        draggable.style.left = `${newX}px`;
        draggable.style.top = `${newY}px`;
      }
    }

    function handleTouchMove(e) {
      if (isDragging) {
        const touch = e.touches[0];
        const rect = parentElement.getBoundingClientRect();
        const newX = touch.clientX - rect.left - offsetX;
        const newY = touch.clientY - rect.top - offsetY;
        draggable.style.left = `${newX}px`;
        draggable.style.top = `${newY}px`;
      }
    }

    function handleMouseUp(e) {
      isDragging = false;
      draggable.classList.remove('dragging');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      dropElement(e);
    }

    function handleTouchEnd(e) {
      isDragging = false;
      draggable.classList.remove('dragging');
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      dropElement(e.changedTouches[0]);
    }

    function dropElement(e) {
      const rect = cart.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        draggable.classList.add('dropped');
        cart.appendChild(draggable);
        draggable.style.top = '';

        let currentLeft = Math.max(parseInt(draggable.style.left, 10) || 0, minLeftValue);
        draggable.style.left = `${currentLeft}px`;

        checkItemsCount();
      } else {
        draggable.style.top = '';
        draggable.style.left = '';
        if (parentElement) parentElement.appendChild(draggable);
      }
    }

    function preventDefaultDrag(e) {
      e.preventDefault();
    }
  });
});
