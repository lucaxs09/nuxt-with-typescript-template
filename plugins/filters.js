import Vue from "vue";


Vue.filter('dia', function(numero) {
  switch (numero) {
    case 1:
      return 'lunes';
    case 2:
      return 'martes';

    default:
      return "Desconocido";
  }

});

Vue.filter('date', function(numero) {
  const p = new Date(numero);
  return p.toLocaleDateString();


});




