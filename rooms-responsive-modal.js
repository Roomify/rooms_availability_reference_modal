Drupal.theme.prototype.ResponsiveModal = function () {
  var html = '';
  html += '  <div id="ctools-modal" class="rooms-responsive-modal">';
  html += '    <div class="rooms-responsive-modal ctools-modal-content">'; // panels-modal-content
  html += '      <div class="responsive-modal-header modal-header">';
  html += '        <a class="close" href="#">';
  html +=            Drupal.CTools.Modal.currentSettings.closeImage;
  html += '        </a>';
  html += '        <span id="modal-title" class="responsive-modal-title modal-title"> </span>';
  html += '      </div>';
  html += '      <div id="modal-content" class="responsive-modal-content modal-content">';
  html += '      </div>';
  html += '    </div>';
  html += '  </div>';
  return html;
};

Drupal.theme.prototype.ResponsiveModalThrobber = function () {
  var html = '';
  html += '  <div id="modal-throbber">';
  html += '    <div class="modal-throbber-wrapper">';
  html +=        Drupal.CTools.Modal.currentSettings.throbber;
  html += '    </div>';
  html += '  </div>';
  return html;
};
