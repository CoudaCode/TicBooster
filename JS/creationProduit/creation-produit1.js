const dotsList = document.querySelectorAll('.dots');

dotsList.forEach(dots => {
  dots.addEventListener('click', function () {
    const dropdown = dots.nextElementSibling;
    dropdown.classList.toggle('show');
  });
});

document.addEventListener('click', function (event) {
  dotsList.forEach(dots => {
    const dropdown = dots.nextElementSibling;
    if (!dots.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.classList.remove('show');
    }
  });
});