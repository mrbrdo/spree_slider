
document.addEventListener('spree:load', function () {
    document
      .getElementById('new_add_slide')
      .addEventListener('click', function () {
        loadAutoComplete();
        removeExistingSelects();
        updateDefaultValueInFields();
      });
})


function removeExistingSelects() {
  const tbodyTr = document.querySelector('tbody tr:last-child');

  if (tbodyTr) {
    // we need to delete select2 instances before document is saved to cache
    const select2Elements = tbodyTr.querySelectorAll(
      '.select2[data-select2-id]'
    );

    const imageContainer = tbodyTr.querySelector('.image-container');

    if(select2Elements){
        for (let i = 1; i < select2Elements.length; i++) {
            select2Elements[i].remove();
        }
    }

    if (imageContainer) imageContainer.remove();
  }
}


function loadAutoComplete() {

  const tbodyTr = document.querySelector('tbody tr:last-child');

  tbodyTr.classList.add('new_slide_element');

  const slideItemsList = document.querySelectorAll('tbody .new_slide_element');
  
  if (slideItemsList) {
    slideItemsList.forEach((slideItem) => {
    
      const loadParamsElement = slideItem.querySelector(
        'select[data-autocomplete-url-value]'
      );

      buildParamsFromDataAttrs(loadParamsElement);
    });
  }

}


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

  positionField.value = 0;
  bodyField.innerHTML = '';
  publishedField.checked = false;
}
