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
        handleWindowResize: true,
        dayNamesShort: [Drupal.t("Sun"), Drupal.t("Mon"), Drupal.t("Tue"), Drupal.t("Wed"), Drupal.t("Thu"), Drupal.t("Fri"), Drupal.t("Sat")],
        monthNames: [Drupal.t("January"), Drupal.t("February"), Drupal.t("March"), Drupal.t("April"), Drupal.t("May"), Drupal.t("June"), Drupal.t("July"), Drupal.t("August"), Drupal.t("September"), Drupal.t("October"), Drupal.t("November"), Drupal.t("December")],
        firstDay: firstDay,
        defaultDate: moment([value[2],phpmonth-1]),
        height: 1,
        header:{
          left: 'title',
          center: '',
          right: ''
        },
        windowResize: function(view) {
          $(value[0]).fullCalendar('refetchEvents');
        },
        events: Drupal.settings.basePath + '?q=rooms/units/unit/' + Drupal.settings.roomsAvailability.roomID + '/availability/json/' + value[2] + '/' + phpmonth,

        select: function(start, end, allDay) {
          var sd = start.format('DD/MM/YYYY');
          var ed = end.format('DD/MM/YYYY');

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
        },
        //Remove Time from events.
        eventRender: function(event, el) {
          el.find('.fc-time').remove();

          // Add a class if the event start it is not "AV" or "N/A".
          if (el.hasClass('fc-start') && this.id != 1 && this.id != 0) {
            el.append('<div class="event-start"/>');
            el.find('.event-start').css('border-top-color', this.color);
          }

          // Add a class if the event end and it is not "AV" or "N/A".
          if (el.hasClass('fc-end') && this.id != 1 && this.id != 0) {
            el.append('<div class="event-end"/>');
            el.find('.event-end').css('border-top-color', this.color);
          }
        },
        eventAfterRender: function( event, element, view ) { 
          // Event width.
          var width = element.parent().width()
          // Event colspan number.
          var colspan = element.parent().get(0).colSpan;
          // Single cell width.
          var cell_width = width/colspan;
          var half_cell_width = cell_width/2;

          // Move events between table margins.
          element.css('margin-left', half_cell_width);
          element.css('margin-right', half_cell_width);

          // Calculate width event to add end date triangle.
          width_event = element.children('.fc-content').width();

          // Add a margin left to the top triangle.
          element.children().closest('.event-end').css('margin-left', width_event-23);

          // If the event end in a next row.
          if(element.hasClass('fc-not-end')) {
            element.css('margin-right', 0);
          }
          // If the event start in a previous row.
          if(element.hasClass('fc-not-start')) {
            // Fixes to work well with jquery 1.7.
            if (colspan == 1) {
              width_event = 0;
            }
            element.css('margin-left', 0);
            element.children().closest('.event-end').css('margin-left', width_event);
          }
        }
      });
    });

    // Highligth cells on hover
    $('.fc-day-number').hover(
      function() {
        $(this).addClass('is-hovered');
        var day_cell = $(this).closest('.fc-day-grid-container').find(".fc-bg td[data-date='" + $(this).data('date') + "']");
        $(day_cell).addClass('is-hovered');
      }, function() {
        $(this).removeClass('is-hovered');
        var day_cell = $(this).closest('.fc-day-grid-container').find(".fc-bg td[data-date='" + $(this).data('date') + "']");
        $(day_cell).removeClass('is-hovered');
      }
    );
  }
};

})(jQuery);
