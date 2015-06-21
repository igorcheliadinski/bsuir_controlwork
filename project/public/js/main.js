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
})
$('#cars').on('mouseout', '.car img', function () {
  $(this).animate({
    opacity: 0.5
  });
})
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
    var result = figure.html(image).append(figcaption);
    $('#cars').append(result);
  });
}

function shuffle(o){
  for(var j, x, k = o.length; k; j = Math.floor(Math.random() * k), x = o[--k], o[k] = o[j], o[j] = x);
	return o;
};

window.onload = function () {
  if (localStorage.getItem('currentUser')) {
    $('#loginUser').attr('href', './cabinet.html').text(localStorage.getItem('currentUser'));
  }
}
