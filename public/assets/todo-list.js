// $(document).ready(function(){

//   $('form').on('submit', function(){

//       var item = $('form input');
//       var todo = {item: item.val()};

//       $.ajax({
//         type: 'POST',
//         url: '/todo',
//         data: todo,
//         success: function(data){
//           //do something with the data via front-end framework
//           location.reload();
//         }
//       });

//       return false;

//   });

//   $('li').on('click', function(){
//       var item = $(this).text().replace(/ /g, "-");
//       $.ajax({
//         type: 'DELETE',
//         url: '/todo/' + item,
//         success: function(data){
//           //do something with the data via front-end framework
//           location.reload();
//         }
//       });
//   });

// });

$(document).ready(function(){
    // Handle form submission for adding new items
    $('form').on('submit', function(e){
        e.preventDefault(); // Better than return false
        
        var item = $('form input');
        var todo = {item: item.val()};

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            contentType: 'application/x-www-form-urlencoded',
            success: function(data){
                item.val(''); // Clear input field
                location.reload();
            },
            error: function(xhr, status, error) {
                console.log('Error adding item:', error);
                alert('Error adding item. Please try again.');
            }
        });
    });

    // Handle click events for deleting items (using event delegation)
    $(document).on('click', 'li', function(){
        var item = $(this).text().replace(/ /g, "-");
        
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function(data){
                location.reload();
            },
            error: function(xhr, status, error) {
                console.log('Error deleting item:', error);
                alert('Error deleting item. Please try again.');
            }
        });
    });
});