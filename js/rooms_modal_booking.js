(function ($) {

Drupal.behaviors.rooms_modal_booking = {
  attach: function(context) {

    //$('.rooms-modal-booking-form .start-date').hide();
    //$('.rooms-modal-booking-form .end-date').hide();
    $('.rooms-modal-booking-form .form-submit').attr('disabled', 'disabled');

    $('.rooms-modal-booking-form .rooms-date-range input').bind('keyup change', function () {
      $form = $(this).closest("form");
      if ($('.end-date input', $form).val() && $('.start-date input', $form).val()) {
        $('.rooms-modal-booking-form .form-submit').removeAttr('disabled').focus();
      }
    });

    // Convert php current month to js (which counts months starting from 0).
    currentMonth = Drupal.settings.roomsCalendar.currentMonth - 1;
    currentYear = Drupal.settings.roomsCalendar.currentYear;
    firstDay = Drupal.settings.roomsCalendar.firstDay;

    // The first month on the calendar
    month1 = currentMonth;
    year1 = currentYear;

    // Second month is the next one obviously unless it is 11 in which case we need to move a year ahead
    if (currentMonth == 11) {
      month2 = 0;
      year2 = year1 + 1;
    }
    else{
      month2 = currentMonth+1;
      year2 = currentYear;
    }

    currentMonth = month2;
    // And finally the last month where we do the same as above worth streamlining this probably
    if (currentMonth == 11) {
      month3 = 0;
      year3 = year2 + 1;
    }
    else{
      month3 = currentMonth+1;
      year3 = year2;
    }

    var calendars = [];
    calendars[0] = new Array('#calendar', month1, year1);
    calendars[1] = new Array('#calendar1', month2, year2);
    calendars[2] = new Array('#calendar2', month3, year3);

    $.each(calendars, function(key, value) {
      // phpmonth is what we send via the url and need to add one since php handles
      // months starting from 1 not zero
      phpmonth = value[1]+1;
      $(value[0]).once().fullCalendar({
        ignoreTimezone: false,
        editable: false,
        selectable: true,
        dayNamesShort: [Drupal.t("Sun"), Drupal.t("Mon"), Drupal.t("Tue"), Drupal.t("Wed"), Drupal.t("Thu"), Drupal.t("Fri"), Drupal.t("Sat")],
        monthNames: [Drupal.t("January"), Drupal.t("February"), Drupal.t("March"), Drupal.t("April"), Drupal.t("May"), Drupal.t("June"), Drupal.t("July"), Drupal.t("August"), Drupal.t("September"), Drupal.t("October"), Drupal.t("November"), Drupal.t("December")],
        firstDay: firstDay,
        month: value[1],
        year: value[2],
        height: 1,
        header:{
          left: 'title',
          center: '',
          right: ''
        },
        events: Drupal.settings.basePath + '?q=rooms/units/unit/' + Drupal.settings.roomsAvailability.roomID + '/availability/json/' + value[2] + '/' + phpmonth,

        select: function(start, end, allDay) {
          var sd = $.datepicker.formatDate('dd/mm/yy', start);
          var ed = $.datepicker.formatDate('dd/mm/yy', end);

          console.log(sd);
          console.log(ed);

          // If the start date and end date are the same, assume checkout
          // on the following day.
          if (sd === ed) {
            end.setDate(end.getDate() + 1);
          }

          $('.rooms-modal-booking-form .start-date input').val(sd);
          $('.rooms-modal-booking-form .start-date input').datepicker('setDate', start);

          $('.rooms-modal-booking-form .end-date input').val(ed);
          $('.rooms-modal-booking-form .end-date input').datepicker('setDate', end);

          $('.rooms-modal-booking-form .form-submit').removeAttr('disabled').focus();
        }
      });
    });
  }
};

})(jQuery);
