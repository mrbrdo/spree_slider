/**
 * Adds event listener for the 'spree:load' event, triggers actions on 'new_add_slide' click.
 */
document.addEventListener('spree:load', function () {
  document
    .getElementById('new_add_slide')
    .addEventListener('click', function () {
      loadAutoComplete();
      removeExistingSelects();
      updateDefaultValueInFields();
    });
});

/**
 * Removes existing Select2 instances and image from previous clone element.
 */
function removeExistingSelects() {
  const tbodyTr = document.querySelector('tbody tr:last-child');

  if (tbodyTr) {
    const select2Elements = tbodyTr.querySelectorAll(
      '.select2[data-select2-id]'
    );
    const imageContainer = tbodyTr.querySelector('.image-container');

    if (select2Elements.length > 1) {
      for (let i = 1; i < select2Elements.length; i++) {
        select2Elements[i].remove();
      }
    }

    if (imageContainer) {
      imageContainer.remove();
    }
  }
}

/**
 * Loads autocomplete for the last table row.
 */
function loadAutoComplete() {
  const tbodyTr = document.querySelector('tbody tr:last-child');

  // Add class and unique ID to the last table row
  tbodyTr.classList.add('new-slide');
  tbodyTr.id = 'new_spree_slide_' + (Number(tbodyTr.rowIndex) + 1);

  const slideItemsList = document.querySelectorAll('tbody .new-slide');

  if (slideItemsList) {
    slideItemsList.forEach((slideItem) => {
      const loadParamsElement = slideItem.querySelector(
        'select[data-autocomplete-url-value]'
      );
      // Update data-select2-id to match the element ID
      loadParamsElement.setAttribute('data-select2-id', loadParamsElement.id);
      // update label for attribute
      loadParamsElement.previousElementSibling.setAttribute(
        'for',
        loadParamsElement.id
      );
      buildParamsFromDataAttrs(loadParamsElement);
    });
  }
}

/**
 * Updates default values in input fields of the last table row.
 */
function updateDefaultValueInFields() {
  const tbodyTr = document.querySelector('tbody tr:last-child');
  const positionField = tbodyTr.querySelector(
    'input[id^="slide_location_slides_attributes_"][id$="_position"]'
  );
  const bodyField = tbodyTr.querySelector(
    'textarea[id^="slide_location_slides_attributes_"][id$="_body"]'
  );
  const publishedField = tbodyTr.querySelector(
    'input[id^="slide_location_slides_attributes_"][id$="published"]'
  );

  // Update default values
  positionField.value = 0;
  bodyField.innerHTML = '';
  publishedField.checked = false;
}
