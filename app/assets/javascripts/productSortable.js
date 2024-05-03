document.addEventListener('spree:load', function () {
  const secondTable = document.getElementsByTagName('table')[1];
  
  if (secondTable) {
    const tbody = secondTable.getElementsByTagName('tbody')[0];
    if (tbody) {
      Sortable.create(tbody, {
        handle: '.move-handle',
        animation: 550,
        ghostClass: 'bg-light',
        dragClass: 'a',
        easing: 'cubic-bezier(1, 0, 0, 1)',
        swapClass: 'dragTo',
        swapThreshold: 0.9,
        onEnd: function (evt) {
          const itemEl = evt.item;
          const positions = { authenticity_token: AUTH_TOKEN };
          const rows = Array.from(tbody.querySelectorAll('tr'));
          const firstTableRows = document
            .querySelectorAll('.sortable')[0]
            .querySelectorAll('tr').length;
          rows.forEach(function (row, index) {
            const parts = row.id.match(/spree_(\w+_?)+_(.*)/);
            if (parts) {
              positions['positions[' + parts[2] + ']'] =
                index + firstTableRows + 1;
            }
          });
          $.ajax({
            type: 'POST',
            dataType: 'json',
            url: $(itemEl).closest('.sortable').data('sortable-link'),
            data: positions,
          });
        },
      });
      
    }
  }
});
