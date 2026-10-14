function filterCourses() {
  // 1. Get the search input value and convert it to lowercase
  const query = document.getElementById('searchInput').value.toLowerCase();
  
  // 2. Get all list items (<li>) from the target list
  const listItems = document.getElementById('itemList').getElementsByTagName('li');

  // 3. Loop through all list items and hide those that don't match the query
  for (let i = 0; i < listItems.length; i++) {
    const itemText = listItems[i].textContent || listItems[i].innerText;
    
    if (itemText.toLowerCase().includes(query)) {
      listItems[i].style.display = ""; // Show item
    } else {
      listItems[i].style.display = "none"; // Hide item
    }
  }
}