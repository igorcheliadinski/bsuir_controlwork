$('#mark').on('change', function (event) {
  var selectedMark = $(this).val();
  $.getJSON('./data/cars/models.json', function (data) {
    var models = data[selectedMark].split('|');
    $('#model').empty();
    $('<option/>').text('-Non selected-').val('nonselected').appendTo($('#model'))
    $.each(models, function (key, value) {
      $('<option/>').text(value).val(value).appendTo($('#model'));
    });
  });
});

$('#cars').on('mouseover', '.car img', function () {
  $(this).animate({
    opacity: 1
  });
});
$('#cars').on('mouseout', '.car img', function () {
  $(this).animate({
    opacity: 0.5
  });
});
$('#cars').on('click', '.car', function () {
  var img = $(this).find('img');
  if (!$(this).prop('data-clicked')) {
    $(this).prop('data-clicked', true);
    $(this).animate({
      width: "450px",
      height: "330px"
    });
    img.animate({
      width: "450px",
      height: "300px"
    });
  } else {
    $(this).prop('data-clicked', false);
    $(this).animate({
      width: "300px",
      height: "230px"
    });
    img.animate({
      width: "300px",
      height: "200px"
    });
  }
});
$('#getCars').on('submit', function (e) {
  e.preventDefault();
  var selectedMark = $('#mark').val(),
      selectedModel = $('#model').val();

  $.getJSON('./data/cars/data.json', function (data) {
    if (selectedMark !== 'nonselected') {
      var filtered = data.cars.filter(function (item) {
        if (item.mark === selectedMark)
          return item;
      });
      if (selectedModel !== 'nonselected') {
        filtered = filtered.filter(function (item) {
          if (item.model === selectedModel)
            return item;
        });
        insert(filtered);
      } else {
        insert(filtered);
      }
    } else {
      var shuffled = shuffle(data.cars);
      insert(shuffled);
    }
  });
});

function insert(elements) {
  $('#cars').empty();
  $.each(elements, function (key, value) {
    var figure = $('<figure/>').addClass('car');
    var image = $('<img>').attr('src', './data/cars/img/' + value.image)
    var figcaption = $('<figcaption/>').text(value.model);
    var span = $('<a/>').text('x').addClass('delete').css({
      position: 'absolute',
      backgroundColor: '#000000',
      color: '#F00',
      fontWeight: 'bold',
      fontFamily: 'sans-serif',
      fontSize: '16pt',
      borderRadius: '50%',
      display: 'block',
      width: '30px',
      height: '30px',
      textAlign: 'center',
      top: "-10px",
      right: "-10px",
      boxShadow: "0 5px 15px black",
      zIndex: '100'
    });
    var result = figure.html(image).append(figcaption);
    span.appendTo(result);
    $('#cars').append(result);
  });
}

$('#cars').on('click', '.delete', function () {
  $(this).parent().remove();
});

function shuffle(o){
  for(var j, x, k = o.length; k; j = Math.floor(Math.random() * k), x = o[--k], o[k] = o[j], o[j] = x);
	return o;
};

window.onload = function () {
  if (localStorage.getItem('currentUser')) {
    $('#loginUser').attr('href', './cabinet.html').text(localStorage.getItem('currentUser'));
  }
}

$('#loginForm').on('submit', function (event) {
  event.preventDefault();

  var login = $('#login-name').val(),
      password = $('#password').val();

  $.getJSON('./data/users/users.json', function (data) {
    for(var i in data.users) {
      if (data.users[i].login === login && data.users[i].password === password) {
        localStorage.setItem('currentUser', login);
        $(location).attr('href', './index.html');
      } else {
        $('#loginForm').next().text('Error! Not valid username or password!');
        return false;
      }
    }
  });
});

$('#logout').on('click', function (event) {
  event.preventDefault();
  localStorage.removeItem('currentUser');
  $(location).attr('href', $(this).attr('href'));
});
