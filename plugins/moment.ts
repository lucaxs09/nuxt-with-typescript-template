import Vue from "vue";
import moment from 'moment';
import 'moment/locale/es';


export default () => {
  Vue.use(require("vue-moment"));
  moment.locale('es');

  // Custom Vue date Filters:
  Vue.filter('formatDate', function(value) {
    if (value) {
      return moment(String(value)).format('DD/MM/YYYY hh:mm')
    }
  });

  Vue.filter('dateFromNow', function(value) {
    if (value) {
      return moment(String(value)).fromNow();
    }
  });

};
