<?php
/**
 * @file
 * Text strings used in the Rooms Availability Reference Modal are exposed via the Variable API
 */

/**
 * Implements hook_variable_info().
 */
function rooms_availability_reference_modal_variable_info($options) {
  $variables['rooms_availability_reference_modal_book_this'] = array(
    'type' => 'string',
    'title' => t('Book this (text in Check Availability Modal)'),
    'default' => 'Book this',
    'description' => t('Change text : Book this (text in Check Availability Modal)'),
    'localize' => TRUE,
    'group' => 'rooms_availability_reference_modal',
  );

  $variables['rooms_availability_reference_modal_select_dates'] = array(
    'type' => 'text',
    'title' => t('Help message : Select Dates to continue reservation (text in Check Availability Modal)'),
    'default' => 'Select your desired travel dates to continue with your reservation.',
    'description' => t('Change text : Select your desired travel dates to continue with your reservation (text in Check Availability Modal)'),
    'localize' => TRUE,
    'group' => 'rooms_availability_reference_modal',
  );

  return $variables;
}

/**
 * Implements hook_variable_group_info().
 */
function rooms_availability_reference_modal_variable_group_info() {
  $groups['rooms_availability_reference_modal'] = array(
    'title' => t('Rooms Availability Reference Modal'),
    'description' => t('Text strings found in the Availability Reference modal popup.'),
    'access' => 'administer site configuration',
  );
  return $groups;
}
