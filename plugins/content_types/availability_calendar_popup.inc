<?php

/**
 * @file
 * An availability reference modal popup widget for use in Panels.
 */
$plugin = array(
  'single' => TRUE,
  'title' => t('Rooms Availability Calendar Modal Popup'),
  'description' => t('Displays availability information on a calendar inside a modal popup.'),
  'category' => t('Miscellaneous'),
  'edit form' => 'availability_calendar_popup_edit_form',
  'render callback' => 'availability_calendar_popup_render',
  'admin info' => 'availability_calendar_popup_admin_info',
  'defaults' => array(
    'button_text' => t('Check Availability'),
    'hover_text' => t('View this unitʼs availability calendar'),
    'unit_id' => '1',
  )
);

/**
 * 'admin info' callback populates the panels builder page preview.
 */
function availability_calendar_popup_admin_info($subtype, $conf, $contexts) {
  if (!empty($conf)) {
    $block = new stdClass;
    $block->title = $conf['override_title'] ? $conf['override_title_text'] : '';
    $block->content = t('@button_text [unit_id: @id]', array(
      '@button_text' => filter_xss($conf['button_text']),
      '@id' => check_plain($conf['unit_id']),
    ));
    return $block;
  }
}

/**
 * 'Edit form' callback for the content type.
 */
function availability_calendar_popup_edit_form($form, &$form_state) {
  $conf = $form_state['conf'];

  $form['button_text'] = array(
    '#title' => t('Button Text'),
    '#description' => t('Text used to trigger the calendar popup (HTML permitted).'),
    '#type' => 'textfield',
    '#default_value' => filter_xss($conf['button_text']),
    '#required' => TRUE,
  );

  $form['hover_text'] = array(
    '#title' => t('Hover Text'),
    '#description' => t('Text that appears when hovering the button.'),
    '#type' => 'textfield',
    '#default_value' => filter_xss($conf['hover_text']),
    '#required' => TRUE,
  );

  $form['unit_id'] = array(
    '#title' => t('Unit ID(s)'),
    '#description' => t('Unit(s) used to source the availability calendar popup.') . ' ' . t('Separate multiple ids with commas.'),
    '#type' => 'textfield',
    '#default_value' => check_plain($conf['unit_id']),
    '#required' => TRUE,
  );

  return $form;
}

/**
 * The submit form stores the data in $conf.
 */
function availability_calendar_popup_edit_form_submit($form, &$form_state) {
  foreach (array_keys($form_state['plugin']['defaults']) as $key) {
    if (isset($form_state['values'][$key])) {
      $form_state['conf'][$key] = $form_state['values'][$key];
    }
  }
}

/**
 * Render callback for the content type.
 */
function availability_calendar_popup_render($subtype, $conf, $args, $context) {
  $block = new stdClass();

  // Include the CTools tools that we need.
  ctools_include('ajax');
  ctools_include('modal');

  // Add CTools' javascript to the page.
  ctools_modal_add_js();

  // Setup block title.
  $block->title = $conf['override_title'] ? $conf['override_title_text'] : '';

  // Create the button to trigger the modal availability calendar.
  $block->content = array(
    '#theme' => 'availability_calendar_popup_button',
    '#name' => filter_xss($conf['button_text']),
    '#unit_ids' => check_plain($conf['unit_id']),
    '#alt' => strip_tags($conf['hover_text']),
  );

  return $block;
}
